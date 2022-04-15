<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Content\Product;
use App\Traits\AliexpressApi;
use App\Traits\ApiResponser;
use PHPHtmlParser\Dom;

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
    $req_query = request('query_url');
    if (!$req_query) {
      return response(['status' => false, 'result' => '', 'msg' => 'Search must not empty']);
    }

    $query = explode(" ", $req_query);
    $query = count($query) > 3 ? end($query) : $req_query;

    $htmlContents = file_get_contents($query);
    $dom = new Dom;
    $dom = $dom->loadStr($htmlContents);
    $html = $dom->find("link[rel=canonical]");
    $url = $html->getAttribute('href');
    $url = explode('/', $url);
    $url = end($url);
    $product_id = str_replace('.html', '', $url);
    $rapid = '';
    $rapid = cache()->get($product_id, null);
    if (!$rapid) {
      $rapid = $this->ApiProductDetails($product_id);
      cache()->put($product_id, $rapid, 600);
    }

    return response([
      'result' => json_encode($rapid),
    ]);
  }


  public function productInfo($product_id)
  {
    $rapid = cache()->get($product_id, null);
    if (!$rapid) {
      $rapid = $this->ApiProductDetails($product_id);
      cache()->put($product_id, $rapid, 600);
    }
    return response([
      'result' => json_encode($rapid)
    ]);
  }

  public function productShipmentInfo($product_id)
  {
    $key = 'shipment-' . $product_id;
    $shipping = cache()->get($key, null);
    if (!$shipping) {
      $shipping = $this->ApiProductShipping($product_id);
      cache()->put($key, $shipping, 600);
    }
    return response([
      'result' => json_encode($shipping),
    ]);
  }

  public function relatedProducts($product_id)
  {
    $products = Product::latest()->limit(20)->get();
    return response([
      'result' => json_encode($products)
    ]);
  }
}
