<?php

namespace App\Repositories\Frontend\Settings;

use App\Exceptions\GeneralException;
use App\Models\Auth\User;
use App\Models\Content\Setting;
use App\Notifications\Frontend\Auth\UserNeedsConfirmation;
use App\Repositories\BaseRepository;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

/**
 * Class UserRepository.
 */
class SettingRepository extends BaseRepository
{
  /**
   * UserRepository constructor.
   *
   * @param  User  $model
   */
  public function __construct(Setting $model)
  {
    $this->model = $model;
  }

  public function all()
  {
    return $this->model->whereNotNull('active')->pluck('value', 'key')->toArray();
  }

  /**
   * @param array $data
   *
   * @throws \Exception
   * @throws \Throwable
   * @return \Illuminate\Database\Eloquent\Model|mixed
   */
  public function create(array $data, bool $sendEmail = true)
  {
    return DB::transaction(function () use ($data, $sendEmail) {
      $user = $this->model::create([
        'name' => $data['name'],
        'email' => $data['email'],
        'phone' => $data['phone'] ?? NULL,
        'otp_code' => $data['otp_code'] ?? NULL,
        'confirmation_code' => md5(uniqid(mt_rand(), true)),
        'active' => true,
        'password' => $data['password'],
        // If users require approval or needs to confirm email
        'confirmed' => !(config('access.users.requires_approval') || config('access.users.confirm_email')),
      ]);

      if ($user) {
        // Add the default site role to the new user
        $user->assignRole(config('access.users.default_role'));
      }

      /*
             * If users have to confirm their email and this is not a social account,
             * and the account does not require admin approval
             * send the confirmation email
             *
             * If this is a social account they are confirmed through the social provider by default
             */
      if (config('access.users.confirm_email') && $sendEmail) {
        // Pretty much only if account approval is off, confirm email is on, and this isn't a social account.
        $user->notify(new UserNeedsConfirmation($user->confirmation_code));
      }

      // Return the user object
      return $user;
    });
  }

  /**
   * @param       $id
   * @param array $input
   * @param bool|UploadedFile  $image
   *
   * @throws GeneralException
   * @return array|bool
   */
  public function update($id, array $input, $image = false)
  {
    $avatar_type = $input['avatar_type'] ?? null;
    $user = $this->getById($id);
    $user->first_name = $input['name'];
    $user->name = $input['name'];
    $user->phone = $input['phone'];
    if ($avatar_type) {
      $user->avatar_type = $input['avatar_type'];
    }

    // Upload profile image if necessary
    if ($image) {
      $user->avatar_location = $image->store('/avatars', 'public');
    } else {
      // No image being passed
      if ($avatar_type === 'storage') {
        // If there is no existing image
        if (auth()->user()->avatar_location === '') {
          throw new GeneralException('You must supply a profile image.');
        }
      } else {
        // If there is a current image, and they are not using it anymore, get rid of it
        if (auth()->user()->avatar_location !== '') {
          Storage::disk('public')->delete(auth()->user()->avatar_location);
        }

        $user->avatar_location = null;
      }
    }

    if ($user->canChangeEmail()) {
      //Address is not current address so they need to reconfirm
      if ($user->email !== $input['email']) {
        //Emails have to be unique
        if ($this->getByColumn($input['email'], 'email')) {
          throw new GeneralException(__('exceptions.frontend.auth.email_taken'));
        }

        // Force the user to re-verify his email address if config is set
        if (config('access.users.confirm_email')) {
          $user->confirmation_code = md5(uniqid(mt_rand(), true));
          $user->confirmed = false;
          $user->notify(new UserNeedsConfirmation($user->confirmation_code));
        }
        $user->email = $input['email'];
        $updated = $user->save();

        // Send the new confirmation e-mail

        return [
          'success' => $updated,
          'email_changed' => true,
        ];
      }
    }

    return $user->save();
  }

  /**
   * @param      $input
   * @param bool $expired
   *
   * @throws GeneralException
   * @return bool
   */
  public function updatePassword($input, $expired = false)
  {
    $user = $this->getById(auth()->id());

    if (Hash::check($input['old_password'], $user->password)) {
      if ($expired) {
        $user->password_changed_at = now()->toDateTimeString();
      }

      return $user->update(['password' => $input['password']]);
    }

    throw new GeneralException(__('exceptions.frontend.auth.password.change_mismatch'));
  }
}
