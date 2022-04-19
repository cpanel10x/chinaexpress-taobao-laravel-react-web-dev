import React from 'react';
import {Link} from "react-router-dom";
import {characterLimiter} from "../../../utils/Helpers";
import AttributeImage from "../../checkout/includes/attributes/AttributeImage";
import AttrConfigs from "../../checkout/includes/attributes/AttrConfigs";
import {CartProductSummary, singleProductTotal} from "../../../utils/CartHelpers";
import {useMediaQuery} from "react-responsive";

const PaymentItem = (props) => {

	const {cart, cartItems, currency, advanced_rate, shippingRate} = props;

	const {totalPrice, advanced, dueAmount, totalQty} = CartProductSummary(cart, advanced_rate);

	const approxWeight = (qty, product) => {
		const weight = product?.weight || 0;
		const itemWeight = Number(weight) * Number(qty);
		return Number(itemWeight).toFixed(3);
	};

	const isMobile = useMediaQuery({query: '(max-width: 991px)'});
	const activeVariations = (product) => {
		return product?.variations.filter(filter => parseInt(filter.is_checked) === 1);
	};

	const productPageLink = (product) => {
		const ItemId = product?.ItemId;
		const ProviderType = product?.ProviderType;
		return ProviderType === 'aliexpress' ? `/aliexpress/search?url=https://www.aliexpress.com/item/${ItemId}.html` : `/product/${ItemId}`;
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
							activeVariations(product)?.map((variation, index) =>
								<div className="variation" key={index}>
									<div className="row align-items-center">
										<div className="col-3 p-0">
											<AttributeImage product={product} productPageLink={productPageLink(product)} attributes={variation?.attributes}/>
										</div>
										<div className="col-9">
											<Link to={productPageLink(product)} title={product.Title}>
												{
													isMobile ?
														characterLimiter(product.Title, 55)
														:
														product.Title
												}
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
														<div className="mb-2 small">Variations: <strong><AttrConfigs attributes={variation?.attributes}/></strong>
														</div>
													</div>
												</div>
											}
											<div className="row align-items-center">
												<div className="col-6 text-left ">
													<p className="m-0 pt-2 pt-lg-0">
														<strong>{`${currency + ' ' + variation.price} x ${variation.qty}`}</strong>
													</p>
												</div>
												<div className="col-6 text-right">
													<p className="m-0 pt-2 pt-lg-0">
														<strong>{`${currency + ' ' + Math.round(Number(variation.qty) * Number(variation.price))}`}</strong>
													</p>
												</div>
											</div>

										</div>
									</div>
									<hr className="my-2"/>
								</div>
							)
						}
						{
							activeVariations(product)?.length > 0 &&
							parseInt(product?.DeliveryCost) > 0 &&
							<div className="row">
								<div className="col-12">
									<div className="text-right">China Local Shipping cost: <strong>{currency + ' ' + product?.DeliveryCost}</strong>
									</div>
								</div>
							</div>
						}
						{activeVariations(product)?.length > 0 && parseInt(product?.DeliveryCost) > 0 && <hr className="my-2"/>}
						{
							activeVariations(product)?.length > 0 &&
							<>
								<div className="row">
									<div className="col-12">
										<div className="text-right">Item Total: <strong>{currency + ' ' + singleProductTotal(product)}</strong>
										</div>
									</div>
								</div>
								<hr className="my-2"/>
							</>
						}

					</div>
				)
			}
			<div className="summary_row">
				<div className="row">
					<div className="col-12 text-right">
						<p className="my-2"><span className="mr-2">Total Payable: </span><strong> {currency + " " + totalPrice} </strong></p>
					</div>
				</div>
				<div className="row">
					<div className="col-12 text-right">
						<p className="my-2"><span
							className="mr-2">Need To Pay {advanced_rate}%: </span><strong> {currency + " " + advanced} </strong></p>
					</div>
				</div>
				<div className="row">
					<div className="col-12 text-right">
						<p className="my-2"><span className="mr-2">Due Amount: </span><strong> {currency + " " + dueAmount} </strong></p>
					</div>
				</div>
			</div>

		</div>
	);
};

export default PaymentItem;