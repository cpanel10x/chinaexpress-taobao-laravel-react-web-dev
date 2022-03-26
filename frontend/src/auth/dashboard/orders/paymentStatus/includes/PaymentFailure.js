import React from "react";
import {Link} from "react-router-dom";


const PaymentFailure = ({msg, orderID}) => {
   return (
      <div className="text-center order_complete">
         <i className="fa-times-circle fas text-danger"/>
         <div className="heading_s1">
            <h3>Payment Failed</h3>
         </div>
         <p>
            {msg} ! Your order is being processed after complete your payment. You can try again for payment within 5 hours on this order. If you not complete your payment withing 5 hours, your order will be invalid.
         </p>
         <Link to={`/order/${orderID}`} className="btn btn-default">
            Back To Order
         </Link>
      </div>
   );
};

export default PaymentFailure;
