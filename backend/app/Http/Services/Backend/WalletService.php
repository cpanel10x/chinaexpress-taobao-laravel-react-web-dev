<?php

namespace App\Http\Services\Backend;

use App\Models\Backend\TrackingOrder;
use App\Models\Content\OrderItem;
use Illuminate\Http\Request;

/**
 * WalletService
 */
class WalletService
{


    public function list()
    {
        $data = OrderItem::with('user', 'order', 'product')->orderByDesc('id')->get();

        return [
            'info' => [
                'seed' => '',
                'results' => $data->count(),
                'page' => 1,
            ],
            'results' => $data
        ];
    }

    public function updateTracking(Request $request, $wallet_id)
    {
        $status = $request->status;
        $tracking_date = $request->tracking_date;
        $tracking = TrackingOrder::where('order_item_id', $wallet_id)
            ->where('status', $status)
            ->first();
        if ($tracking) {
            if ($tracking_date) {
                $tracking->updated_time = now($tracking_date)->toDateTimeString();
                $tracking->save();
            }
        } else {
            $tracking = new TrackingOrder();
            $tracking->updated_time = now();
            $tracking->status = $status;
            $tracking->user_id = auth()->id();
            $tracking->save();
        }

        return true;
    }
}
