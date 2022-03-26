import React, {useEffect} from "react";
import _, {isArray, isEmpty} from "lodash";
import {goPageTop} from "../../../utils/Helpers";

import {
	calculateAirShippingCharge,
	cartCheckedProductTotal
} from "../../../utils/CartHelpers";
import {withRouter} from "react-router-dom";
import PageSkeleton from "../../../skeleton/PageSkeleton";
import OrderITemRow from "./includes/OrderITemRow";

const OrderDetails = props => {
	const {match, general} = props;
	const {orderId} = match.params;

	// const {resData, isLoading} = SwrGetRequest(
	// 	orderId ? `/default/order/${orderId}` : null
	// );


	const resData = {};
	const isLoading = true;

	let order = () => {
		if (!isEmpty(resData)) {
			return resData.data.order;
		}
	};
	order = order();

	useEffect(() => {
		goPageTop();
	}, [resData]);

	if (isLoading) {
		return <PageSkeleton/>;
	}

	const currency = general?.currency_icon || 'sadf';
	const ShippingCharges = general?.air_shipping_charges || 'sadf';

	const address = !_.isEmpty(order) ? JSON.parse(order.address) : {};
	const orderItems = !_.isEmpty(order) ? order.order_items : [];

	const totalShippingCost = product => {
		const checkItemSubTotal = cartCheckedProductTotal(product);
		const totalPrice = checkItemSubTotal.totalPrice;
		const totalWeight = checkItemSubTotal.totalWeight;
		const DeliveryCost = product.DeliveryCost;
		const ShippingRate = calculateAirShippingCharge(
			totalPrice,
			ShippingCharges
		);
		return (
			Number(DeliveryCost) + Number(totalWeight) * Number(ShippingRate)
		);
	};

	const productTotalCost = product => {
		const checkItemSubTotal = cartCheckedProductTotal(product);
		const totalPrice = checkItemSubTotal.totalPrice;
		const ShippingCost = totalShippingCost(product);
		return Number(totalPrice) + Number(ShippingCost);
	};

	return (
		<main className="main bg-gray">

			<div className="page-content">
				<div className="container">
					<div className="row justify-content-center">
						<aside className="col-md-9">
							<div className="card bg-white">
								<div className="border card-header p-4">
									<h2 className="card-title">
										Order Details: #{order.order_number}
									</h2>
								</div>
								<div className="card-body px-5 py-4">
									<table className="table table-bordered table-cart">
										<thead>
										<tr>
											<th> Image</th>
											<th>Title</th>
											<th>Quantity</th>
											<th>Total</th>
											<th>FirstPayment</th>
											<th>DuePayment</th>
										</tr>
										</thead>
										<tbody>
										{isArray(orderItems) &&
										!isEmpty(orderItems) ? (
											orderItems.map((item, key) => (
												<OrderITemRow
													key={key}
													currency={currency}
													item={item}
												/>
											))
										) : (
											<tr>
												<td
													colSpan={6}
													className="text-center bg-lighter"
												>
													You have no cart!
												</td>
											</tr>
										)}
										</tbody>
										<tfoot>
										<tr>
											<td colSpan={6}>
												<h3 className="border-0 m-0 py-3 summary-title">
													Cart Total Summary
												</h3>
											</td>
										</tr>
										<tr className="summary-total">
											<td
												colSpan={5}
												className="text-right"
											>
												Subtotal:
											</td>
											<td className="text-right">{`${currency} ${order.amount}`}</td>
										</tr>
										<tr className="summary-total">
											<td
												colSpan={5}
												className="text-right"
											>
												Need To Pay:
											</td>
											<td className="text-right">{`${currency} ${order.needToPay}`}</td>
										</tr>
										<tr className="summary-total">
											<td
												colSpan={5}
												className="text-right"
											>
												Due Amount:
											</td>
											<td className="text-right">{`${currency} ${order.dueForProducts}`}</td>
										</tr>
										</tfoot>
									</table>
								</div>
							</div>
						</aside>
					</div>
					{/* End .row */}
				</div>
				{/* End .container */}
			</div>
		</main>
	);
};


export default withRouter(OrderDetails);
