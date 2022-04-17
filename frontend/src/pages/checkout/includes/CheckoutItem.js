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

const CheckoutItem = (props) => {

	const {cart, cartItems, currency, removeCart, removeItemFromCart} = props;

	const isMobile = useMediaQuery({query: '(max-width: 991px)'});

	const approxWeight = (qty, product) => {
		const weight = product?.weight || 0;
		const itemWeight = Number(weight) * Number(qty);
		return Number(itemWeight).toFixed(3);
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
											<ItemCheck product={product} variation={variation}/>
										</div>
										<div className="col-3 pr-0 pr-lg-0">
											<AttributeImage product={product} attributes={variation?.attributes}/>
										</div>
										<div className="col-8">
											<Link to={`/product/${product.ItemId}`} title={product.Title}>
												{
													isMobile ?
														characterLimiter(product.Title, 45)
														:
														product.Title
												}
											</Link>
											<div className="row">
												<div className="col-12">
													<p className="mb-0 mr-1 small">Weight: <strong>{approxWeight(variation.qty, product)} Kg.</strong>
														{isMobile && <br/>}
														<span>Shipping Rate: <strong>{currency + ' ' + product?.shipping_rate}</strong> per Kg.</span>
													</p>
												</div>
											</div>
											{
												JSON.parse(variation?.attributes).length > 0 &&
												<div className="row">
													<div className="col-12">
														<div className="mb-lg-2 small">Variations: <strong><AttrConfigs attributes={variation?.attributes}/></strong>
														</div>
													</div>
												</div>
											}
											<div className="row d-lg-none">
												<div className="col-12">
													<p className="m-0 small">Per unit price: <strong>{` ${currency + ' ' + variation.price} `}</strong></p>
												</div>
											</div>

											<div className="row align-items-center">
												<div className="col-7 pr-0 col-lg-4">
													<p className="m-0 small d-block d-lg-none">Max: {variation.maxQuantity}</p>
													<CheckoutQuantity product={product} variation={variation}/>
												</div>
												<div className="col-3 d-none d-lg-block">
													<p className="m-0">Max: {variation.maxQuantity}</p>
												</div>
												<div className="col-3 px-0 col-lg-2 text-center d-none d-lg-block ">
													<p className="m-0 pt-2 pt-lg-0"><strong>{` ${currency + ' ' + variation.price} `}</strong></p>
												</div>
												<div className="col-5 col-lg-3 pl-0 text-right">
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

						{
							parseInt(product?.DeliveryCost) > 0 &&
							<div className="row">
								<div className="col-12">
									<div className="text-right">China Local Shipping cost: <strong>{currency + ' ' + product?.DeliveryCost}</strong>
									</div>
								</div>
							</div>
						}
						{parseInt(product?.DeliveryCost) > 0 && <hr className="my-2"/>}
						<div className="row">
							<div className="col-12">
								<div className="text-right">Item Total: <strong>{currency + ' ' + singleProductTotal(product)}</strong>
								</div>
							</div>
						</div>
						<hr className="my-2"/>
					</div>
				)
			}
		</div>
	);
};

export default CheckoutItem;