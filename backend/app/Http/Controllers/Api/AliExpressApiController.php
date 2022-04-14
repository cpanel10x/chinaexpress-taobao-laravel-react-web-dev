<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Content\Product;
use App\Traits\AliexpressApi;
use App\Traits\ApiResponser;
use Illuminate\Support\Str;
use voku\helper\HtmlDomParser;

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
    $query = request('query_url');
    if (!$query) {
      return response(['status' => false, 'msg' => 'Search must not empty']);
    }
    $htmlContents = file_get_contents($query);
    $htmlTmp = HtmlDomParser::str_get_html($htmlContents);
    $url = '';
    foreach ($htmlTmp->find('link') as $meta) {
      $hasRel = $meta->hasAttribute('rel');
      if ($hasRel) {
        $relData = $meta->getAttribute('rel');
        if ($relData == 'canonical') {
          $url = $meta->getAttribute('href');
        }
      }
    }
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
    // $rapid = $this->ApiProductDetails($product_id);
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
    return $this->success([
      'result' => $products
    ]);
  }
}
