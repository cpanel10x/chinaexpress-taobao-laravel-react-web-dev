import React from 'react';
import {Link} from "react-router-dom";
import {characterLimiter} from "../../../utils/Helpers";
import AttributeImage from "../../checkout/includes/attributes/AttributeImage";
import AttrConfigs from "../../checkout/includes/attributes/AttrConfigs";
import {CartProductSummary} from "../../../utils/CartHelpers";

const PaymentItem = (props) => {

	const {cart, cartItems, currency, advanced_rate, shippingRate} = props;

	const {totalPrice, advanced, dueAmount, totalQty} = CartProductSummary(cart, advanced_rate);

	const approxWeight = (qty, product) => {
		const weight = product?.weight || 0;
		const itemWeight = Number(weight) * Number(qty);
		return Number(itemWeight).toFixed(3);
	};

	return (
		<div className="checkout_grid">
			<div className="row">
				<div className="col">
					Products
				</div>
				<div className="col text-right font-weight-bold">Total</div>
			</div>
			<hr className="my-2"/>
			{
				cartItems.map(product =>
					<div className="cartItem" key={product.id}>
						{
							product?.variations?.map((variation, key) =>
								<div className="variation" key={variation.id}>
									<div className="row align-items-center">
										<div className="col-3 p-0">
											<AttributeImage product={product} attributes={variation?.attributes}/>
										</div>
										<div className="col-9">
											<Link to={`/product/${product.ItemId}`} title={product.Title}>
												{characterLimiter(product.Title, 130)}
											</Link>
											<div className="row">
												<div className="col-12">
													<p className="my-1 small">Weight: <strong>{approxWeight(variation.qty, product)} Kg.</strong> <span
														className="ml-2">Shipping Rate: <strong>{currency + ' ' + shippingRate}</strong> per Kg.</span>
													</p>
												</div>
											</div>
											{
												JSON.parse(variation?.attributes).length > 0 &&
												<div className="row">
													<div className="col-12">
														<div className="mb-2 small">Variations: <strong><AttrConfigs attributes={variation?.attributes}/></strong></div>
													</div>
												</div>
											}
											{
												parseInt(product?.DeliveryCost) > 0 &&
												<div className="row">
													<div className="col-12">
														<div className="mb-2 small">China Local Shipping cost: <strong>{currency + ' ' + product?.DeliveryCost}</strong></div>
													</div>
												</div>
											}
											<div className="row align-items-center">
												<div className="col-6 text-left ">
													<p className="m-0 pt-3 pt-lg-0"><strong>{`${currency + ' ' + variation.price} x ${variation.qty}`}</strong>
													</p>
												</div>
												<div className="col-6 text-right">
													<p className="m-0 pt-3 pt-lg-0">
														<strong>{`${currency + ' ' + Math.round(Number(variation.qty) * Number(variation.price))}`}</strong></p>
												</div>
											</div>

										</div>
									</div>
									<hr className="my-2"/>
								</div>
							)
						}
					</div>
				)
			}
			<hr className="my-2"/>

			<div className="card my-3 my-lg-5">
				<div className="card-body">
					<h3>Order Summary</h3>
					<table className="table table table-cart">
						<tbody>
						<tr className="summary-total">
							<td className="text-left">Subtotal:</td>
							<td className="text-right">{`${currency + ' ' + totalPrice}`}</td>
						</tr>
						<tr className="summary-total">
							<td className="text-left">Need To Pay: {advanced_rate}%</td>
							<td className="text-right">{`${currency + ' ' + advanced}`}</td>
						</tr>
						<tr className="summary-total">
							<td className="text-left">Due Amount:</td>
							<td className="text-right">{`${currency + ' ' + dueAmount}`}</td>
						</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default PaymentItem;