<?php

namespace App\Http\Services\Backend;

use App\Models\Backend\OrderTracking;
use App\Models\Backend\OrderTrackingExceptional;
use App\Models\Content\OrderItem;
use Carbon\Carbon;
use Illuminate\Http\Request;

/**
 * TrackingService
 */
class TrackingService
{




    public function show($item_id)
    {
        $tracking = OrderTracking::with(['exceptions' => function ($exceptions) {
            $exceptions->orderByDesc('id');
        }])->where('order_item_id', $item_id)
            ->orderByDesc('id')
            ->get();
        return $tracking;
    }

    public function initialTrackerStatus($wallet, $status, $item_id)
    {
        $user_id = auth()->id();
        $statusArray = [];
        if ($wallet->shipping_type == 'regular' && $wallet->ProviderType == 'aliexpress') {
            $statusArray = $this->aliRegularTrackingArray();
        } else {
            $statusArray = $this->expressTrackingArray();
        }
        foreach ($statusArray as $key => $value) {
            $tracking = new OrderTracking();
            $tracking->order_item_id = $item_id;
            $tracking->status = $key;
            $tracking->tracking_status = $value;
            if ($status === $key) {
                $tracking->updated_time = now();
            }
            if ($key === 'partial-paid') {
                $tracking->updated_time = $wallet->created_at;
            }
            $tracking->user_id = $user_id;
            $tracking->save();
        }
    }

    public function updateTracking(Request $request)
    {
        $item_id = $request->item_id;
        $status = $request->status;
        $tracking_date = $request->tracking_date;
        $user_id = auth()->id();

        $wallet = OrderItem::find($item_id);
        $tracking = OrderTracking::where('order_item_id', $item_id)->get();
        if ($tracking->isEmpty()) {
            $this->initialTrackerStatus($wallet, $status, $item_id);
        } else {
            $tracking_find = OrderTracking::where('order_item_id', $item_id)->where('status', $status)->first();
            if ($tracking_find) {
                $tracking_find->updated_time = now();
                $tracking_find->save();
            }

            if (!$tracking_find) {
                $last_track = OrderTracking::where('order_item_id', $item_id)
                    ->whereNotNull('updated_time')
                    ->orderByDesc('id')
                    ->first();
                $exceptArray = $this->exceptionTrackingArray();
                if (array_key_exists($status, $exceptArray)) {
                    $findExceptional = OrderTrackingExceptional::where('order_tracking_id', $last_track->id)
                        ->where('status', $status)->first();
                    if (!$findExceptional) {
                        $findExceptional = new OrderTrackingExceptional();
                    }
                    $findExceptional->order_item_id = $item_id;
                    $findExceptional->order_tracking_id = $last_track->id;
                    $findExceptional->status = $status;
                    $findExceptional->tracking_status = $exceptArray[$status];
                    $findExceptional->updated_time = now();
                    $findExceptional->user_id = $user_id;
                    $findExceptional->save();
                }
            }
        }



        return true;
    }

    public function expressTrackingArray()
    {
        return [
            'partial-paid' => 'Partial Paid',
            'purchased' => 'Purchased',
            'shipped-from-suppliers' => 'Shipped from Seller',
            'received-in-china-warehouse' => 'Received in China Warehouse',
            'shipped-from-china-warehouse' => 'Shipped from China Warehouse',
            'received-in-BD-warehouse' => 'Received in BD Warehouse',
            'on-transit-to-customer' => 'On Transit to Customer',
            'delivered' => 'Delivered',
        ];
    }

    public function aliRegularTrackingArray()
    {
        return [
            'partial-paid' => 'Partial Paid',
            'purchased' => 'Purchased',
            'shipped-from-suppliers' => 'Shipped from Seller',
            'received-in-BD-warehouse' => 'Received in BD Warehouse',
            'on-transit-to-customer' => 'On Transit to Customer',
            'delivered' => 'Delivered',
        ];
    }

    public function exceptionTrackingArray()
    {
        return [
            'out-of-stock' => 'Out of Stock',
            'missing' => 'Missing/Shortage',
            'adjustment' => 'Adjustment',
            'lost_in_transit' => 'Lost in Transit',
            'refunded' => 'Refund to Customer',
            'cancel' => 'Order Canceled',
            'comment1' => 'Comment-1',
            'comment2' => 'Comment-2',
        ];
    }
}
