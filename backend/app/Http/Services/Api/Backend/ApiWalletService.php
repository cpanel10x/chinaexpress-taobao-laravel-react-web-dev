<?php

namespace App\Http\Services\Api\Backend;

use App\Http\Services\Api\PaginationService;
use App\Models\Backend\OrderTracking;
use App\Models\Backend\OrderTrackingExceptional;
use App\Models\Content\OrderItem;
use Carbon\Carbon;
use Illuminate\Http\Request;

/**
 * ApiWalletService
 */
class ApiWalletService
{
    public function list()
    {
        $query = OrderItem::with('user', 'order', 'product', 'itemVariations')
            ->whereNotIn('status', ['waiting-for-payment'])
            ->orderByDesc('id');
        $column = [];
        $data  = (new PaginationService())->getPaginatedData($query, $column);
        $paginatedQuery = $data['data'];
        $finalQuery     = $paginatedQuery->get();
        $data['data']   = $finalQuery;
        return $data;
    }


    public function updateWalletCalculation($id)
    {
        $wallet = OrderItem::find($id);
        if ($wallet) {
            $product_price = ($wallet->product_value + $wallet->DeliveryCost - $wallet->coupon_contribution);

            $courier_bill = $wallet->courier_bill;
            $refunded = $wallet->refunded;
            $customer_tax = $wallet->customer_tax;
            $last_payment = $wallet->last_payment;

            $adjustment = $wallet->adjustment;

            $shipping_type = $wallet->shipping_type;
            $weight_change = 0;
            if ($shipping_type != 'regular') {
                $shipping_rate = $wallet->shipping_rate;
                $actual_weight = (int) $wallet->actual_weight;
                $weight_change = ($shipping_rate * $actual_weight);
            }

            $sumData = ($product_price -  $wallet->first_payment - $wallet->out_of_stock - $wallet->missing - $wallet->lost_in_transit);
            $sumData = ($sumData + $refunded + $customer_tax + $weight_change + $courier_bill) - $last_payment;

            $wallet->due_payment = ($sumData + $adjustment);
            $wallet->save();
        }
        return $wallet;
    }
}
