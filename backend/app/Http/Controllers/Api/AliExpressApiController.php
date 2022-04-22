<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Backend\AliExpressSearchLog;
use App\Models\Content\CartItem;
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


  public function generate_uid($req_query)
  {
    return md5($req_query);
  }

  public function search_log_product_id($req_query)
  {
    $uid = $this->generate_uid($req_query);
    $query = AliExpressSearchLog::where('uid', $uid)->first();
    return $query ? $query->product_id : null;
  }


  public function store_product_id_to_search_log($req_query, $product_id)
  {
    $uid = $this->generate_uid($req_query);
    return AliExpressSearchLog::create([
      'uid' => $uid,
      'product_id' => $product_id,
      'search_url' => $req_query,
      'user_id' => auth()->check() ? auth()->id() : null,
    ]);
  }
  public function checkIdInLink($link)
  {
    $checking = explode("?", $link);
    $checking = $checking[0] ?? null;
    $checking = $checking ? explode('/', $checking) : [];
    $checking = count($checking) == 5 ? end($checking) : null;
    $product_id = $checking ? str_replace('.html', '', $checking) : null;
    if (!$product_id) {
      $link = explode('/', $link);
      $link = count($link) == 5 ? end($link) : null;
      $product_id = $link ? str_replace('.html', '', $link) : null;
    }
    return $product_id;
  }


  public function searchQuery()
  {
    $req_query = request('search');
    if (!$req_query) {
      return response(['status' => false, 'result' => '', 'msg' => 'Search result not found']);
    }
    $product_id = $this->search_log_product_id($req_query);
    if (!$product_id) {
      $product_id = $this->checkIdInLink($req_query);
      if (!$product_id) {
        $query = explode(" ", $req_query);
        $query = count($query) > 3 ? end($query) : $req_query;
        $htmlContents = file_get_contents($query);
        $dom = new Dom;
        $dom = $dom->loadStr($htmlContents);
        $html = $dom->find("link[rel=canonical]");
        $link = $html->getAttribute('href') ?? '';
        $product_id = $this->checkIdInLink($link);
      }
    }

    return response(['status' =>  $product_id ? true : false, 'product_id' => $product_id, 'msg' => 'Search must not empty']);
  }


  public function productInfo($product_id)
  {
    $rapid = cache()->get($product_id, null);
    if (!$rapid) {
      $rapid = $this->ApiProductDetails($product_id);
      cache()->put($product_id, $rapid, now()->addMinutes(10));
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

  public function productShipmentWeightInfo()
  {
    $product_id = request('ItemId');
    $cart_item_id = request('cart_item_id');
    $key = 'weight-' . $product_id;
    $shipping = cache()->get($key, null);
    $shipping = null;
    if (!$shipping) {
      $shipping = $this->productWeightInfoFromMagicApi($product_id);
      cache()->put($key, $shipping, 600);
    }
    $weight = $shipping['packageInfo']['weight'] ?? 0;
    if ($weight) {
      CartItem::where('id', $cart_item_id)
        ->where('ItemId', $product_id)
        ->update(['weight' => $weight]);
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
