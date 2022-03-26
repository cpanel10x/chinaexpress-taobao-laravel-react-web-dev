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
        if (!$cart_uid) {
            if (!$cart_uid) {
                $cart_uid = $cart_uid ? $cart_uid : Str::random(60);
            }
        }
        return $cart_uid;
    }

    public function get_customer_cart()
    {
        $cart_uid = $this->cart_uid();
        $cart = Cart::with(['cartItems' => function ($query) {
            $query->with('variations');
        }])
            ->withCount('variations')
            ->whereNull('is_purchase')
            ->where('cart_uid', $cart_uid)
            ->first();
        if (!$cart && auth()->check()) {
            $cart = Cart::with(['cartItems' => function ($query) {
                $query->with('variations');
            }])
                ->withCount('variations')
                ->whereNull('is_purchase')
                ->where('user_id', auth()->id())
                ->first();
        }
        return $cart;
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

        return $this->get_customer_cart();
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
        if ($item_id) {
            $variationQty = CartItemVariation::where('cart_item_id', $item_id)->sum('qty');
            if ($variationQty > 0) {
                CartItem::where('id', $item_id)
                    ->update(['Quantity' => $variationQty]);
            } else {
                CartItem::where('id', $item_id)
                    ->delete();
            }
        }
        return $this->get_customer_cart();
    }

    public function toggle_cart_checkbox()
    {
        $cart = $this->get_customer_cart();
        $variation_id = request('variation_id', null);
        $is_checked = request('checked', null);
        if ($cart) {
            if (!$variation_id) {
                CartItemVariation::where('cart_id', $cart->id)
                    ->update(['is_checked' => (int)$is_checked]);
            } else if ($variation_id) {
                CartItemVariation::where('id', $variation_id)
                    ->where('cart_id', $cart->id)
                    ->update(['is_checked' => (int)$is_checked]);
            }
        }
        return $this->get_customer_cart();;
    }


    public function add_shipping_address($type, $shipping)
    {
        $user = User::find(auth()->id());
        $cart = $this->get_customer_cart();
        if ($cart) {
            $shipping_id = $shipping['id'] ?? null;
            if ($type == 'shipping') {
                $cart->update(['shipping' => is_array($shipping) ? json_encode($shipping) : []]);
               if($user){ 
                 $user->update(['shipping_id' => $shipping_id]);
               }
            }
            if ($type == 'billing') {
                $cart->update(['billing' => json_encode($shipping)]);
                if($user){ 
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

        return $this->get_customer_cart();
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
        return $this->get_customer_cart();
    }

    public function add_payment_information($pmt)
    {
        $cart = $this->get_customer_cart();
        if ($cart) {
            $cart->update([
                'payment_method' => $pmt
            ]);
        }
        return $this->get_customer_cart();
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
            $cartItems = $cart->cartItems;
            $advanced_rate = get_setting('advanced_rate', 60);
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
