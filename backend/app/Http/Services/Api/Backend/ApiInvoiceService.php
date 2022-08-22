<?php

namespace App\Http\Services\Api\Backend;

use App\Http\Services\Api\PaginationService;
use App\Http\Services\Backend\TrackingService;
use App\Models\Auth\User;
use App\Models\Content\Invoice;
use App\Models\Content\InvoiceItem;
use App\Models\Content\OrderItem;

/**
 * ApiInvoiceService
 */
class ApiInvoiceService
{
    public function list($request)
    {
        $search_val   = $request->input('search');
        $status   = $request->input('status', []);
        $query = Invoice::orderByDesc('id');
        $searchable = ['item_number', 'Title', 'order_id', 'shipping_type', 'shipping_from', 'ItemId', 'ProviderType', 'status', 'source_order_number', 'tracking_number',  'invoice_no'];
        if ($search_val && count($searchable) > 0) {
            $query->where(function ($query) use ($searchable, $search_val) {
                foreach ($searchable as $col) {
                    $query->orWhere($col, 'LIKE', "%$search_val%");
                }
            })->orWhereHas('order', function ($query) use ($search_val) {
                $query->where('transaction_id', 'like', '%' . $search_val . '%')
                    ->orWhere('phone', 'like', '%' . $search_val . '%')
                    ->orWhere('name', 'like', '%' . $search_val . '%');
            });
        }

        if (count($status) > 0) {
            $query->whereIn('status', $status);
        }

        $column = [];
        $data  = (new PaginationService())->getPaginatedData($query, $column);
        $paginatedQuery = $data['data'];
        $finalQuery     = $paginatedQuery->get();
        $data['data']   = $finalQuery;
        return $data;
    }


    public function store($request)
    {
        $invoices = $request->input('invoices', []);
        $related = $request->input('related', []);
        $status = false;
        if (!empty($related)) {
            $user_id = $related['user_id'];
            $isNotify = $related['notify_customer'];
            $courier_bill = $related['courier_bill'];
            $payment_method = $related['payment_method'];
            $delivery_method = $related['delivery_method'];
            $user = User::with('shipping')->find($user_id);
            $invoice = Invoice::create([
                // 'transaction_id' => uniqid('SSL'),
                'customer_name' => $user->full_name,
                'customer_phone' => $user->phone,
                'customer_address' => json_encode($user->shipping),
                'total_payable' => $related['payable_amount'],
                'total_courier' => $courier_bill,
                'payment_method' => $payment_method,
                'delivery_method' => $delivery_method,
                'total_due' => $related['payable_amount'],
                'status' => 'Pending',
                'user_id' => $user_id,
            ]);

            $invoice_no = generate_order_number($invoice->id, 4);

            $invoice->update([
                'invoice_no' => $invoice_no,
            ]);

            $item_ids = [];

            if (!empty($invoices)) {
                foreach ($invoices as $item) {
                    array_push($item_ids, $item['id']);
                    if ($item['status'] == 'received-in-BD-warehouse') {
                        $invoice_status = 'on-transit-to-customer';
                    } else {
                        $invoice_status = $item['status'];
                    }
                    InvoiceItem::create([
                        'invoice_id' => $invoice->id,
                        'order_item_id' => $item['id'],
                        'order_item_number' => $item['item_number'],
                        'product_id' => $item['ItemId'],
                        'product_name' => $item['Title'],
                        'weight' => $item['actual_weight'],
                        'total_due' => $item['due_payment'],
                        'user_id' => $user_id,
                    ]);
                    if ($isNotify) {
                        generate_customer_notifications('on-transit-to-customer', $user, $item['item_number'], $item['due_payment'], "");
                    }
                }
            }
            $total_invoices = is_array($invoices) ? count($invoices) : 0;
            $courier_bill = $courier_bill > 0 && $total_invoices > 0 ? $courier_bill / $total_invoices : 0;
            $orderItem = null;
            $wallet_Items = OrderItem::whereIn('id', $item_ids)->get();
            foreach ($wallet_Items as $wallet) {
                if ($wallet->status == 'received-in-BD-warehouse') {
                    $order_item_status = 'on-transit-to-customer';
                } else {
                    $order_item_status = $wallet->status;
                }
                $wallet->courier_bill = $courier_bill;
                $wallet->invoice_no = $invoice_no;
                $wallet->status = $order_item_status;
                $wallet->save();

                (new TrackingService())->updateTracking($wallet->id, 'on-transit-to-customer');
                if ($courier_bill) {
                    (new ApiWalletService())->updateWalletCalculation($wallet->id);
                }
            }

            $status = $orderItem ? true : false;
        }

        return ['status' => $status];
    }
}
