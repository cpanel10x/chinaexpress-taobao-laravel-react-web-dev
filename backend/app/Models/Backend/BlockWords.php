<?php

namespace App\Models\Backend;

use Illuminate\Database\Eloquent\Model;

class BlockWords extends Model
{
  protected $table = 'block_words';

  public $primaryKey = 'id';

  public $timestamps = true;

  protected $guarded = [];

  public function user()
  {
    return $this->belongsTo(User::class);
  }
}
