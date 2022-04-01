<?php

namespace App\Http\Controllers\Backend;

use App\Exports\InvoicesExport;
use App\Exports\OrdersExport;
use App\Exports\WalletsExport;
use App\Http\Controllers\Controller;
use App\Models\Auth\User;
use App\Models\Content\OrderItem;
use App\Models\Content\OrderItemVariation;
use App\Notifications\PushNotification;
use Illuminate\Support\Facades\Notification;
use Maatwebsite\Excel\Facades\Excel;

/**
 * Class DashboardController.
 */
class DashboardController extends Controller
{
  /**
   * @return \Illuminate\View\View
   */
  public function index()
  {

    $orderItems = OrderItem::latest()->get();

    $orders = OrderItem::whereHas('order', function ($order) {
      $order->whereNotIn('status', ['waiting-for-payment']);
    })->get();

    $product_value = $orders->sum('product_value');
    $first_payment = $orders->sum('first_payment');
    $customer_due = $orders->sum('due_payment');
    $weight = $orders->sum('weight');

    return view('backend.dashboard', compact('product_value', 'first_payment', 'customer_due', 'weight'));
  }



  public function export($table)
  {
    $export = null;
    if ($table == 'orders') {
      return Excel::download(new OrdersExport(), 'order-table-' . date('Y-m-d-h-i-a') . '.xlsx');
    } elseif ($table == 'order_item') {
      return Excel::download(new WalletsExport(), 'wallet-table-' . date('Y-m-d-h-i-a') . '.xlsx');
    } elseif ($table == 'invoices') {
      return Excel::download(new InvoicesExport(), 'invoices-table-' . date('Y-m-d-h-i-a') . '.xlsx');
    }
    return redirect()->back()->withFlashDanger('File export fail');
  }
}
