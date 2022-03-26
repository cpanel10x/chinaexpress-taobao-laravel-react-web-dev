<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Bkash Checkout</title>
    <meta name="viewport" content="width=device-width" ,="" initial-scale="1.0/">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrom=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>


    @if(config('bkash.sandbox_mode') === 'sandbox')
        <script src="https://scripts.sandbox.bka.sh/versions/1.2.0-beta/checkout/bKash-checkout-sandbox.js"></script>
    @else
        <script src="https://scripts.pay.bka.sh/versions/1.2.0-beta/checkout/bKash-checkout.js"></script>
    @endif
</head>

<body>

<span style="display:none" id="paymentInfo">@json($data)</span>

<button type="button" id="bKash_button" style="display: none">Pay With bKash</button>


<script src="{{asset('assets/js/bkash.js')}}"></script>

</body>

</html>