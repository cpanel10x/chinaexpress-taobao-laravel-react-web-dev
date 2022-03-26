function redirectWithErrors(status, tran_id, data) {
  return `/bkash/payment/status?status=${status}&tran_id=${tran_id}&n_msg=${data?.errorMessage}&paymentID=${data?.paymentID}`;
}

function callReconfigure(val) {
  bKash.reconfigure(val);
}

(function ($) {
  let paymentInfo = $(document).find("#paymentInfo").text();
  paymentInfo = paymentInfo ? JSON.parse(paymentInfo) : {};
  let tran_id = paymentInfo?.ref_no;
  let amount = paymentInfo?.amount;
  let accessToken = "";
  let csrfToken = $('meta[name="csrf-token"]').attr("content");

  function clickPayButton() {
    $("#bKash_button").trigger("click");
  }

  $.ajax({
    url: "/bkash/token",
    type: "POST",
    headers: {"X-CSRF-TOKEN": csrfToken},
    contentType: "application/json",
    success: function (data) {
      $("#bKash_button").trigger("click");
    },
    error: function () {
      console.log("error");
    },
  });

  var paymentConfig = {
    createCheckoutURL: `/bkash/checkout`,
    executeCheckoutURL: "/bkash/execute"
  };

  var paymentRequest = {
    amount: amount,
    intent: "sale",
    ref_no: tran_id,
  };

  bKash.init({
    paymentMode: "checkout",
    paymentRequest: paymentRequest,
    createRequest: function (request) {
      $.ajax({
        url: `${paymentConfig.createCheckoutURL}?intent=sale&ref_no=${tran_id}`,
        type: "POST",
        headers: {"X-CSRF-TOKEN": csrfToken},
        contentType: "application/json",
        success: function (data) {
          if (data.paymentID != null) {
            paymentID = data.paymentID;
            bKash.create().onSuccess(data);
          } else {
            bKash.execute().onError();
            window.location.href = redirectWithErrors('failed', tran_id, data);
          }
        },
        error: function (xhr, textStatus, errorThrown) {
          data = xhr.responseJSON;
          bKash.execute().onError();
          window.location.href = redirectWithErrors('failed', tran_id, data);
        },
      });
    },
    executeRequestOnAuthorization: function () {
      $.ajax({
        url: `${paymentConfig.executeCheckoutURL}?paymentID=${paymentID}`,
        type: "POST",
        headers: {"X-CSRF-TOKEN": csrfToken},
        contentType: "application/json",
        success: function (data) {
          if (data.paymentID) {
            window.location.href = `/bkash/payment/status?status=success&paymentID=${data.paymentID}&trxID=${data.trxID}&tran_id=${tran_id}`;
          } else {
            bKash.execute().onError();
            window.location.href = redirectWithErrors('failed', tran_id, data);
          }
        },
        error: function (xhr) {
          data = xhr.responseJSON;
          bKash.execute().onError();
          window.location.href = redirectWithErrors('failed', tran_id, data);
        },
      });
    },
    onClose: function () {
      var data = {};
      data.errorMessage = 'Payment canceled';
      window.location.href = redirectWithErrors('cancel', tran_id, data);
    },
  });
})(jQuery);
