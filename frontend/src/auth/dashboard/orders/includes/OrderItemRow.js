import React from "react";
import {Link} from "react-router-dom";
import moment from 'moment';
import {orderSummaryCalculation} from "../../../../utils/CartHelpers";


function OrderItemRow({order, currency}) {


	const order_items = order?.order_items || [];
	const {productValue, firstPayment, dueAmount} = orderSummaryCalculation(order_items);

	return (
		<tr>
			<td className="text-left">
				{moment(order.created_at).format('DD/MM/YYYY')}
			</td>
			<td>{order.order_number}</td>
			{/*<td>{order.tracking_number}</td>*/}
			<td>{productValue}</td>
			<td>{firstPayment}</td>
			<td>{dueAmount}</td>
			<td className="text-left text-nowrap">{order.status}</td>
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
