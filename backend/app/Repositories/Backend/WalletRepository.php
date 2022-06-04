<?php

namespace App\Repositories\Backend;

use App\Events\Backend\Auth\User\UserCreated;
use App\Events\Backend\Auth\User\UserPermanentlyDeleted;
use App\Events\Backend\Auth\User\UserRestored;
use App\Events\Backend\Auth\User\UserUpdated;
use App\Exceptions\GeneralException;
use App\Models\Auth\User;
use App\Models\Content\OrderItem;
use App\Notifications\Frontend\Auth\UserNeedsConfirmation;
use App\Repositories\BaseRepository;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

/**
 * Class UserRepository.
 */
class WalletRepository extends BaseRepository
{
  /**
   * UserRepository constructor.
   *
   * @param  User  $model
   */
  public function __construct(OrderItem $model)
  {
    $this->model = $model;
  }


  public function all()
  {
    return $this->model->whereNotNull('active')->pluck('value', 'key')->toArray();
  }


  public function storeComments(Request $request, $id)
  {
    $wallet = $this->model->find($id);
    if ($wallet) {
      $type = $request->type;
      $comments = $request->comments;
      if ($type == 'one') {
        $wallet->comment1 = $comments;
      } else {
        $wallet->comment2 = $comments;
      }
      $wallet->save();
    }
    return $wallet;
  }


  public function updatedParameters(Request $request, $id)
  {
    $wallet = $this->model->find($id);
    $data = [];
    if ($wallet) {
      $data = $wallet->toArray();
      $product_value = $wallet->product_value ? $wallet->product_value : 0;
      $DeliveryCost = $wallet->DeliveryCost ? $wallet->DeliveryCost : 0;
      $coupon = $wallet->coupon_contribution ? $wallet->coupon_contribution : 0;
      $data['net_product_value'] = ($product_value + $DeliveryCost - $coupon);

      $weight = $wallet->actual_weight ? $wallet->actual_weight : 0;
      $Quantity = $wallet->Quantity ? $wallet->Quantity : 0;
      $totalWeight = $weight * $Quantity;
      $data['invoice_no'] = $wallet->invoice_no ? $wallet->invoice_no : "N/A";

      $shipping_rate = $wallet->shipping_rate ? $wallet->shipping_rate : 0;
      $shipping_type = $wallet->shipping_type ? $wallet->shipping_type : null;
      if ($shipping_type == 'regular') {
        $data['shipping_rate'] = 'N/A';
        $data['weight_charges'] = '0';
      } else {
        $data['weight_charges'] = round($shipping_rate * $totalWeight);
      }

      $data['invoice_no'] = $wallet->invoice_no ? $wallet->invoice_no : "N/A";
      $data['source_order_number'] = $wallet->source_order_number ? $wallet->source_order_number : "N/A";
      $data['tracking_number'] = $wallet->tracking_number ? $wallet->tracking_number : "N/A";

      $purchases_at = $wallet->purchases_at;
      $days = $purchases_at ? Carbon::parse($purchases_at)->diffInDays() : 0;
      $data['day_count'] = $days <= 1 ? $days . ' Day' : $days . ' Days';
    }
    return $data;
  }



  public function updateWalletCalculation(Request $request, $id)
  {
    $wallet = $this->model->find($id);
    if ($wallet) {
      $product_price = ($wallet->product_value + $wallet->DeliveryCost - $wallet->coupon_contribution);
      $first_payment = $wallet->first_payment;
      $out_of_stock = $wallet->out_of_stock;
      $missing = $wallet->missing;
      $lost_in_transit = $wallet->lost_in_transit;

      $courier_bill = $wallet->courier_bill;
      $refunded = $wallet->refunded;
      $customer_tax = $wallet->customer_tax;
      $last_payment = $wallet->last_payment;

      $adjustment = $wallet->adjustment;

      $shipping_type = $wallet->shipping_type;
      $weight_change = 0;
      if ($shipping_type != 'regular') {
        $shipping_rate = $wallet->shipping_rate;
        $actual_weight = $wallet->actual_weight;
        $weight_change = ($shipping_rate * $actual_weight);
      }

      $sumData = ($product_price -  $first_payment - $out_of_stock - $missing - $lost_in_transit);
      $sumData = ($sumData + $refunded + $customer_tax + $weight_change + $courier_bill) - $last_payment;

      $orderItem = $this->model->find($id);
      $orderItem->due_payment = ($sumData + $adjustment);
      $orderItem->save();
    }
    return $wallet;
  }
}
