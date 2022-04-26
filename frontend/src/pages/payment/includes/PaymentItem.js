import React from 'react';
import {Link} from "react-router-dom";
import {characterLimiter} from "../../../utils/Helpers";
import AttributeImage from "../../checkout/includes/attributes/AttributeImage";
import AttrConfigs from "../../checkout/includes/attributes/AttrConfigs";
import {CartProductSummary, singleProductTotal} from "../../../utils/CartHelpers";
import {useMediaQuery} from "react-responsive";
import CheckoutItemSimpleSummary from "../../checkout/includes/CheckoutItemSimpleSummary";
import AliExpressItemDescription from "../../checkout/includes/itemDescription/AliExpressItemDescription";
import TaobaoItemDescription from "../../checkout/includes/itemDescription/TaobaoItemDescription";

const PaymentItem = (props) => {

	const {cart, cartItems, currency, advanced_rate, settings} = props;

	const {totalPrice, advanced, dueAmount} = CartProductSummary(cart, advanced_rate);

	const activeVariations = (product) => {
		return product?.variations.filter(filter => parseInt(filter.is_checked) === 1);
	};

	const productPageLink = (product) => {
		const ItemId = product?.ItemId;
		const ProviderType = product?.ProviderType;
		return ProviderType === 'aliexpress' ? `/aliexpress/product/${ItemId}` : `/product/${ItemId}`;
	};

	return (
		<div className="checkout_grid">
			<div className="row">
				<div className="col">
					Details
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
											{
												product?.ProviderType === "aliexpress" ?
													<AliExpressItemDescription
														currency={currency}
														productPageLink={productPageLink(product)}
														product={product}
														variation={variation}
														isQuantity={false}
													/>
													:
													<TaobaoItemDescription
														currency={currency}
														productPageLink={productPageLink(product)}
														product={product}
														variation={variation}
														isQuantity={false}
													/>
											}
										</div>
									</div>
									<hr className="my-2"/>
								</div>
							)
						}
						{
							singleProductTotal(product) > 0 &&
							<CheckoutItemSimpleSummary product={product} currency={currency}/>
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