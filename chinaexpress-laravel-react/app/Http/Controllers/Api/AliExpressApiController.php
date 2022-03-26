<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Content\Frontend\Address;
use App\Models\Content\Product;
use App\Traits\AliexpressApi;
use App\Traits\ApiResponser;
use Illuminate\Support\Str;

/**
 * Class HomeController.
 */
class AliExpressApiController extends Controller
{
  use ApiResponser, AliexpressApi;


  public function test()
  {
    return $this->searchProducts('shoe');
  }


  public function searchQuery()
  {
    $query = request('query');
    $key = Str::slug($query);
    $rapid = cache()->get($key, null);
    if (!$rapid) {
      $rapid = $this->searchProducts($query);
      cache()->put($key, $rapid);
    }
    return $this->success([
      'result' => $rapid,
    ]);
  }


  public function productInfo($product_id)
  {
    $rapid = cache()->get($product_id, null);
    if (!$rapid) {
      $rapid = $this->ApiProductDetails($product_id);
      cache()->put($product_id, $rapid);
    }
    // $rapid = $this->ApiProductDetails($product_id);
    return $this->success([
      'result' => $rapid,
    ]);
  }

  public function productShipmentInfo($product_id)
  {
    $key = 'shipment-' . $product_id;
    $shipping = cache()->get($key, null);
    if (!$shipping) {
      $shipping = $this->ApiProductShipping($product_id);
      cache()->put($key, $shipping);
    }
    return $this->success([
      'result' => $shipping,
    ]);
  }

  public function relatedProducts($product_id)
  {
    $products = Product::latest()->limit(20)->get();
    return $this->success([
      'result' => $products
    ]);
  }
}
