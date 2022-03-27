<?php

namespace App\Http\Controllers\PaymentGateway;

use App\Http\Controllers\Controller;
use App\Models\Content\Invoice;
use App\Models\Content\Order;
use App\Models\Content\OrderItem;
use App\Models\Content\Setting;
use App\Traits\ApiResponser;
use App\Traits\BkashApiResponse;
use App\Traits\EmailNotifications;

class BkashPaymentController extends Controller
{
  use ApiResponser, BkashApiResponse, EmailNotifications;

  public $order = null;
  public $paymentID = null;
  public $timestamp = null;
  public $statusMessage = null;


  public function processAmount($id)
  {
    $order = Order::with('orderItems')->where('status', 'waiting-for-payment')->where('transaction_id', $id)->first();
    $amount = $order ? (int)($order->orderItems->sum('first_payment')) : 0;
    if (!$order) {
      $invoice = Invoice::where('status', 'waiting-for-payment')->where('transaction_id', $id)->first();
      $amount = $amount ? $amount : ($invoice ? $invoice->total_payable : 0);
    }
    return ceil($amount);
  }


  public function bkashPaymentProcess($tran_id)
  {
    $amount = $this->processAmount($tran_id);
    $data = [
      'ref_no' => $tran_id,
      'amount' => $amount,
      'token_url' => url('/bkash/token'),
      'checkout_url' => url("/bkash/checkout?ref_no={$tran_id}&intent=sale"),
      'execute_url' => url('/bkash/execute?paymentID='),
      'success_url' => "/online/payment/success?ref_no={$tran_id}",
      'failed_url' => "/online/payment/failed?ref_no={$tran_id}",
      'cancel_url' => "/online/payment/cancel?ref_no={$tran_id}"
    ];
    return view('frontend.payment.bkash', compact('data'));
  }


  public function PaymentStatus()
  {
    $status = request('status');
    $n_msg = request('n_msg');
    $paymentID = request('paymentID', 'undefined');
    $tran_id = request('tran_id');
    $order = Order::with('user')->where('transaction_id', $tran_id)->first();
    $this->order = $order;
    $this->paymentID = $paymentID;
    $this->statusMessage = $n_msg;

    if ($status == 'success') {
      if ($paymentID) {
        $order->update(['bkash_payment_id' => $paymentID]);
      }
      return $this->bkash_order_success();
    }

    if ($status == 'cancel') {
      return $this->bkash_order_cancel();
    }
    if ($status == 'failed') {
      return $this->bkash_order_failure();
    }
    return redirect("/payment/{$tran_id}?status=failure&paymentID={$this->paymentID}&timestamp={$this->timestamp}&msg={$this->statusMessage}");
  }


  public function bkash_order_success()
  {
    $order = $this->order;
    if ($order) {
      $order_id = $order->id;
      if ($order->status == 'waiting-for-payment') {
        $order->update(['status' => 'partial-paid', 'payment_method' => 'bkash']);
        OrderItem::where('order_id', $order->id)->update(['status' => 'partial-paid']);
        // $this->orderPaymentConfirmationNotification($order);
        return redirect("/payment/{$order_id}?status=success&paymentID={$this->paymentID}&timestamp={$this->timestamp}&msg={$this->statusMessage}");
      }
      return redirect("/payment/{$order_id}?status=success&paymentID={$this->paymentID}&timestamp={$this->timestamp}&msg={$this->statusMessage}");
    }
    return redirect("/payment/{$this->paymentID}?status=failure&paymentID={$this->paymentID}&timestamp={$this->timestamp}&msg={$this->statusMessage}");
  }

  public function bkash_order_cancel()
  {
    $order = $this->order;
    if ($order) {
      $order_id = $order->id;
      return redirect("/payment/{$order_id}?status=cancel&paymentID={$this->paymentID}&timestamp={$this->timestamp}&msg={$this->statusMessage}");
    }
    return redirect("/payment/{$this->paymentID}?status=failure&paymentID={$this->paymentID}&timestamp={$this->timestamp}&msg={$this->statusMessage}");
  }

  public function bkash_order_failure()
  {
    $order = $this->order;
    if ($order) {
      $order_id = $order->id;
      return redirect("/payment/{$order_id}?status=failure&paymentID={$this->paymentID}&timestamp={$this->timestamp}&msg={$this->statusMessage}");
    }
    return redirect("/payment/{$this->paymentID}?status=failure&paymentID={$this->paymentID}&timestamp={$this->timestamp}&msg={$this->statusMessage}");
  }

  public function bkashToken()
  {
    $id_token = $this->initializeBkashToken();

    //        session()->forget('bkash_token');
    //        $id_token = $this->initializeBkashToken(true);
    //        Setting::save_settings([
    //            'bkash_grant_token' => json_encode($id_token)
    //        ]);

    return response(['status' => $id_token ? 'Token generated' : 'Token not generated']);
  }

  public function createCheckoutPayment()
  {
    $ref_no = \request('ref_no'); // must be unique
    $intent = \request('intent');
    $amount = $this->processAmount($ref_no);

    $body = [
      'amount' => $amount,
      'currency' => "BDT",
      'intent' => $intent,
      'merchantInvoiceNumber' => $ref_no,
    ];

    $data = $this->CreatePayment($body);

    Setting::save_settings([
      'bkash_create_api' => json_encode($data),
    ]);

    return response($data);
  }

  public function executeCheckoutPayment()
  {
    $paymentID = request('paymentID');
    $response = $this->ExecutePayment($paymentID);
    $status = getArrayKeyData($response, 'status');
    if (!$status) {
      $response = $this->QueryPayment($paymentID);
      //            Setting::save_settings([
      //                'bkash_query_payment' => json_encode($response),
      //            ]);
    }
    //        Setting::save_settings([
    //            'bkash_execute_api' => json_encode($response),
    //        ]);
    return response($response);
  }
}
