<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Auth\User;
use App\Models\Content\PaymentToken;
use App\Traits\CartOperation;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Validator;

class CartController extends Controller
{
  use CartOperation;


  public function currentCart()
  {
    $cart = $this->get_customer_cart();
    $cart_token = $cart->cart_uid ?? NULL;
    return response([
      'cart_token' => $cart_token,
      'cart' => $cart,
    ]);
  }

  public function checkoutCart()
  {
    $cart = $this->get_checkout_cart();
    $cart_token = $cart->cart_uid ?? NULL;
    return response([
      'cart_token' => $cart_token,
      'cart' => $cart,
    ]);
  }

  public function addToCart()
  {
    $product = request('product');
    $cart = $this->add_to_cart($product);
    return response(['status' => true, 'cart' => $cart, 'msg' => 'Product add to cart successfully']);
  }

  public function markAsCart()
  {
    $cart = $this->product_mark_as_cart();
    return response(['status' => true, 'cart' => $cart, 'msg' => 'Product marked successfully']);
  }

  public function choose_shipping()
  {
    $cart = $this->ali_product_choose_shipping();
    return response(['status' => true, 'cart' => $cart, 'msg' => 'Product add to express service successfully']);
  }

  public function updateCustomerCart()
  {
    $cart = $this->update_cart();
    return response(['status' => true, 'cart' => $cart, 'msg' => 'Product add to cart successfully']);
  }

  public function readPopup()
  {
    $cart = $this->read_popup_message();
    return response(['status' => true, 'cart' => $cart, 'msg' => 'Product add to cart successfully']);
  }


  public function updateCartCheckbox()
  {
    $cart = $this->toggle_cart_checkbox();
    return response(['status' => true, 'cart' => $cart, 'msg' => 'Cart updated successfully']);
  }

  public function removeFromCart()
  {
    $cart = $this->remove_from_cart();
    return response(['status' => true, 'cart' => $cart, 'msg' => 'Item remove successfully']);
  }

  public function addShippingAddress()
  {
    $validator = Validator::make(request()->all(), [
      'id' => 'required|integer',
      'name' => 'required|string|max:255',
      'phone' => 'required|string|max:25',
      'city' => 'required|string|max:255',
      'address' => 'required|string|max:400',
    ]);

    if ($validator->fails()) {
      return response($validator->errors()->all(), 422);
    }
    $type = request('type', 'shipping');
    $shipping = request()->only('id', 'name', 'phone', 'city', 'post_code', 'address');
    $cart = [];
    if (!empty($shipping)) {
      $cart = $this->add_shipping_address($type, $shipping);
    }
    return response(['status' => true, 'cart' => $cart, 'msg' => 'Shipping address successfully']);
  }

  public function addPaymentMethod()
  {
    $pmt = request('method');
    $cart = $this->add_payment_information($pmt);
    return response(['status' => true, 'cart' => $cart, 'msg' => 'Payment method added successfully']);
  }

  public function couponCodeSubmit()
  {
    $validator = Validator::make(request()->all(), [
      'coupon_code' => 'required|string|max:255',
    ]);
    if ($validator->fails()) {
      return $this->error('validation error', 422, $validator->errors()->all());
    }
    $coupon_code = request('coupon_code');
    if ($coupon_code) {
      $cartData = $this->coupon_code_submit($coupon_code);
      $cart = $cartData['cart'] ?? [];
      $msg = $cartData['msg'] ?? '';
      return $this->success(['cart' => $cart], $msg);
    }
    return $this->error('Coupon added failed', 422);
  }

  public function couponReset()
  {
    $cartData = $this->coupon_reset();
    $cart = $cartData['cart'] ?? [];
    $msg = $cartData['msg'] ?? '';
    return $this->success(['cart' => $cart], $msg);
  }

  public function placedOrder()
  {
    $tran_id = 'CE-' . Str::random();
    $order = $this->placedCustomerOrder($tran_id);
    $token = Str::random(60);
    $user_id = auth()->id();
    if ($order) {
      PaymentToken::create([
        'token' => $token,
        'tran_id' => $order->transaction_id,
        'order_id' => $order->id,
        'expire_at' => now()->addMinutes(5)->toDateTimeString(),
        'user_id' => $user_id,
      ]);
      $response = [
        'status' => true,
        'msg' => 'Order placed successfully',
        'redirect' => url('bkash/payment/' . $order->transaction_id . '?token=' . $token),
      ];
    } else {
      $response = [
        'status' => false,
        'msg' => 'Order not placed, Try again',
        'redirect' => '/checkout',
      ];
    }

    return response($response);
  }

  public function orderCancel()
  {
    $id = request('order_id');
    $auth = auth()->user();

    $order = GroOrder::where('customer_id', $auth->linked_id)->where('id', $id)->first();
    if ($order) {
      $order->update([
        'status' => 'Cancel',
      ]);
      GroOrderItem::where('order_id', $order->id)->update([
        'order_status' => 'c'
      ]);

      $orders = GroOrder::with('orderItems', 'customer')
        ->withCount('orderItems')
        ->where('order_type', 'b2b')
        ->where('customer_id', $auth->linked_id)
        ->orderBy('id', 'DESC')
        ->get();
      $orders = get_customer_modified_orders($orders);

      return $this->success(['result' => $orders, 'total_orders' => count($orders)]);
    }
    return $this->error('Orders not found!', 422);
  }

  public function customerCart()
  {
    $cart = $this->getCart();
    if ($cart) {
      $cartItems = $cart->cartItems ?? [];
      $item_qty = 0;
      $item_price = 0;
      $total_item_price = 0;
      foreach ($cartItems as $item) {
        $item_price += $item->price;
        $item_qty += $item->quantity;
        $total_item_price = $item_price * $item_qty;
      }
      $cart['total_items'] = $item_qty;
      $cart['items_price'] = $item_price;
      $cart['total_items_price'] = $total_item_price;
    } else {
      $cart = [];
    }

    return $this->success(['cart' => $cart]);
  }
}
