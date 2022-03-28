import React from 'react';
import {orderSummaryCalculation} from "../../../../utils/CartHelpers";

const OrderSummary = (props) => {
	const {currency, order_items} = props;
	const {productValue, firstPayment, dueAmount} = orderSummaryCalculation(order_items);

	return (
		<div className="summary_row">
			<div className="row">
				<div className="col-12 text-right">
					<p className="my-2"><span className="mr-2">Subtotal: </span><strong> {currency + " " + productValue} </strong></p>
				</div>
			</div>
			<div className="row">
				<div className="col-12 text-right">
					<p className="my-2"><span
						className="mr-2">Need To Pay: 60% </span><strong> {currency + " " + firstPayment} </strong></p>
				</div>
			</div>
			<div className="row">
				<div className="col-12 text-right">
					<p className="my-2"><span className="mr-2">Due Amount: </span><strong> {currency + " " + dueAmount} </strong></p>
				</div>
			</div>
		</div>
	);
};

export default OrderSummary;