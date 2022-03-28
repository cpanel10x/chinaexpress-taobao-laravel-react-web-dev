<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Content\Order;

class DashboardController extends Controller
{


  public function paymentStatusUpdate()
  {
    $tran_id = request('tran_id');
    $paymentID = request('paymentID');
    $method = request('payment_method', 'bkash');

    $user = auth('sanctum')->user();
    $order = Order::where('transaction_id', $tran_id)
      ->where('user_id', $user->id)
      ->where('status', 'waiting-for-payment')
      ->first();

    if ($order) {
      $order->update([
        'bkash_payment_id' => $paymentID,
        'status' => 'partial-paid',
        'payment_method' => $method
      ]);
    }

    return response(['status' => true]);
  }

  public function orderIndex()
  {
    $user_id = auth()->id();
    $page = request('page', 0);
    $limit = request('limit', 10);
    $offset = ($page * $limit);

    $orders = Order::with('orderItems')
      ->latest()
      ->where('user_id', $user_id)
      ->offset($offset)
      ->limit($limit)
      ->get();
    return response([
      'orders' => $orders
    ]);
  }

  public function orderDetails($tran_id)
  {
    $user_id = auth()->id();
    $order = Order::with(['orderItems' => function ($query) {
      $query->with('itemVariations');
    }])
      ->latest()
      ->where('user_id', $user_id)
      ->where('transaction_id', $tran_id)
      ->first();
    return response([
      'order' => $order
    ]);
  }
}
