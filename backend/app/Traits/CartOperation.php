<?php

namespace App\Traits;

use App\Models\Auth\User;
use App\Models\Content\Cart;
use App\Models\Content\CartItem;
use App\Models\Content\CartItemVariation;
use App\Models\Content\Coupon;
use App\Models\Content\CouponUser;
use App\Models\Content\Order;
use App\Models\Content\OrderItem;
use App\Models\Content\OrderItemVariation;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Str;

trait CartOperation
{
  public function cart_uid()
  {
    $cart_uid = request('token', null);
    return $cart_uid ? $cart_uid : Str::random(60);
  }

  public function get_pure_cart($cart_id)
  {
    return Cart::with(['cartItems' => function ($query) {
      $query->with('variations')->withCount('variations');
    }])
      ->whereNull('is_purchase')
      ->where('id', $cart_id)
      ->first();
  }

  public function get_customer_cart($cart_uid = null)
  {
    $cart_uid = $cart_uid ? $cart_uid : $this->cart_uid();
    $auth_check = auth('sanctum')->check();
    $cart = Cart::whereNull('is_purchase')
      ->where('cart_uid', $cart_uid)
      ->orderByDesc('id')
      ->get();
    if ($cart->isEmpty() && $auth_check) {
      $cart = Cart::whereNull('is_purchase')
        ->where('user_id', auth('sanctum')->id())
        ->orderByDesc('id')
        ->get();
    }

    if ($cart->isEmpty()) {
      return [];
    }

    $first = $cart->first();

    if ($cart->count() > 1) {
      foreach ($cart as $item) {
        if ($first->id !== $item->id) {
          CartItem::where('cart_id', $item->id)
            ->update([
              'cart_id' => $first->id,
            ]);
          CartItemVariation::where('cart_id', $item->id)
            ->update([
              'cart_id' => $first->id,
            ]);
          $item->update(['is_purchase' => 1]);
        }
      }
    }

    $cart = $this->get_pure_cart($first->id);

    if ($auth_check) {
      $auth_id = auth('sanctum')->id();
      $shipping = User::with('shipping')->find($auth_id);
      $shipping = $shipping->shipping ? json_encode($shipping->shipping) : null;
      $cart->update([
        'payment_method' => 'bkash',
        'shipping' => $shipping,
        'user_id' => $auth_id
      ]);
    }
    if ($cart) {
      if (!$cart->cart_uid || $cart->cart_uid == 'null') {
        $cart_random_uid = Str::random(60);
        $cart->update([
          'cart_uid' => $cart_random_uid
        ]);
      }
    }

    return $cart;
  }

  public function get_checkout_cart()
  {
    $cart = $this->get_customer_cart();
    if ($cart) {
      $cartItems = $cart->cartItems;
      foreach ($cartItems as $item) {
        if (!$item->IsCart) {
          $variations = $item->variations->pluck('id');
          CartItemVariation::whereIn('id', $variations)->delete();
          CartItem::where('id', $item->id)->delete();
        }
      }
    }
    return  $this->get_pure_cart($cart->id);
  }

  public function add_to_cart($product)
  {
    $cart_uid = $this->cart_uid();
    $user = auth()->user();
    $user_id = $user->id ?? null;
    $shipping = $user->shipping ?? [];
    $cart = $this->get_customer_cart();
    if (!$cart) {
      $cart = Cart::create([
        'cart_uid' => $cart_uid,
        'user_id' => $user_id,
        'shipping' => json_encode($shipping),
        'status' => 'new'
      ]);
    }
    if (!$cart) {
      return [];
    }
    $cart_id = $cart->id;
    $ItemId = $product['Id'] ?? null;
    $ProviderType = $product['ProviderType'] ?? null;
    $CartItem = null;
    if ($cart_id) {
      $data['Title'] = $product['Title'] ?? null;
      $data['ProviderType'] = $product['ProviderType'] ?? null;
      $data['ItemMainUrl'] = $product['TaobaoItemUrl'] ?? null;
      $data['MainPictureUrl'] = $product['MainPictureUrl'] ?? null;
      $data['MasterQuantity'] = $product['MasterQuantity'] ?? null;
      $data['FirstLotQuantity'] = $product['FirstLotQuantity'] ?? null;
      $data['NextLotQuantity'] = $product['NextLotQuantity'] ?? null;
      $data['ProductPrice'] = $product['Price'] ?? null;
      $data['weight'] = $product['weight'] ?? null;
      $data['shipping_type'] = $product['shipping_type'] ?? null;
      $data['DeliveryCost'] = $product['DeliveryCost'] ?? null;
      $data['Quantity'] = $product['Quantity'] ?? null;
      $data['hasConfigurators'] = $product['hasConfigurators'] ?? null;
      $data['is_checked'] = $product['IsCart'] ?? null;
      $CartItem = CartItem::updateOrCreate(['cart_id' => $cart_id, 'ItemId' => $ItemId], $data);
    }

    $ConfiguredItem = $product['ConfiguredItems'] ?? [];
    if (is_array($ConfiguredItem) && !empty($ConfiguredItem) && $CartItem) {
      $cart_item_id = $CartItem->id;
      $configId = $ConfiguredItem['Id'] ?? null;
      $variation['attributes'] = json_encode($ConfiguredItem['Attributes'] ?? []);
      $variation['maxQuantity'] = $ConfiguredItem['maxQuantity'] ?? null;
      $variation['price'] = $ConfiguredItem['price'] ?? null;
      $variation['qty'] = $ConfiguredItem['qty'] ?? null;
      CartItemVariation::updateOrInsert(
        ['cart_item_id' => $cart_item_id, 'cart_id' => $cart_id, 'configId' => $configId],
        $variation
      );
    }

    return  $this->get_pure_cart($cart->id);
  }


  private function shippingCalculate($item, $process = [])
  {
    $variations = $item->variations ?? [];
    $totalQty = 0;
    $totalPrice = 0;
    foreach ($variations as $variation) {
      $totalQty += $variation->qty;
      $totalPrice += $variation->qty * $variation->price;
    }
    $ship_type = $item ? $item->shipping_type : null;
    $ProviderType = $item ? $item->ProviderType : null;
    $shipping_type = getArrayKeyData($process, 'shipping_type', $ship_type);

    if ($ProviderType == 'aliexpress' && $shipping_type == 'express') {
      $totalQty = $variations->sum('qty');
      $weight = $totalQty * $item->weight;
      $aliTotal = get_setting('express_shipping_min_value');
      $process['DeliveryCost'] = get_aliExpress_shipping($weight);
      if ($totalPrice < $aliTotal) {
        $process['shipping_type'] = null;
        $process['DeliveryCost'] = 0;
      }
      $process['shipping_rate'] = get_aliExpress_air_shipping_rate($variations);
    } else {
      $process['shipping_rate'] = get_aliExpress_air_shipping_rate($variations, 'taobao');
    }
    if (!empty($process) && $item) {
      $item->update($process);
    }
    return $process;
  }

  public function update_cart()
  {
    $item_id = request('item_id');
    $variation_id = request('variation_id');
    $qty = request('qty');

    $cart = $this->get_customer_cart();
    if (!$cart) {
      return [];
    }

    if ($variation_id) {
      if ($qty > 0) {
        CartItemVariation::where('id', $variation_id)->update(['qty' => $qty]);
      } else {
        CartItemVariation::where('id', $variation_id)->delete();
      }
    }
    $item = CartItem::with('variations')->where('id', $item_id)->first();
    if ($item) {
      $variationQty = CartItemVariation::where('cart_item_id', $item_id)->sum('qty');
      if ($variationQty > 0) {
        $item->update(['Quantity' => $variationQty]);
      } else {
        $item->delete();
      }
      $this->shippingCalculate($item);
    }

    return  $this->get_pure_cart($cart->id);
  }


  public function update_checkout_cart()
  {
    $item_id = request('item_id');
    $variation_id = request('variation_id');
    $qty = request('qty');
    $cart = $this->get_customer_cart();
    if (!$cart) {
      return [];
    }
    if ($variation_id) {
      if ($qty > 0) {
        CartItemVariation::where('id', $variation_id)->update(['qty' => $qty]);
      } else {
        CartItemVariation::where('id', $variation_id)->delete();
      }
    }
    $item = CartItem::with('variations')->where('id', $item_id)->first();
    if ($item) {
      $variations = CartItemVariation::where('cart_item_id', $item_id)->get();
      if ($variations->isEmpty()) {
        $process['DeliveryCost'] = null;
        $process['shipping_rate'] = null;
      } else {
        $totalQty = $variations->sum('qty');
        if ($item->ProviderType == 'aliexpress' && $item->shipping_type == 'express') {
          $weight = $totalQty * $item->weight;
          $process['DeliveryCost'] = get_aliExpress_shipping($weight);
          $process['shipping_rate'] = get_aliExpress_air_shipping_rate($variations);
        } else {
          $process['shipping_rate'] = get_aliExpress_air_shipping_rate($variations, 'taobao');
        }
      }
      if (!empty($process) && $item) {
        $item->update($process);
      }
    }

    return  $this->get_pure_cart($cart->id);
  }


  public function product_mark_as_cart()
  {
    $item_id = request('item_id');
    $shipping_type = request('shipping_type');
    $cart = $this->get_customer_cart();
    if (!$cart) {
      return [];
    }
    if ($item_id) {
      $data['IsCart'] = 1;
      if ($shipping_type) {
        $data['shipping_type'] = $shipping_type;
      }
      CartItem::where('cart_id', $cart->id)
        ->where('ItemId', $item_id)
        ->update($data);
    }
    return  $this->get_pure_cart($cart->id);
  }

  public function ali_product_choose_shipping()
  {
    $item_id = request('item_id');
    $shipping = request('shipping_type', null);
    $DeliveryCost = request('shipping_cost', 0);
    $cart = $this->get_customer_cart();
    if (!$cart) {
      return [];
    }
    if ($item_id) {
      $data = [
        'is_express_popup_shown' => null,
        'is_popup_shown' => null,
        'IsCart' => null,
        'shipping_type' => $shipping
      ];
      if ($DeliveryCost) {
        $data['DeliveryCost'] = $DeliveryCost;
      }
      $item = CartItem::where('cart_id', $cart->id)
        ->where('ItemId', $item_id)->first();
      $this->shippingCalculate($item, $data);
    }
    return  $this->get_pure_cart($cart->id);
  }

  public function read_popup_message()
  {
    $item_id = request('item_id');
    $is_express_popup_shown = request('is_express_popup_shown');
    $cart = $this->get_customer_cart();
    if (!$cart) {
      return [];
    }
    if ($item_id) {
      CartItem::where('cart_id', $cart->id)
        ->where('ItemId', $item_id)
        ->update(['is_popup_shown' => 1, 'is_express_popup_shown' => $is_express_popup_shown]);
    }
    return  $this->get_pure_cart($cart->id);
  }


  public function toggle_cart_checkbox()
  {
    $cart = $this->get_customer_cart();
    $variation_id = request('variation_id', null);
    $is_checked = request('checked', null);
    if ($cart) {
      // $is_checked = $is_checked ? 1 : null;
      if (!$variation_id) {
        CartItemVariation::where('cart_id', $cart->id)
          ->update(['is_checked' => (int) $is_checked]);
      } else if ($variation_id) {
        CartItemVariation::where('id', $variation_id)
          ->where('cart_id', $cart->id)
          ->update(['is_checked' => (int) $is_checked]);
      }
    }
    return  $this->get_pure_cart($cart->id);
  }


  public function add_shipping_address($type, $shipping)
  {
    $user = User::find(auth()->id());
    $cart = $this->get_customer_cart();
    if ($cart) {
      $shipping_id = $shipping['id'] ?? null;
      if ($type == 'shipping') {
        $cart->update(['shipping' => is_array($shipping) ? json_encode($shipping) : []]);
        if ($user) {
          $user->update(['shipping_id' => $shipping_id]);
        }
      }
      if ($type == 'billing') {
        $cart->update(['billing' => json_encode($shipping)]);
        if ($user) {
          $user->update(['shipping_id' => $shipping_id]);
        }
      }
    }
    if ($user) {
      if (!$user->name) {
        $name = $shipping['name'] ?? null;
        $user->update(['name' => $name]);
      }
    }

    return  $this->get_pure_cart($cart->id);
  }

  public function remove_from_cart()
  {
    $cart = $this->get_customer_cart();
    if ($cart) {
      $items = CartItemVariation::where('is_checked', 1)->where('cart_id', $cart->id);
      $itemsArray = $items->pluck('cart_item_id')->toArray() ?? [];
      $items->delete();
      $items = CartItem::withCount('variations')->whereIn('id', $itemsArray)->get();
      foreach ($items as $item) {
        if (!$item->variations_count) {
          $item->delete();
        }
      }
    }
    return  $this->get_pure_cart($cart->id);
  }

  public function add_payment_information($pmt)
  {
    $cart = $this->get_customer_cart();
    if ($cart) {
      $cart->update([
        'payment_method' => $pmt
      ]);
    }
    return  $this->get_pure_cart($cart->id);
  }


  public function placedCustomerOrder($tran_id)
  {
    $cart = $this->get_customer_cart();
    if ($cart) {
      $user = User::find(auth()->id());
      $status = 'waiting-for-payment';
      $order = Order::create([
        'order_number' => null,
        'name' => $user->name,
        'phone' => $user->phone,
        'user_id' => $user->id,
        'shipping' => $user->phone ?? '',
        'billing' => $user->phone ?? '',
        'coupon_code' => $cart->coupon_code,
        'coupon_discount' => $cart->coupon_discount,
        'status' => $status,
        'transaction_id' => $tran_id,
        'payment_method' => $cart->payment_method,
        'bkash_payment_id' => null,
        'order_from' => 'web',
      ]);

      $order->update([
        'order_number' => generate_order_number($order->id)
      ]);

      $order_id = $order->id;
      $cartItems = CartItem::where('cart_id', $cart->id)
        ->with(['variations' => function ($variations) {
          $variations->where('is_checked', 1);
        }])
        ->whereHas('variations', function ($variation) {
          $variation->where('is_checked', 1);
        })->get();
      $advanced_rate = get_setting('payment_advanched_rate', 60);
      foreach ($cartItems as $product) {
        $orderItem = OrderItem::create([
          'item_number' => null,
          'order_id' => $order_id,
          'user_id' => $user->id,
          'ItemId' => $product->ItemId,
          'Title' => $product->Title,
          'ProviderType' => $product->ProviderType,
          'ItemMainUrl' => $product->ItemMainUrl,
          'MainPictureUrl' => $product->MainPictureUrl,
          'regular_price' => $product->ProductPrice,
          'weight' => $product->weight,
          'DeliveryCost' => $product->DeliveryCost,
          'Quantity' => $product->Quantity,
          'hasConfigurators' => $product->hasConfigurators,
          'shipped_by' => $product->shipped_by,
          'shipping_rate' => $product->shipping_rate,
          'shipping_from' => $product->shipping_from,
          'status' => $status,
          'tracking_number' => null,
          'product_value' => null,
          'first_payment' => null,
          'coupon_contribution' => null,
          'bd_shipping_charge' => null,
          'courier_bill' => null,
          'out_of_stock' => null,
          'missing' => null,
          'adjustment' => null,
          'refunded' => null,
          'last_payment' => null,
          'due_payment' => null,
          'invoice_no' => null,
        ]);

        if ($orderItem) {
          $item_id = $orderItem->id;
          $DeliveryCost = $orderItem->DeliveryCost;
          $variations = $product->variations;
          $product_value = 0;
          foreach ($variations as $variation) {
            $price = $variation->price;
            $qty = $variation->qty;
            $subTotal = round($price * $qty);
            $product_value += $subTotal;
            $variation = OrderItemVariation::create([
              'order_id' => $order_id,
              'item_id' => $item_id,
              'user_id' => $user->id,
              'configId' => $variation->configId,
              'price' => $price,
              'qty' => $qty,
              'attributes' => $variation->attributes,
              'subTotal' => $subTotal,
            ]);
          }
          $product_value = $product_value + $DeliveryCost;
          $first_payment = ($product_value * $advanced_rate) / 100;
          $due_payment = $product_value - $first_payment;
          $orderItem->update([
            'item_number' => generate_order_number($orderItem->id),
            'product_value' => $product_value,
            'first_payment' => round($first_payment),
            'due_payment' => round($due_payment),
          ]);
        }
      }

      $coupon_code = $order->coupon_code;
      $coupon_discount = $order->coupon_discount;

      if ($coupon_code) {
        $findCoupon = Coupon::where('coupon_code', $coupon_code)->first();
        CouponUser::create([
          'coupon_id' => $findCoupon->id,
          'coupon_code' => $coupon_code,
          'coupon_details' => '',
          'win_amount' => $coupon_discount,
          'order_id' => $order->id,
          'user_id' => $user->id,
        ]);
      }
      $cart->update(['is_purchase' => 1]);
      return $order;
    }
    return null;
  }


  public function coupon_code_submit($coupon_code)
  {
    $cart = $this->getCart();
    $cartTotal = $this->cartTotal($cart);
    $discount = $this->validateAppCoupon($coupon_code, $cartTotal);
    if (is_array($discount)) {
      $status = $discount['status'] ?? false;
      if (!$status) {
        $cart->update([
          'coupon_code' => null,
          'coupon_discount' => null,
        ]);
        $cart = $this->getCart();
        return ['cart' => $cart, 'msg' => 'Coupon is not valid'];
      }
      $amount = $discount['amount'] ?? 0;
      if ($amount == 'free_shipping') {
        $delivery_charge = $cart['delivery_charge'] ?? 0;
        $discount['amount'] = (int)$delivery_charge;
      }
    }
    $cart->update([
      'coupon_code' => $coupon_code,
      'coupon_discount' => $discount,
    ]);
    $cart = $this->getCart();
    return ['cart' => $cart, 'msg' => 'Coupon added successfully'];
  }

  public function coupon_reset()
  {
    $cart = $this->getCart();
    $msg = 'Coupon reset failed';
    if ($cart) {
      $this->resetCoupon($cart);
      $cart = $this->getCart();
      $msg = 'Coupon reset successfully';
    }
    return ['cart' => $cart, 'msg' => $msg];
  }
}
