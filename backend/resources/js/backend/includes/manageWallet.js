
function remove_space(stringData) {
  return stringData
    .trim() // remove white spaces at the start and end of string
    // .toLowerCase() // string will be lowercase
    .replace(/^-+/g, "") // remove one or more dash at the start of the string
    .replace(/[^\w-]+/g, "-") // convert any on-alphanumeric character to a dash
    .replace(/-+/g, "-") // convert consecutive dashes to singular one
    .replace(/-+$/g, "");
};


(function ($) {

  let body = $("body");

  function updateColumnValue(itemData) {
    var itemRow = $(document).find('#' + itemData.id);
    if (itemData.order_number) {
      itemRow.find('.order_number').text(itemData.order_number);
    }
    if (itemData.tracking_number) {
      itemRow.find('.tracking_number').text(itemData.tracking_number);
    }
    if (itemData.actual_weight) {
      itemRow.find('.actual_weight').text(itemData.actual_weight);
    }
    if (itemData.quantity) {
      itemRow.find('.quantity').text(itemData.quantity);
    }
    if (itemData.product_value) {
      itemRow.find('.product_value').text(itemData.product_value);
    }
    if (itemData.first_payment) {
      itemRow.find('.first_payment').text(itemData.first_payment);
    }
    if (itemData.shipping_charge) {
      itemRow.find('.shipping_charge').text(itemData.shipping_charge);
    }
    if (itemData.courier_bill) {
      itemRow.find('.courier_bill').text(itemData.courier_bill);
    }
    if (itemData.out_of_stock) {
      itemRow.find('.out_of_stock').text(itemData.out_of_stock);
    }
    if (itemData.missing) {
      itemRow.find('.missing').text(itemData.missing);
    }
    if (itemData.adjustment) {
      itemRow.find('.adjustment').text(itemData.adjustment);
    }
    if (itemData.refunded) {
      itemRow.find('.refunded').text(itemData.refunded);
    }
    if (itemData.last_payment) {
      itemRow.find('.last_payment').text(itemData.last_payment);
    }
    if (itemData.due_payment) {
      itemRow.find('.due_payment').text(itemData.due_payment);
    }
    if (itemData.status) {
      itemRow.find('.status').text(itemData.status);
      itemRow.find('.checkboxItem').attr('data-status', itemData.status);
    }
  }

  function enable_proceed_button() {
    $('#changeGroupStatusButton').removeAttr('disabled');
    $('#generateInvoiceButton').removeAttr('disabled');
  }

  function disabled_proceed_button() {
    $('#changeGroupStatusButton').attr('disabled', 'disabled');
    $('#generateInvoiceButton').attr('disabled', 'disabled');
  }


  function generate_process_related_data() {
    var invoiceFooter = $('#invoiceFooter');
    var courier_bill = invoiceFooter.find('.courier_bill').text();
    var payment_method = invoiceFooter.find('#payment_method').val();
    var delivery_method = invoiceFooter.find('#delivery_method').val();
    var total_payable = invoiceFooter.find('.total_payable').text();
    var total_due = invoiceFooter.find('.total_due').text();
    var customer_id = invoiceFooter.find('.total_payable').attr('data-user');
    var isNotify = $('#notifyUser').is(':checked') ? 1 : 0;
    var related_data = {};
    related_data.courier_bill = courier_bill;
    related_data.payment_method = payment_method;
    related_data.delivery_method = delivery_method;
    related_data.total_due = total_due;
    related_data.total_payable = total_payable;
    related_data.user_id = customer_id;
    related_data.isNotify = isNotify;
    return related_data;
  }


  body.on('change', 'select[name="out_of_stock_type"]', function (event) {
    var item_id = body.find('#item_id').val();
    var value = $(this).val();
    var itemRow = body.find('#' + item_id);
    var out_of_stock = body.find('input[name="out_of_stock"]');
    if (value === 'full') {
      var dueValue = 2 * Number(itemRow.find('.first_payment').text());
      out_of_stock.val(dueValue);
    } else {
      out_of_stock.val('');
    }

  }).on('change', '#status', function (event) {
    event.preventDefault();
    var item_id = body.find('#item_id').val();
    var status = $(this).val();
    var additionStatus = $('#additionInputStatusForm');
    var itemRow = body.find('#' + item_id);
    var inputData = '';

    if (status === 'purchased') {
      var order_number = itemRow.find('.order_number').text();
      inputData = `<input type="text" name="order_number" value="${order_number}" placeholder="Order Number" class="form-control" required="true">`;
    } else if (status === 'shipped-from-suppliers') {
      var tracking_number = itemRow.find('.tracking_number').text();
      inputData = `<input type="text" name="tracking_number" value="${tracking_number}" placeholder="Tracking Number" class="form-control" required="true">`;
    } else if (status === 'received-in-BD-warehouse') {
      var actual_weight = itemRow.find('.actual_weight').text();
      inputData = `<input type="text" name="actual_weight" value="${actual_weight}" placeholder="Actual Weight" class="form-control" required="true">`;
    } else if (status === 'out-of-stock') {
      var out_of_stock = itemRow.find('.out_of_stock').text();
      inputData = `<select name="out_of_stock_type" class="form-control mb-3" required="true">
                          <option value="partial">Partial</option>
                          <option value="full">Full</option>
                      </select>
                      <input type="text" name="out_of_stock" value="${out_of_stock}" placeholder="Amount" class="form-control" required="true">`;
    } else if (status === 'adjustment') {
      var adjustment = itemRow.find('.adjustment').text();
      inputData = `<input type="text" name="adjustment" value="${adjustment}" placeholder="Adjustment Amount" class="form-control" required="true">`;
    } else if (status === 'refunded') {
      var refunded = itemRow.find('.refunded').text();
      inputData = `<input type="text" name="refunded" value="${refunded}" placeholder="Refund Amount" class="form-control" required="true">`;
    }

    additionStatus.html(inputData);

  }).on('submit', '#statusChargeForm', function (event) {
    event.preventDefault();
    var csrf = $('meta[name="csrf-token"]');
    $.ajax({
      type: 'POST',
      url: $(this).attr('action'),
      data: $(this).serialize(),
      headers: {
        'X-CSRF-TOKEN': csrf.attr('content')
      },
      beforeSend: function () {
        // before loading...
      },
      success: function (response) {
        if (response.status) {
          var orderItem = response.orderItem;
          if (response.is_array) {
            orderItem.map((item, key) => {
              updateColumnValue(item);
            });
          } else {
            updateColumnValue(orderItem);
          }
        }
        csrf.attr('content', response.csrf);
      },
      error: function (xhr) { // if error occured
        // console.log('error', xhr);
      },
      complete: function () {
        $('#changeStatusButton').modal('hide');
        body.find('#statusSubmitBtn').removeAttr('disabled');
      }
    });
  }).on('click', '.findResultButton', function (event) {
    event.preventDefault();
    body.find('#filterWalletForm').submit();

  }).on('submit', '#filterWalletForm', function (event) {
    event.preventDefault();
    var customer = $(this).find('#customer').val();
    var status = $(this).find('#findStatus').val();
    window.location.href = '/admin/order/wallet?status=' + status + '&customer=' + customer;

  }).on('change', '#allSelectCheckbox', function () {
    var tbodyCheckbox = $('tbody').find('input.checkboxItem');
    if ($(this).is(':checked')) {
      tbodyCheckbox.prop("checked", true);
      enable_proceed_button();
    } else {
      tbodyCheckbox.prop("checked", false);
      disabled_proceed_button();
    }

  }).on('change', 'input.checkboxItem', function () {
    var checked_item = $('input.checkboxItem:checked').length;
    var uncheck_item = $('input.checkboxItem:not(":checked")').length;

    if (uncheck_item == 0) {
      $('#allSelectCheckbox').prop("checked", true);
    } else {
      $('#allSelectCheckbox').prop("checked", false);
    }
    if (checked_item > 0) {
      enable_proceed_button();
    } else {
      disabled_proceed_button();
    }

  }).on('click', '#changeGroupStatusButton', function () {
    var changeStatusModal = $('#changeStatusButton');
    var hiddenField = changeStatusModal.find('.hiddenField');
    var hiddenInput = '';
    $('input.checkboxItem:checked').each(function (index) {
      hiddenInput += `<input type="hidden" name="item_id[]" value="${$(this).val()}">`;
    });
    hiddenField.html(hiddenInput);
    changeStatusModal.modal('show');
    $('#statusChargeForm').trigger("reset");

  }).on('click', '#generateInvoiceButton', function () {
    var generateInvoiceModal = $('#generateInvoiceModal');
    var hiddenInput = '';
    var is_generate = true;
    var duePayment = '';
    var serial = 1;
    var userTrack = 0;
    var total_due = 0;
    var total_weight = 0;
    var invoices = [];

    $('input.checkboxItem:checked').each(function (index) {
      var item_id = $(this).val();
      var status = $(this).attr('data-status');
      var user_id = $(this).attr('data-user');
      var invoice_item = {};
      if (userTrack === 0) {
        userTrack = user_id;
      }
      if (userTrack !== 0 && userTrack !== user_id) {
        is_generate = false;
      }
      var status_allow = ['received-in-BD-warehouse', 'out-of-stock', 'adjustment', 'refunded'];
      if (!status_allow.includes(status)) {
        is_generate = false;
      }
      if (is_generate) {
        var itemRow = $(document).find('#' + item_id);
        var product_name = itemRow.find('.product_name').text();
        var product_id = itemRow.find('.product_name').attr('data-product-id');
        var order_item_number = itemRow.find('.order_item_number').text();
        var actual_weight = itemRow.find('.actual_weight').text();
        var due_payment = itemRow.find('.due_payment').text();

        total_due += Number(due_payment);
        total_weight += Number(actual_weight);
        duePayment += `<tr>
                                <td class=" align-middle">${serial}</td>
                                <td class=" align-middle">${order_item_number}</td>
                                <td class="text-left align-middle">${product_name}</td>
                                <td class=" align-middle">${status}</td>
                                <td class="text-right align-middle">${Number(actual_weight).toFixed(3)}</td>
                                <td class="text-right align-middle">${Number(due_payment).toFixed(2)}</td>
                              </tr>`;
        invoice_item.id = item_id;
        invoice_item.order_item_number = order_item_number;
        invoice_item.product_id = product_id;
        invoice_item.product_name = product_name;
        invoice_item.actual_weight = actual_weight;
        invoice_item.due_payment = due_payment;
        invoice_item.status = status;
      }
      serial += 1;
      invoices.push(invoice_item);
    });

    if (is_generate) {
      var invoiceFooter = $('#invoiceFooter');
      invoiceFooter.find('.total_weight').text(Number(total_weight).toFixed(3));
      invoiceFooter.find('.total_due').text(Number(total_due).toFixed(2));
      // invoiceFooter.find('.courier_bill').text(Number(0.00).toFixed(2));
      invoiceFooter.find('.total_payable').text(Number(total_due).toFixed(2));
      invoiceFooter.find('.total_payable').attr('data-user', userTrack);
      invoiceFooter.find('.total_payable').attr('data-invoices', encodeURIComponent(JSON.stringify(invoices)));
      $('#invoiceItem').html(duePayment);
      generateInvoiceModal.modal('show');
    } else {
      Swal.fire({
        icon: 'warning',
        text: 'Selected Item Not Ready or Not Same User for Generate Invoice',
      });
    }
    //console.log('invoices', invoices);
    // hiddenField.html(hiddenInput);
    // changeStatusModal.modal('show');
  }).on('click', '.applyCourierBtn', function () {
    var courier_bill = $(this).closest('.input-group').find('.form-control').val();
    var total_due = $('#invoiceFooter').find('.total_due').text();
    var total_payable = Number(courier_bill) + Number(total_due);
    $('#invoiceFooter').find('.courier_bill').text(Number(courier_bill).toFixed(2));
    $('#invoiceFooter').find('.total_payable').text(Number(total_payable).toFixed(2));

    $('.courier_bill_text').show();
    $('.courierSubmitForm').hide();

  }).on('click', '.removeCourierBtn', function () {
    $(this).closest('div').find('.form-control').val('');
    var total_due = $('#invoiceFooter').find('.total_due').text();
    $('#invoiceFooter').find('.courier_bill').text(0.00);
    $('#invoiceFooter').find('.total_payable').text(Number(total_due).toFixed(2));
    $('.courier_bill_text').hide();
    $('.courierSubmitForm').show();

  }).on('click', '#generateSubmitBtn', function () {
    var invoices = $('#invoiceFooter').find('.total_payable').attr('data-invoices');
    if (invoices) {
      invoices = decodeURIComponent(invoices);
    }
    var related = generate_process_related_data();
    var csrf = $('meta[name="csrf-token"]');
    $.ajax({
      type: 'POST',
      url: $(this).attr('data-action'),
      data: {
        invoices: invoices,
        related: JSON.stringify(related)
      },
      headers: {
        'X-CSRF-TOKEN': csrf.attr('content')
      },
      beforeSend: function () {
        // before loading...
      },
      success: function (response) {
        if (response.status) {
          window.location.href = '/admin/invoice';
        } else {
          Swal.fire({
            icon: 'warning',
            text: 'Invoice Generate Fail',
          });
        }
      },
      error: function (xhr) { // if error occurred
        Swal.fire({
          icon: 'warning',
          text: 'Invoice Generate Error',
        });
      },
      complete: function () {
        $('#generateInvoiceModal').modal('hide');
      }
    });

  });


  //  wallet customizing develop

  function modalLoader() {
    return `<div style="display:grid;min-height:200px" class="align-items-center justify-content-center"><div class="spinner-border text-secondary" role="status">
    <span class="sr-only">Loading...</span>
  </div></div>`;
  }


  function walletShippingInfo(wallet) {
    var shipping = wallet?.order?.shipping ? JSON.parse(wallet?.order?.shipping) : {};
    return `<tr><td colspan="5" class="text-center"><h5 class="m-0">Shipping Info</h5></td></tr>
            <tr>
              <td colspan="5" class="text-center align-middle">
                <p class="m-0">
                  Name: <b>${shipping?.name}</b> <br>
                  Phone: <b>${shipping?.phone}</b> <br>
                  Location: <b>${shipping?.city}</b> <br>
                  Address: <b>${shipping?.address}</b>
                </p>
              </td>
            </tr>`;
  }

  function walletCustomerInfo(wallet) {
    var customer = wallet?.user || {};
    var name = customer?.name || `${customer?.first_name} ${customer?.last_name}` || 'Unknown';
    return `<tr><td colspan="5" class="text-center"><h5 class="m-0">Customer Info</h5></td></tr>
            <tr>
              <td colspan="5" class="text-center align-middle">
                <p class="m-0">
                  Name: <b>${name}</b> <br>
                  Phone: <b>${customer?.phone}</b> <br>
                  Email: <b>${customer?.email}</b>
                </p>
              </td>
            </tr>`;
  }

  function walletOtherInfo(wallet) {
    return `
    <tr>
      <td colspan="5" class="text-center">
        <h5 class="m-0">Other Information</h5>
      </td>
    </tr>
    <tr>
      <td colspan="4" class="text-right">Transaction ID</td>
      <td class="text-right">${wallet.order.transaction_id}</td>
    </tr>
    <tr>
      <td colspan="4" class="text-right">Payment Method</td>
      <td class="text-right">${wallet.order.payment_method}</td>
    </tr>
    <tr>
      <td colspan="4" class="text-right">Order Number</td>
      <td class="text-right">${wallet.order.order_number}</td>
    </tr>
    <tr>
      <td colspan="4" class="text-right">Wallet Number</td>
      <td class="text-right">${wallet.item_number}</td>
    </tr>
    <tr>
      <td colspan="4" class="text-right">Product ID</td>
      <td class="text-right">${wallet.ItemId}</td>
    </tr>
    <tr>
      <td colspan="4" class="text-right">Source Site</td>
      <td class="text-right">${wallet.ProviderType}</td>
    </tr>
    <tr>
      <td colspan="4" class="text-right">Shipping Method</td>
      <td class="text-right">${wallet.shipping_type ? wallet.shipping_type : 'express'}</td>
    </tr>
    <tr>
      <td colspan="4" class="text-right">Shipping Rate</td>
      <td class="text-right">${wallet.shipping_rate || 'not set'}</td>
    </tr>
    <tr>
      <td colspan="4" class="text-right">Source Order Number</td>
      <td class="text-right">${wallet.source_order_number || 'not set'}</td>
    </tr>
    <tr>
      <td colspan="4" class="text-right">TrackingNo</td>
      <td class="text-right">${wallet.tracking_number || 'not set'}</td>
    </tr>
    <tr>
      <td colspan="4" class="text-right">Ref.Invoice</td>
      <td class="text-right">${wallet.invoice_no || 'not set'}</td>
    </tr>
    <tr>
      <td colspan="4" class="text-right">Status</td>
      <td class="text-right">${wallet.status}</td>
    </tr>
    <tr>
      <td colspan="4" class="text-right">Day Count</td>
      <td class="text-right">${12}</td>
    </tr>
    <tr>
      <td colspan="5" class="text-center align-middle">
        <p class="m-0">Comments-1: ${wallet.comment1 || 'not set'}</p>
      </td>
    </tr>
    <tr>
      <td colspan="5" class="text-center align-middle">
        <p class="m-0">Comments-2: ${wallet.comment2 || 'not set'}</p>
      </td>
    </tr>`;
  }


  function walletSummaryInfo(wallet) {
    var product_value = wallet.product_value || 0;
    var DeliveryCost = wallet.DeliveryCost || 0;
    var coupon_contribution = wallet.coupon_contribution || 0;
    var netValue = (Number(product_value) + Number(DeliveryCost)) - Number(coupon_contribution);

    var $shipping_rate = wallet.shipping_rate ? Number(wallet.shipping_rate) : 0;
    var $weight = wallet.weight ? Number(wallet.weight) : 0;
    var $Quantity = wallet.Quantity ? Number(wallet.Quantity) : 0;
    var $totalWeight = Number($weight * $Quantity);
    var $weightCharges = Math.round($shipping_rate * $totalWeight);

    return `
      <tr>
        <td colspan="4" class="text-right">Products Value</td>
        <td class="text-right">${product_value}</td>
      </tr>
      <tr>
        <td colspan="4" class="text-right">China Local Shipping</td>
        <td class="text-right">${DeliveryCost || 0}</td>
      </tr>
      <tr>
        <td colspan="4" class="text-right">(-) Coupon Value</td>
        <td class="text-right">${coupon_contribution || 0}</td>
      </tr>
      <tr>
        <td colspan="4" class="text-right">Net Product Value</td>
        <td class="text-right">${netValue || 0}</td>
      </tr>
      <tr>
        <td colspan="4" class="text-right">1st Payment</td>
        <td class="text-right">${wallet.first_payment || 0}</td>
      </tr>
      <tr>
        <td colspan="4" class="text-right">Out of Stock</td>
        <td class="text-right">${wallet.out_of_stock || 0}</td>
      </tr>
      <tr>
        <td colspan="4" class="text-right">Missing/Shortage</td>
        <td class="text-right">${wallet.missing || 0}</td>
      </tr>
      <tr>
        <td colspan="4" class="text-right">Lost in Transit</td>
        <td class="text-right">${wallet.lost_in_transit || 0}</td>
      </tr>
      <tr>
        <td colspan="4" class="text-right">Refunded</td>
        <td class="text-right">${wallet.refunded || 0}</td>
      </tr>
      <tr>
        <td colspan="4" class="text-right">Adjustment</td>
        <td class="text-right">${wallet.adjustment || 0}</td>
      </tr>
      <tr>
        <td colspan="4" class="text-right">AliExpress Tax</td>
        <td class="text-right">${wallet.customer_tax || 0}</td>
      </tr>
      <tr>
        <td colspan="4" class="text-right">Weight Charges</td>
        <td class="text-right">${$weightCharges || 0}</td>
      </tr>
      <tr>
        <td colspan="4" class="text-right">Courier Bill</td>
        <td class="text-right">${wallet.courier_bill || 0}</td>
      </tr>
      <tr>
        <td colspan="4" class="text-right">Last Payment</td>
        <td class="text-right">${wallet.last_payment || 0}</td>
      </tr>
      <tr>
        <td colspan="4" class="text-right">Closing Balance</td>
        <td class="text-right">${wallet.due_payment || 0}</td>
      </tr>`;
  }

  function attributesInfo(attributes) {
    var html = '<p class="m-0">';
    attributes?.map((attribute, key) => {
      html += `${attribute?.PropertyName} : ${attribute?.Value}  <br>`;
    })
    return html + '</p>';
  }

  function walletVariationsInfo(wallet) {
    var html = `<tr>
              <th class="text-center">SL</th>
              <th>Variations</th>
              <th class="text-center">Quantity</th>
              <th class="text-center">Price</th>
              <th class="text-right">Total</th>
            </tr>`;
    if (wallet?.item_variations?.length > 0) {
      wallet?.item_variations?.map((variation, key) => {
        var attributes = variation?.attributes ? JSON.parse(variation.attributes) : [];
        var attrData = attributesInfo(attributes);
        html += `<tr>
              <td class="text-center text-nowrap align-middle">${key + 1}</td>
              <td class="text-nowrap align-middle">${attrData}</td>
              <td class="text-center text-nowrap align-middle">${variation?.qty}</td>
              <td class="text-center text-nowrap align-middle">${variation?.price}</td>
              <td class="text-right text-nowrap align-middle">${variation?.subTotal}</td>
              </tr>`;
      });
    }

    return html;
  }

  function walletInfoDetails(resData) {
    var wallet = resData.data
    var html = `<div class="card"><div class="card-body">`;
    html += `<h5>${wallet.Title}</h5>`;
    html += `<table class="table table-bordered">`;
    html += walletVariationsInfo(wallet);
    html += walletSummaryInfo(wallet);
    html += walletOtherInfo(wallet);
    html += walletCustomerInfo(wallet);
    html += walletShippingInfo(wallet);
    html += `</table></div></div>`;
    return html;
  }

  function generateWalletDetails(wallet_id) {
    var loader = modalLoader();
    var detailsModal = $("#detailsModal");
    detailsModal.modal('show');
    detailsModal.find('.modal-body').html(loader)
    axios.get(`/admin/order/wallet/${wallet_id}`)
      .then(res => {
        const resData = res.data;
        var htmlData = walletInfoDetails(resData);
        detailsModal.find('.modal-title').text(resData?.title)
        detailsModal.find('.modal-body').html(htmlData)
      })
      .catch(error => {
        console.log(error);
      })
  }

  $(document).on('click', '.walletDetails', function (event) {
    event.preventDefault();
    var wallet_id = $(this).attr('href');
    generateWalletDetails(wallet_id);
  });

  $(document).on('click', '.main-wallet-table tbody>tr', function (event) {
    let doubleClick = 2;
    let trippleClick = 3;
    if (event.detail === doubleClick) {
      event.preventDefault();
      var wallet_id = $(this).attr('id');
      generateWalletDetails(wallet_id);
    }
  });


  function formDataObject(formData) {
    var config = {};
    formData.map(function (item) {
      if (config[item.name]) {
        if (typeof (config[item.name]) === "string") {
          config[item.name] = [config[item.name]];
        }
        config[item.name].push(item.value);
      } else {
        config[item.name] = item.value;
      }
    });
    return config;
  }

  $(document).on('submit', '.masterEditForm', function (event) {
    event.preventDefault();
    var action = $(this).attr('action');
    var formData = $(this).serializeArray();
    formData = formDataObject(formData);
    console.log('formData', formData);
    axios.post(action, { ...formData, _method: 'PUT' })
      .then(res => {
        console.log('res', res);
      })
      .catch(error => {
        console.log('error', error)
      })
      .then(() => {
        $("#detailsModal").modal('hide');
      })
  });


  function walletMasterEditForm(resData) {
    var wallet = resData.data
    var htmlForm = `<form action="${`/admin/order/wallet/${wallet.id}`}" method="post" class="masterEditForm"><input type="hidden" name="_method" value="put"/><table class="table"><tr><th>Parameter</th><th>CurrentData</th><th style="width:200px">UpdateInfo<th/></tr>`;
    const editable = ['regular_price', 'weight', 'DeliveryCost', 'Quantity', 'shipping_type', 'shipping_rate', 'tracking_number', 'product_value', 'first_payment', 'coupon_contribution', 'bd_shipping_charge', 'courier_bill', 'out_of_stock', 'lost_in_transit', 'customer_tax', 'missing', 'adjustment', 'refunded', 'last_payment', 'due_payment', 'invoice_no', 'comment1', 'comment2'];
    for (const item in wallet) {
      if (editable.includes(item)) {
        var itemValue = wallet[item] || '';
        htmlForm += `<tr>
                      <td>${item}</td>
                      <td>${itemValue}</td>
                      <td><input type="text" name="${item}" placeholder="${item}" class="form-control text-right" value="${itemValue}" /></td>
                    </tr>`;
      }
    }
    return htmlForm + `<tr><td colspan="3"><button type="submit" class="btn btn-block btn-primary">Update</button></td></tr></form>`;
  }

  function generateWalletMasterEdit(wallet_id) {
    var loader = modalLoader();
    var detailsModal = $("#detailsModal");
    detailsModal.modal('show');
    detailsModal.find('.modal-body').html(loader)
    axios.get(`/admin/order/wallet/${wallet_id}`)
      .then(res => {
        const resData = res.data;
        var htmlData = walletMasterEditForm(resData);
        detailsModal.find('.modal-title').text('Wallet Master Edit Form')
        detailsModal.find('.modal-body').html(htmlData)
      })
      .catch(error => {
        console.log(error);
      })
  }


  $(document).on('click', '.walletMasterEdit', function (event) {
    event.preventDefault();
    var wallet_id = $(this).attr('href');
    generateWalletMasterEdit(wallet_id);
  });

})(jQuery);



