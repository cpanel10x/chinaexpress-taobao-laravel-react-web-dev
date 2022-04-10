@extends('backend.layouts.app')

@section('title', 'Order Limitation')


@section('content')

<div class="row justify-content-center">

  <div class="col-md-6">
    {{ html()->form('POST', route('admin.setting.limitationStore'))->class('form-horizontal')->open() }}
    <div class="card mb-3">
      <div class="card-header with-border">
        <h3 class="card-title">Order Limitation <small class="ml-2">(update information anytime)</small></h3>
      </div>
      <div class="card-body">
        <div class="form-group row mb-4">
          {{html()->label('Minimum Order Quantity')->class('col-md-7 col-form-label
          text-right')->for('min_order_quantity')}}
          <div class="col-md-5">
            {{html()->number('min_order_quantity', get_setting('min_order_quantity'))
            ->class('form-control')
            ->attribute('min', 1)
            ->autofocus(true)
            ->placeholder('Minimum Order Quantity')}}
          </div> <!-- col-->
        </div> <!-- form-group-->

        <div class="form-group row mb-4">
          {{html()->label('Minimum Order Amount (BDT.)')->class('col-md-7 col-form-label
          text-right')->for('min_order_amount')}}
          <div class="col-md-5">
            {{html()->number('min_order_amount', get_setting('min_order_amount'))
            ->class('form-control')
            ->attribute('min', 100)
            ->placeholder('Minimum Order Amount')}}
          </div> <!-- col-->
        </div> <!-- form-group-->

        <div class="form-group row mb-4">
          {{html()->label('China Local Delivery Charge (BDT.)')->class('col-md-7 col-form-label
          text-right')->for('china_local_delivery_charge')}}
          <div class="col-md-5">
            {{html()->number('china_local_delivery_charge', get_setting('china_local_delivery_charge'))
            ->class('form-control')
            ->attribute('min', 0)
            ->placeholder('Charge')}}
          </div> <!-- col-->
        </div> <!-- form-group-->

        <div class="form-group row mb-4">
          {{html()->label('China Local Delivery Charge Limit (BDT.)')->class('col-md-7 col-form-label
          text-right')->for('china_local_delivery_charge_limit')}}
          <div class="col-md-5">
            {{html()->number('china_local_delivery_charge_limit', get_setting('china_local_delivery_charge_limit'))
            ->class('form-control')
            ->attribute('min', 0)
            ->placeholder('Charge Limit')}}
          </div> <!-- col-->
        </div> <!-- form-group-->


        <div class="form-group row mb-4">
          {{html()->label('Payment Advanched Rate (%)')->class('col-md-7 col-form-label
          text-right')->for('payment_advanched_rate')}}
          <div class="col-md-5">
            {{html()->number('payment_advanched_rate', get_setting('payment_advanched_rate'))
            ->class('form-control')
            ->attributes(['min' => 0, 'max' => 100])
            ->placeholder('Payment advanched rate %')}}
          </div> <!-- col-->
        </div> <!-- form-group-->


        <div class="form-group row mb-4">
          <div class="col-md-5 offset-md-7">
            {{html()->button('Update')->class('btn btn-success')}}
          </div> <!-- col-->
        </div> <!-- form-group-->
      </div> <!--  .card-body -->
    </div> <!--  .card -->
    {{ html()->form()->close() }}
  </div> <!-- .col-md-6 -->

  <div class="col-md-6">
    {{ html()->form('POST', route('admin.setting.airShippingStore'))->class('form-horizontal')->open() }}
    <div class="card mb-3">
      <div class="card-header with-border">
        <h3 class="card-title">Shipping Limitation <small class="ml-2">(Air Shipping Rate)</small></h3>
      </div>
      <div class="card-body">

        <table class="table-bordered table-sm table-striped text-center">
          <tr>
            <th style="width: 25%">Minimum</th>
            <th style="width: 25%">Maximum</th>
            <th style="width: 25%">Rate</th>
            <th style="width: 25%">Option</th>
          </tr>
          <tbody id="shippLimitBody">
            @php
            $shipping_charges = json_decode(get_setting('air_shipping_charges')) ?? collect([]);
            @endphp
            @forelse($shipping_charges as $key => $charges)
            <tr>
              <td>
                {{html()->number('shipping['.$key.'][minimum]', $charges->minimum)->class('form-control
                form-control-sm')->attribute('min',0)->placeholder('Minimum')}}
              </td>
              <td>
                {{html()->number('shipping['.$key.'][maximum]',$charges->maximum)->class('form-control
                form-control-sm')->attribute('min',0)->placeholder('Maximum')}}
              </td>
              <td>
                {{html()->number('shipping['.$key.'][rate]', $charges->rate)->class('form-control
                form-control-sm')->attribute('min',0)->placeholder('Rate')}}
              </td>
              <td>
                <button type="button" class="btn btn-sm btn-danger removeField">Remove</button>
              </td>
            </tr>
            @empty
            <tr>
              <td>
                {{html()->number('shipping[0][minimum]')->class('form-control
                form-control-sm')->attribute('min',0)->placeholder('Minimum')}}
              </td>
              <td>
                {{html()->number('shipping[0][maximum]')->class('form-control
                form-control-sm')->attribute('min',0)->placeholder('Maximum')}}
              </td>
              <td>
                {{html()->number('shipping[0][rate]')->class('form-control
                form-control-sm')->attribute('min',0)->placeholder('Rate')}}
              </td>
              <td>
                <button type="button" class="btn btn-sm btn-danger removeField">Remove</button>
              </td>
            </tr>
            @endforelse
          </tbody>
          <tfoot>
            <td colspan="3"></td>
            <td>
              <button type="button" class="btn btn-sm btn-primary addField">Add New</button>
            </td>
          </tfoot>
        </table>
      </div> <!--  .card-body -->
      <div class="card-footer">
        <div class="form-group">
          {{html()->button('Update')->class('btn btn-success')}}
        </div> <!-- form-group-->
      </div> <!--  .card-footer -->
    </div> <!--  .card -->
    {{ html()->form()->close() }}
  </div> <!-- .col-md-6 -->

</div> <!-- .row -->

@endsection