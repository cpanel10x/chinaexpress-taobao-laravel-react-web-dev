<?php

namespace App\Repositories\Backend;

use App\Events\Backend\Auth\User\UserCreated;
use App\Events\Backend\Auth\User\UserPermanentlyDeleted;
use App\Events\Backend\Auth\User\UserRestored;
use App\Events\Backend\Auth\User\UserUpdated;
use App\Exceptions\GeneralException;
use App\Models\Auth\User;
use App\Models\Content\OrderItem;
use App\Notifications\Frontend\Auth\UserNeedsConfirmation;
use App\Repositories\BaseRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

/**
 * Class UserRepository.
 */
class WalletRepository extends BaseRepository
{
  /**
   * UserRepository constructor.
   *
   * @param  User  $model
   */
  public function __construct(OrderItem $model)
  {
    $this->model = $model;
  }


  public function all()
  {
    return $this->model->whereNotNull('active')->pluck('value', 'key')->toArray();
  }


  public function storeComments(Request $request, $id)
  {
    $wallet = $this->model->find($id);
    if ($wallet) {
      $type = $request->type;
      $comments = $request->comments;
      if ($type == 'one') {
        $wallet->comment1 = $comments;
      } else {
        $wallet->comment2 = $comments;
      }
      $wallet->save();
    }
    return $wallet;
  }

  public function updateWalletCalculation(Request $request, $id)
  {
    $wallet = $this->model->find($id);
    if ($wallet) {
      $product_price = ($wallet->product_value + $wallet->DeliveryCost);
      $first_payment = $wallet->first_payment;
      $out_of_stock = $wallet->out_of_stock;
      $missing = $wallet->missing;
      $lost_in_transit = $wallet->lost_in_transit;

      $courier_bill = $wallet->courier_bill;
      $refunded = $wallet->refunded;
      $customer_tax = $wallet->customer_tax;
      $last_payment = $wallet->last_payment;

      $adjustment = $wallet->adjustment;

      $shipping_type = $wallet->shipping_type;
      $weight_change = 0;
      if ($shipping_type != 'regular') {
        $shipping_rate = $wallet->shipping_rate;
        $actual_weight = $wallet->actual_weight;
        $weight_change = ($shipping_rate * $actual_weight);
      }

      $sumData = ($product_price +  $first_payment + $out_of_stock + $missing + $lost_in_transit);
      $sumData = $sumData - ($lost_in_transit +  $refunded + $customer_tax + $weight_change + $courier_bill + $last_payment);

      $orderItem = $this->model->find($id);
      $orderItem->due_payment = ($sumData + $adjustment);
      $orderItem->save();
    }
    return $wallet;
  }





  /**
   * @param array $data
   *
   * @throws \Exception
   * @throws \Throwable
   * @return User
   */
  public function create(array $data): User
  {
    return DB::transaction(function () use ($data) {
      $user = $this->model::create([
        'first_name' => $data['first_name'],
        'last_name' => $data['last_name'],
        'email' => $data['email'],
        'password' => $data['password'],
        'active' => isset($data['active']) && $data['active'] === '1',
        'confirmation_code' => md5(uniqid(mt_rand(), true)),
        'confirmed' => isset($data['confirmed']) && $data['confirmed'] === '1',
      ]);

      // See if adding any additional permissions
      if (!isset($data['permissions']) || !count($data['permissions'])) {
        $data['permissions'] = [];
      }

      if ($user) {
        // User must have at least one role
        if (!count($data['roles'])) {
          throw new GeneralException(__('exceptions.backend.access.users.role_needed_create'));
        }

        // Add selected roles/permissions
        $user->syncRoles($data['roles']);
        $user->syncPermissions($data['permissions']);

        //Send confirmation email if requested and account approval is off
        if ($user->confirmed === false && isset($data['confirmation_email']) && !config('access.users.requires_approval')) {
          $user->notify(new UserNeedsConfirmation($user->confirmation_code));
        }

        event(new UserCreated($user));

        return $user;
      }

      throw new GeneralException(__('exceptions.backend.access.users.create_error'));
    });
  }

  /**
   * @param User  $user
   * @param array $data
   *
   * @throws GeneralException
   * @throws \Exception
   * @throws \Throwable
   * @return User
   */
  public function update(User $user, array $data): User
  {

    // See if adding any additional permissions
    if (!isset($data['permissions']) || !count($data['permissions'])) {
      $data['permissions'] = [];
    }

    return DB::transaction(function () use ($user, $data) {
      if ($user->update([
        'first_name' => $data['first_name'],
        'last_name' => $data['last_name'],
        'email' => $data['email'],
      ])) {
        // Add selected roles/permissions
        $user->syncRoles($data['roles']);
        $user->syncPermissions($data['permissions']);

        event(new UserUpdated($user));

        return $user;
      }

      throw new GeneralException(__('exceptions.backend.access.users.update_error'));
    });
  }


  /**
   * @param User $user
   *
   * @throws GeneralException
   * @throws \Exception
   * @throws \Throwable
   * @return User
   */
  public function forceDelete(User $user): User
  {
    if ($user->deleted_at === null) {
      throw new GeneralException(__('exceptions.backend.access.users.delete_first'));
    }

    return DB::transaction(function () use ($user) {
      // Delete associated relationships
      $user->passwordHistories()->delete();
      $user->providers()->delete();

      if ($user->forceDelete()) {
        event(new UserPermanentlyDeleted($user));

        return $user;
      }

      throw new GeneralException(__('exceptions.backend.access.users.delete_error'));
    });
  }

  /**
   * @param User $user
   *
   * @throws GeneralException
   * @return User
   */
  public function restore(User $user): User
  {
    if ($user->deleted_at === null) {
      throw new GeneralException(__('exceptions.backend.access.users.cant_restore'));
    }

    if ($user->restore()) {
      event(new UserRestored($user));

      return $user;
    }

    throw new GeneralException(__('exceptions.backend.access.users.restore_error'));
  }
}
