@php
$currency = currency_icon();
@endphp
@extends('backend.layouts.app')

@section('title', ' Package Management | Edit page')

@section('content')
<main class="container-fluid">
  <div class="row">
    <div class="col-sm-12">

      <div class="card my-3">
        <div class="card-header">
          <h4 class="my-2">@lang('Order Details') #{{$order->order_number}}</h4>
        </div> <!-- card-header -->
        <div class="card-body pb-0">
          <div class="row">
            <div class="col-sm-6">
              <table class="table table-bordered table-sm">
                <tr>
                  <th colspan="2" class="text-center">Customer Details</th>
                </tr>
                <tr>
                  <td>Transaction Id#</td>
                  <td>{{$order->transaction_id}}</td>
                </tr>
                <tr>
                  <td>Customer Name</td>
                  <td>{{ $order->name ?? 'N/A' }}</td>
                </tr>
                <tr>
                  <td>Customer Phone</td>
                  <td>{{ $order->phone ?? 'N/A' }}</td>
                </tr>
              </table>
            </div>
            <div class="col-sm-6">
              <table class="table table-bordered table-sm">
                <tr>
                  <th colspan="2" class="text-center">Shipping Details</th>
                </tr>
                @php
                $address = json_decode($order->shipping) ?? null;
                @endphp
                <tr>
                  <td style="width: 50%">Shipping Name</td>
                  <td>{{ $address ? $address->name : 'N/A' }}</td>
                </tr>
                <tr>
                  <td>Phone</td>
                  <td>{{ $address->phone ?? 'N/A' }}</td>
                </tr>
                <tr>
                  <td>District</td>
                  <td>{{ $address->city ?? 'N/A' }}</td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>{{ $address->address ?? 'N/A' }}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div class="card-body pt-0">
          <div class="table-responsive">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th class="text-center">SL</th>
                  <th class="text-center" style="width: 130px;">#</th>
                  <th class="text-center">Details</th>
                  <th class="text-center" style="width:80px">Quantity</th>
                  <th class="text-center" style="width:100px">Total</th>
                </tr>
              </thead>
              <tbody>
                @php
                $invoiceTotal = 0;
                $firstPayment = 0;
                $duePayment = 0;
                @endphp
                @foreach ($order->orderItems as $item)
                <tr>
                  <td class="text-center  align-middle" rowspan="{{$item->itemVariations->count() + 3}}">
                    {{$loop->iteration}}
                  </td>
                  <td class="text-left" colspan="4">
                    @php
                    $Title =$item->Title;
                    $ItemId =$item->ItemId;
                    $ProviderType =$item->ProviderType;
                    $shipping_rate =$item->shipping_rate;
                    $itemLink = ($ProviderType == 'aliexpress') ? "https://www.aliexpress.com/item/{$ItemId}.html" :
                    "https://item.taobao.com/item.htm?id={$ItemId}";
                    $interNalLink = ($ProviderType == 'aliexpress') ? "https://www.chinaexpress.com.bd/aliexpress/product/{$ItemId}" :
                    "https://www.chinaexpress.com.bd/product/{$ItemId}";
                    @endphp
                    <a href="{{$interNalLink}}" target="_blank">{{strip_tags($Title)}}</a> <br>
                    <p class="m-0">Product Id: {{$ItemId}}</p>
                    <p class="m-0"><span>Source: {{$ProviderType}}</span> </p>
                    <p class="m-0">Express Shipping Rate: <span class="text-danger">
                        {{$shipping_rate ? $shipping_rate : 0}} Per KG</span>
                    </p>
                    <a href="{{$itemLink}}" target="_blank"> Source Link</a>
                  </td>
                </tr>
                @php
                $itemTotalPrice = 0;
                @endphp
                @foreach($item->itemVariations as $variationKey => $variation)
                @php
                $attributes = json_decode($variation->attributes, true);
                $DeliveryCost = $item->DeliveryCost;
                $product_value = $item->product_value;
                $product_total = ($product_value + $DeliveryCost);
                $invoiceTotal += $product_total;
                $firstPayment += $item->first_payment;
                $duePayment += $item->due_payment;
                @endphp
                <tr>
                  <td class="align-middle text-center p-1">
                    @php
                    $img = check_attribute_image($attributes, $item->MainPictureUrl);
                    @endphp
                    <img src="{{asset($img)}}" class="img-fluid">
                  </td>
                  <td>
                    @forelse ($attributes as $attribute)
                    @php
                    $PropertyName = $attribute['PropertyName'] ?? 'Unknown';
                    $Value = $attribute['Value'] ?? 'Unknown';
                    @endphp
                    <p class="m-0">{!! $PropertyName !!}: {!! $Value !!}</p>
                    @empty
                    <p class="m-0">No Attributes</p>
                    @endforelse
                    <p class="m-0">Unit Price: {{$variation->price}}</p>
                  </td>
                  <td class="text-center align-middle"> {{$variation->qty}}</td>
                  <td class="text-right align-middle">{{$variation->subTotal}}</td>
                </tr>
                @endforeach
                <tr>
                  <td class="text-right align-middle" colspan="3">China Local Shipping</td>
                  <td class="text-right align-middle">{{$DeliveryCost}}</td>
                </tr>
                <tr>
                  <td class="text-right" colspan="3">Product Total</td>
                  <td class="text-right">{{$product_total}}</td>
                </tr>
                @endforeach
                <tr>
                  <td class="text-right" colspan="4">Orter Total</td>
                  <td class="text-right">{{$invoiceTotal}}</td>
                </tr>
                @if ($order->coupon_victory)
                <tr>
                  <td class="text-right" colspan="4">Coupon</td>
                  <td class="text-right">{{$order->coupon_victory}}</td>
                </tr>
                @endif
                <tr>
                  @php
                  $percent = ($firstPayment / $invoiceTotal) * 100;
                  @endphp
                  <td class="text-right" colspan="4">Initial Payment ({{round($percent)}}%)</td>
                  <td class="text-right">{{$firstPayment}}</td>
                </tr>
                <tr>
                  <td class="text-right text-danger" colspan="4">Due After Calculate</td>
                  <td class="text-right text-danger">{{$duePayment}}</td>
                </tr>
              </tbody>
            </table>


          </div>
        </div> <!-- card-body -->
      </div> <!-- card -->

    </div>
  </div>
</main>

@endsection