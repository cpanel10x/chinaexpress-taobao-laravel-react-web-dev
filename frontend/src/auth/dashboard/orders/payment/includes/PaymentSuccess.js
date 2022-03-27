import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

const paymentSuccess = ({msg, orderID}) => {
   return (
      <div className="text-center order_complete">
         <i className="fas fa-check-circle"/>
         <div className="heading_s1">
            <h3>Payment Successful</h3>
         </div>
         <p>
            {msg}! Thank you for your order. Your order is being processed and will be
            completed soon. You will receive an email confirmation when your
            order is completed.
         </p>
         <Link to={`/`} className="btn btn-default">
            Continue Shopping
         </Link>
      </div>
   );
};

export default paymentSuccess;
