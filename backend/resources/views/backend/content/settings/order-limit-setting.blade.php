@extends('backend.layouts.app')

@section('title', ' Order Limitation Settings ')



@section('content')


<div class="row">
  <div class="col-md-4">
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
  </div> <!-- .col-md-4 -->
  <div class="col-md-4">
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
  </div> <!-- .col-md-4 -->

  <div class="col-md-4">
    {{ html()->form('POST', route('admin.setting.popup-message'))->attribute('enctype', 'multipart/form-data')->open()
    }}
    <div class="card mb-3">
      <div class="card-header with-border">
        <h3 class="card-title">Taobao Popup Message <small class="ml-2">(Add to cart Popup)</small></h3>
      </div>
      <div class="card-body">
        @php
        $cart_msg = get_setting('cart_popup_message', []);
        $cart_msg = $cart_msg ? json_decode($cart_msg, true) : [];
        $popup_message = getArrayKeyData($cart_msg, 'popup_message');
        $popup_option = getArrayKeyData($cart_msg, 'popup_option');
        $option = old('popup_option', $popup_option);
        @endphp
        <div class="form-group">
          {{html()->label('Popup Message')->for('popup_message')}}
          {{ html()->textarea('popup_message', $popup_message)
          ->placeholder('Popup Message')
          ->class('form-control')
          ->rows(4) }}
        </div> <!-- form-group -->

        <div class="form-group">
          {{html()->label('Popup Image')->for('popup_image')}}
          {{html()->file('popup_image')->class('form-control-file')}}
        </div> <!-- form-group -->

        <div class="form-group ">
          <div class="form-check form-check-inline">
            {{html()->radio('popup_option', $option == 'both', 'both')
            ->id('both')
            ->checked(true)
            ->class('form-check-input')}}
            {{ html()->label("Both")->class('form-check-label')->for('both') }}
          </div>
          <div class="form-check form-check-inline">
            {{html()->radio('popup_option', $option == 'only_text', 'only_text')
            ->id('only_text')
            ->class('form-check-input')}}
            {{ html()->label("Only Text")->class('form-check-label')->for('only_text') }}
          </div>
          <div class="form-check form-check-inline">
            {{html()->radio('popup_option', $option == 'only_image', 'only_image')
            ->id('only_image')
            ->class('form-check-input')}}
            {{ html()->label("Only Image")->class('form-check-label')->for('only_image') }}
          </div>
        </div> <!-- form-group-->

      </div> <!--  .card-body -->
      <div class="card-footer">
        <div class="form-group">
          {{html()->button('Update')->class('btn btn-success')}}
        </div> <!-- form-group-->
      </div> <!--  .card-footer -->
    </div> <!--  .card -->
    {{ html()->form()->close() }}
  </div> <!-- .col-md-4 -->

  
  <div class="col-md-4">
    {{ html()->form('POST', route('admin.setting.popup-message-aliexpress'))->attribute('enctype', 'multipart/form-data')->open()
    }}
    <div class="card mb-3">
      <div class="card-header with-border">
        <h3 class="card-title">AliExpress Popup Message <small class="ml-2">(Add to cart Popup)</small></h3>
      </div>
      <div class="card-body">
        @php
        $cart_msg = get_setting('cart_aliexpress_popup_message', []);
        $cart_msg = $cart_msg ? json_decode($cart_msg, true) : [];
        $popup_message = getArrayKeyData($cart_msg, 'popup_message');
        $popup_option = getArrayKeyData($cart_msg, 'popup_option');
        $option = old('popup_option', $popup_option);
        @endphp
        <div class="form-group">
          {{html()->label('Popup Message')->for('popup_message')}}
          {{ html()->textarea('popup_message', $popup_message)
          ->placeholder('Popup Message')
          ->class('form-control')
          ->rows(4) }}
        </div> <!-- form-group -->

        <div class="form-group">
          {{html()->label('Popup Image')->for('popup_image')}}
          {{html()->file('popup_image')->class('form-control-file')}}
        </div> <!-- form-group -->

        <div class="form-group ">
          <div class="form-check form-check-inline">
            {{html()->radio('popup_option', $option == 'both', 'both')
            ->id('both')
            ->checked(true)
            ->class('form-check-input')}}
            {{ html()->label("Both")->class('form-check-label')->for('both') }}
          </div>
          <div class="form-check form-check-inline">
            {{html()->radio('popup_option', $option == 'only_text', 'only_text')
            ->id('only_text')
            ->class('form-check-input')}}
            {{ html()->label("Only Text")->class('form-check-label')->for('only_text') }}
          </div>
          <div class="form-check form-check-inline">
            {{html()->radio('popup_option', $option == 'only_image', 'only_image')
            ->id('only_image')
            ->class('form-check-input')}}
            {{ html()->label("Only Image")->class('form-check-label')->for('only_image') }}
          </div>
        </div> <!-- form-group-->

      </div> <!--  .card-body -->
      <div class="card-footer">
        <div class="form-group">
          {{html()->button('Update')->class('btn btn-success')}}
        </div> <!-- form-group-->
      </div> <!--  .card-footer -->
    </div> <!--  .card -->
    {{ html()->form()->close() }}
  </div> <!-- .col-md-4 -->

  
  <div class="col-md-4">
    {{ html()->form('POST', route('admin.setting.aliexpress-express-button'))->attribute('enctype', 'multipart/form-data')->open()
    }}
    <div class="card mb-3">
      <div class="card-header with-border">
        <h3 class="card-title">AliExpress Express Button Popup Message <small class="ml-2">(Add to cart Popup)</small></h3>
      </div>
      <div class="card-body">
        @php
        $cart_msg = get_setting('aliexpress_express_popup_message', []);
        $cart_msg = $cart_msg ? json_decode($cart_msg, true) : [];
        $popup_message = getArrayKeyData($cart_msg, 'popup_message');
        $popup_option = getArrayKeyData($cart_msg, 'popup_option');
        $option = old('popup_option', $popup_option);
        @endphp
        <div class="form-group">
          {{html()->label('Popup Message')->for('popup_message')}}
          {{ html()->textarea('popup_message', $popup_message)
          ->placeholder('Popup Message')
          ->class('form-control')
          ->rows(4) }}
        </div> <!-- form-group -->

        <div class="form-group">
          {{html()->label('Popup Image')->for('popup_image')}}
          {{html()->file('popup_image')->class('form-control-file')}}
        </div> <!-- form-group -->

        <div class="form-group ">
          <div class="form-check form-check-inline">
            {{html()->radio('popup_option', $option == 'both', 'both')
            ->id('both')
            ->checked(true)
            ->class('form-check-input')}}
            {{ html()->label("Both")->class('form-check-label')->for('both') }}
          </div>
          <div class="form-check form-check-inline">
            {{html()->radio('popup_option', $option == 'only_text', 'only_text')
            ->id('only_text')
            ->class('form-check-input')}}
            {{ html()->label("Only Text")->class('form-check-label')->for('only_text') }}
          </div>
          <div class="form-check form-check-inline">
            {{html()->radio('popup_option', $option == 'only_image', 'only_image')
            ->id('only_image')
            ->class('form-check-input')}}
            {{ html()->label("Only Image")->class('form-check-label')->for('only_image') }}
          </div>
        </div> <!-- form-group-->

      </div> <!--  .card-body -->
      <div class="card-footer">
        <div class="form-group">
          {{html()->button('Update')->class('btn btn-success')}}
        </div> <!-- form-group-->
      </div> <!--  .card-footer -->
    </div> <!--  .card -->
    {{ html()->form()->close() }}
  </div> <!-- .col-md-4 -->

</div> <!-- .row -->

@endsection




@push('after-scripts')
<script>
  $(document).on('click', '.removeField', function () {
        var tbody = $('#shippLimitBody').find('tr');
        // console.log(tbody.length);
        if (tbody.length > 1) {
           $(this).closest('tr').remove();
        } else {
           $(this).addClass('disabled');
        }
     });


     $(document).on('click', '.addField', function () {
        var shippLimitBody = $(document).find('#shippLimitBody');
        var rowLength = shippLimitBody.find('tr').length;

        var tableRow = `<tr><td><input class="form-control form-control-sm" type="number" name="shipping[${rowLength}][minimum]" id="minimum" placeholder="Minimum"></td><td>
                <input class="form-control form-control-sm" type="number" name="shipping[${rowLength}][maximum]" id="maximum" placeholder="Maximum"></td><td><input class="form-control form-control-sm" type="number" name="shipping[${rowLength}][rate]" id="rate" placeholder="Rate"></td><td><button type="button" class="btn btn-sm btn-danger removeField">Remove</button>
              </td></tr>`;

        if (rowLength < 10) {
           shippLimitBody.append(tableRow);
        }

     });

</script>
@endpush