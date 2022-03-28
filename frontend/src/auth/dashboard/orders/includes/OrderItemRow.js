import React from "react";
import {Link} from "react-router-dom";
import {orderSummaryCalculation} from "../../../../utils/CartHelpers";

function OrderItemRow({ order, currency }) {


  const order_items = order?.order_items || [];
  const {productValue, firstPayment, dueAmount} = orderSummaryCalculation(order_items);

    return (
      <tr>
        <td className="text-left">{order.created_at}</td>
        <td>{order.order_number}</td>
        <td>{productValue}</td>
        <td>{firstPayment}</td>
        <td>{dueAmount}</td>
        <td className="text-left">{order.status}</td>
        <td>
          {
            order.status === 'waiting-for-payment' ?
              <Link to={`/dashboard/orders/${order.transaction_id}`} className="btn btn-block btn-default">PayNow</Link>
              :
              <Link to={`/dashboard/orders/${order.transaction_id}`} className="btn btn-block btn-success">View</Link>
          }
        </td>
      </tr>
    );
}

export default OrderItemRow;
