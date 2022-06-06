<?php

namespace App\Repositories\Frontend\Settings;

use App\Models\Content\Setting;


class SettingRepository
{


  public function all()
  {
    return Setting::whereNotNull('active')->pluck('value', 'key')->toArray();
  }
}
