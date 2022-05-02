@extends('backend.layouts.app')

@section('title', app_name() . ' | ' . __('strings.backend.dashboard.title'))

@section('content')
<div class="row">
  <div class="col">
    <div class="card">
      <div class="card-header clearfix">
        <div class="float-left">
          <strong>Daoshboard Summary</strong>
        </div>
        <div class="float-right">
          <select name="durations" id="durations" class="form-control">
            <option value="1">Last Day</option>
            <option value="7">Last 7 Days</option>
            <option value="15">Last 15 Days</option>
            <option value="30">Last 1 Month</option>
            <option value="180">Last 6 Month</option>
            <option value="360">Last 1 Year</option>
          </select>
        </div>
      </div> <!-- card-header-->
      <div class="card-body">

        <div class="row">
          <div class="col-lg-3 col-6">
            <div class="small-box mb-3 bg-success">
              <div class="inner py-3">
                <h3>{{$product_value}}</h3>
                <h5>Sales</h5>
              </div>
              <div class="icon">
                <i class="fa fa-bar-chart"></i>
              </div>
            </div>
          </div> <!-- ./col -->
          <div class="col-lg-3 col-6">
            <div class="small-box mb-3 bg-warning">
              <div class="inner py-3">
                <h3>{{$first_payment}}</h3>
                <h5>Payment Received</h5>
              </div>
              <div class="icon">
                <i class="fa fa-credit-card"></i>
              </div>
            </div>
          </div> <!-- ./col -->
          <div class="col-lg-3 col-6">
            <div class="small-box mb-3 bg-info">
              <div class="inner py-3">
                <h3>{{$weight}}/650</h3>
                <h5>Shipping Charges</h5>
              </div>
              <div class="icon">
                <i class="fa fa-truck"></i>
              </div>
            </div>
          </div> <!-- ./col -->
          <div class="col-lg-3 col-6">
            <div class="small-box mb-3 bg-danger">
              <div class="inner py-3">
                <h3>{{$customer_due}}</h3>
                <h5>Customer Due</h5>
              </div>
              <div class="icon">
                <i class="fa fa-users"></i>
              </div>
            </div>
          </div> <!-- ./col -->
        </div>

        <div class="row">
          <div class="col-lg-3 col-6">
            <div class="small-box mb-3 bg-gradient-olive">
              <div class="inner py-3">
                <h3>150</h3>
                <h5>Invoice Generated</h5>
              </div>
              <div class="icon">
                <i class="fa fa-newspaper-o"></i>
              </div>
            </div>
          </div> <!-- ./col -->
          <div class="col-lg-3 col-6">
            <div class="small-box mb-3 bg-gradient-maroon">
              <div class="inner py-3">
                <h3>150</h3>
                <h5>Refund</h5>
              </div>
              <div class="icon">
                <i class="fa fa-undo"></i>
              </div>
            </div>
          </div> <!-- ./col -->
          <div class="col-lg-3 col-6">
            <div class="small-box mb-3 bg-orange">
              <div class="inner py-3">
                <h3>12/2100</h3>
                <h5>Courier Charges</h5>
              </div>
              <div class="icon">
                <i class="fa fa-truck"></i>
              </div>
            </div>
          </div> <!-- ./col -->
          <div class="col-lg-3 col-6">
            <div class="small-box mb-3 bg-teal">
              <div class="inner py-3">
                <h3>1500</h3>
                <h5>Stock Value</h5>
              </div>
              <div class="icon">
                <i class="fa fa-home"></i>
              </div>
            </div>
          </div> <!-- ./col -->
        </div>


      </div> <!-- card-body-->
    </div> <!-- card-->
  </div> <!-- col-->
</div> <!-- row-->
@endsection