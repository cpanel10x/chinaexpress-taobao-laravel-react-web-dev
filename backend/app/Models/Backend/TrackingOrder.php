<?php

namespace App\Models\Backend;

use App\Models\Auth\User;
use Illuminate\Database\Eloquent\Model;

class TrackingOrder extends Model
{
  protected $table = 'order_tracking';

  public $primaryKey = 'id';

  public $timestamps = true;

  protected $guarded = [];

  protected $dates = [
    'created_at',
    'updated_at'
  ];

  public function user()
  {
    return $this->belongsTo(User::class);
  }
}
