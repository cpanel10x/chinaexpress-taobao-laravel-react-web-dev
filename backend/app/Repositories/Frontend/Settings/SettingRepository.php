<?php

namespace App\Repositories\Frontend\Settings;

use App\Models\Content\Setting;
use Illuminate\Support\Str;

class SettingRepository
{

  public function update_key()
  {
    $update_token = Str::random(60);
    Setting::save_settings([
      'update_token' => $update_token
    ]);
    return true;
  }

  public function list($request)
  {
    $token = $request->update_token;
    $is_exists = $request->is_exists;
    $find =  Setting::whereNotNull('active')->where('key', $token)->first();
    $new = false;
    if (!$find) {
      $new = true;
    }
    if (!$is_exists && !$new) {
      $new = true;
    }

    if ($new) {
      return Setting::whereNotNull('active')->pluck('value', 'key')->toArray();
    }
    return [];
  }
}
