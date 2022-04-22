import React from 'react';
import AllCheck from "./tableComponents/AllCheck";
import ItemCheck from "./tableComponents/ItemCheck";
import {Link} from "react-router-dom";
import AttributeImage from "./attributes/AttributeImage";
import AttrConfigs from "./attributes/AttrConfigs";
import CheckoutQuantity from "./tableComponents/CheckoutQuantity";
import {characterLimiter} from "../../../utils/Helpers";
import {useMediaQuery} from "react-responsive";
import {singleProductTotal} from "../../../utils/CartHelpers";
import TaobaoItemDescription from "./itemDescription/TaobaoItemDescription";
import AliExpressItemDescription from "./itemDescription/AliExpressItemDescription";

const CheckoutItem = (props) => {

	const {cart, cartItems, currency, removeCart, removeItemFromCart} = props;


	const productPageLink = (product) => {
		const ItemId = product?.ItemId;
		const ProviderType = product?.ProviderType;
		return ProviderType === 'aliexpress' ? `/aliexpress/product/${ItemId}` : `/product/${ItemId}`;
	};


	return (
		<div className="checkout_grid">
			<div className="row">
				<div className="col-8">
					<AllCheck cart={cart} cartItems={cartItems}/>
					<div className="removeBtn mx-3 text-center d-inline-block">
						{
							removeCart.isLoading ?
								<div className="spinner-border spinner-border-sm " role="status">
									<span className="sr-only">Loading...</span>
								</div>
								:
								<a
									href={'/remove'}
									onClick={(event) => removeItemFromCart(event)}
									className="cart-remove m-0"
									title="Remove"
								>
									Remove
								</a>
						}
					</div>
				</div>
				<div className="col text-right font-weight-bold">Total</div>
			</div>
			<hr className="my-2"/>
			{
				cartItems.map(product =>
					<div className="cartItem" key={product.id}>
						{
							product?.variations?.map(variation =>
								<div className="variation" key={variation.id}>
									<div className="row align-items-center">
										<div className="col-1">
											<ItemCheck variation={variation}/>
										</div>
										<div className="col-3 pr-0 pr-lg-0">
											<AttributeImage
												product={product}
												productPageLink={productPageLink(product)}
												attributes={variation?.attributes}/>
										</div>
										<div className="col-8">
											{
												product?.ProviderType === "aliexpress" ?
													<AliExpressItemDescription
														currency={currency}
														productPageLink={productPageLink(product)}
														product={product}
														variation={variation}
													/>
													:
													<TaobaoItemDescription
														currency={currency}
														productPageLink={productPageLink(product)}
														product={product}
														variation={variation}
													/>
											}

										</div>
									</div>
									<hr className="my-2"/>
								</div>
							)
						}

						{
							product?.ProviderType === "aliexpress" && parseInt(product?.DeliveryCost) > 0 &&
							<div className="row">
								<div className="col-12">
									<div className="text-right">
										{
											product?.shipping_type === 'express' ?
												`China Local Delivery Charge:`
												:
												`China to BD Shipping Charge:`
										}
										<strong>{currency + ' ' + product?.DeliveryCost}</strong>
									</div>
								</div>
							</div>
						}
						{
							product?.ProviderType !== "aliexpress" && parseInt(product?.variations_count) > 0 &&
							<div className="row">
								<div className="col-12">
									<div className="text-right">
										China Local Shipping cost: <strong>{currency + ' ' + product?.DeliveryCost}</strong>
									</div>
								</div>
							</div>
						}

						{parseInt(product?.variations_count) > 0 && <hr className="my-2"/>}

						{parseInt(product?.variations_count) > 0 &&
						<div className="row">
							<div className="col-12">
								<div className="text-right">Subtotal: <strong>{currency + ' ' + singleProductTotal(product)}</strong>
								</div>
							</div>
						</div>
						}
						{parseInt(product?.variations_count) > 0 && <hr className="my-2"/>}
					</div>
				)
			}
		</div>
	);
};

export default CheckoutItem;