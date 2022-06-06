<?php

namespace App\Repositories\Backend;

use App\Models\Content\Taxonomy;
use Illuminate\Http\Request;

/**
 * Class UserRepository.
 */
class CatalogRepository
{

  public function frontendList(Request $request)
  {
    return Taxonomy::whereNotNull('active')->withCount('children')->get();;
  }
}
