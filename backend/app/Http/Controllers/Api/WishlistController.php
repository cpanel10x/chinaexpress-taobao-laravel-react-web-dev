<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Content\Frontend\Wishlist;
use App\Traits\ApiResponser;

/**
 * Class HomeController.
 */
class WishlistController extends Controller
{
  use ApiResponser;

  public function AddToWishList()
  {
    $product = request('product', []);
    $auth_id = auth()->id();
    $wishlists = [];
    if ($product && $auth_id) {
      $rate = get_setting('increase_rate', 20);

      $img = getArrayKeyData($product, 'img');
      $name = getArrayKeyData($product, 'name');
      $product_code = getArrayKeyData($product, 'product_code');
      $rating = getArrayKeyData($product, 'rating');
      $regular_price = getArrayKeyData($product, 'regular_price');
      $sale_price = getArrayKeyData($product, 'sale_price');
      $stock = getArrayKeyData($product, 'stock');
      $total_sold = getArrayKeyData($product, 'total_sold');

      $NewPrice = get_product_regular_price($product, $rate);
      $SalePrice = get_product_sale_price($product, $rate) ?? $NewPrice;
      $NewTotalSold = get_features_value($product, 'TotalSales');
      $ItemId = $product_code ? $product_code : ($product['Id'] ?? '');
      Wishlist::UpdateOrCreate(
        ['user_id' => $auth_id, 'ItemId' => $ItemId],
        [
          'img' => $img ? $img : get_product_picture($product),
          'name' => $name ? $name : ($product['Title'] ?? ''),
          'rating' => $rating ? $rating : ($product['rating'] ?? ''),
          'regular_price' => $regular_price ? $regular_price : $NewPrice,
          'sale_price' => $sale_price ? $sale_price : $SalePrice,
          'stock' => $product['MasterQuantity'] ?? $stock,
          'total_sold' => $total_sold ? $total_sold : $NewTotalSold,
        ]
      );
      $wishlists = Wishlist::where('user_id', $auth_id)->get();
    }
    return response([
      'status' => true,
      'wishlists' => $wishlists
    ]);
  }

  public function getCustomerWishList()
  {
    $items = [];
    if (auth()->check()) {
      $items = Wishlist::where('user_id', auth()->id())->latest()->get();
    }
    return response([
      'status' => true,
      'wishlists' => $items
    ]);
  }

  public function removeCustomerWishList()
  {
    $auth_id = auth()->id();
    $item_id = request('ItemId');
    if ($auth_id && $item_id) {
      Wishlist::where('ItemId', $item_id)
        ->where('user_id', $auth_id)
        ->delete();
    }
    $wishlists = Wishlist::where('user_id', $auth_id)->get();
    return response([
      'status' => true,
      'wishlists' => $wishlists
    ]);
  }
}
