import Swal from "sweetalert2";

(function ($) {

  const body = $('body');
  const refundModal = $('#refundProcessModal');
  body.on('click', '.payment_status', function (event) {
    event.preventDefault();
    axios.post($(this).attr('href'))
      .then(res => {
        const resData = res.data;
        if (resData.status === true) {

        } else {
          Swal.fire({
            'text': resData.msg,
            'icon': 'error',
          })
        }
      })
  });

  body.on('click', '.refund_order', function (event) {
    event.preventDefault();
    axios.post($(this).attr('href'))
    .then(res => {
      const resData = res.data;
      if (resData.status === true) {

      } else {
        Swal.fire({
          'text': resData.msg,
          'icon': 'error',
        })
      }
    })

  });
  body.on('click', '.refund_status', function (event) {
    event.preventDefault();
    axios.post($(this).attr('href'))
    .then(res => {
      const resData = res.data;
      if (resData.status === true) {

      } else {
        Swal.fire({
          'text': resData.msg,
          'icon': 'error',
        })
      }
    })
  });


})(jQuery);