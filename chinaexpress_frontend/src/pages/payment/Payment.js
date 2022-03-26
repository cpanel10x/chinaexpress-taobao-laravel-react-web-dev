import React from "react";
import {withRouter} from "react-router-dom";
import {
	CartProductSummary,
} from "../../utils/CartHelpers";
import swal from "sweetalert";
import BkashPayment from "./includes/BkashPayment";
import {useSettings} from "../../api/GeneralApi";
import {useCartMutation, useCart} from "../../api/CartApi";
import SmallSpinner from "../../loader/SmallSpinner";

const Payment = (props) => {
	const {data: settings} = useSettings();
	const {data: cart} = useCart();
	const cartItems = cart?.cart_items || [];

	const {PaymentMethod, confirmOrder} = useCartMutation();

	const currency = settings?.currency_icon || '৳';
	const payment_method = cart?.payment_method || false;

	const advanced_rate = 60;
	const {totalPrice, advanced, dueAmount, totalQty} = CartProductSummary(cart, advanced_rate);


	const selectPaymentMethod = (event) => {
		const method = event.target.value;
		if (method) {
			PaymentMethod.mutateAsync({method: method});
		}
	};


	const paymentConfirm = (e) => {
		e.preventDefault();
		let process = true;
		if (!payment_method) {
			swal({
				title: "Select your payment method",
				icon: "warning",
				buttons: "Ok, Understood",
			});
			process = false;
		}

		if (process) {
			const checked = cartItems?.filter(item => item.is_checked > 0);
			if (checked) {
				confirmOrder.mutateAsync()
					.then(response => {
						if (response?.status) {
							window.location.replace(`/${response.redirect}`);
						}
					})
			}
		}
	};

	return (
		<main className="main">
			<div className="page-content">
				<div className="cart">
					<div className="container">
						<div className="row justify-content-center">
							<div className="col-lg-8 order-1 order-lg-0">
								<div className="card my-3 my-lg-5">
									<div className="card-body">
										<h3>Select Payment Method</h3>
										<div className="row my-3 my-lg-5">
											<div className="col-md-6">
												<div className="card payment_card text-center">
													<div className="form-check form-check-inline mx-auto">
														{
															PaymentMethod?.isLoading ?
																<SmallSpinner/>
																:
																<input
																	className="form-check-input mr-2"
																	type="radio"
																	name="payment_method"
																	onChange={event => selectPaymentMethod(event)}
																	id="bkash"
																	value="bkash"
																	checked={payment_method === 'bkash'}
																/>
														}
														<label
															className="form-check-label"
															htmlFor="bkash"
														>
															<img
																src={`/assets/img/payment/bkash.png`}
																alt="bkash"
															/>
														</label>
													</div>
												</div>
											</div>
										</div>

										<BkashPayment advanced={advanced} paymentConfirm={paymentConfirm} confirmOrder={confirmOrder}/>

									</div>
								</div>
							</div>
							<div className="col-lg-4 order-0 order-lg-1">
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

						</div>
					</div>
				</div>
			</div>
		</main>
	);
};


export default withRouter(Payment);
