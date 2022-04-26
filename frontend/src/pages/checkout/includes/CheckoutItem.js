import React from 'react';
import AllCheck from "./tableComponents/AllCheck";
import ItemCheck from "./tableComponents/ItemCheck";
import AttributeImage from "./attributes/AttributeImage";
import TaobaoItemDescription from "./itemDescription/TaobaoItemDescription";
import AliExpressItemDescription from "./itemDescription/AliExpressItemDescription";
import CheckoutItemSimpleSummary from "./CheckoutItemSimpleSummary";

const CheckoutItem = (props) => {

	const {cart, cartItems, settings, currency, removeCart, removeItemFromCart} = props;

	const productPageLink = (product) => {
		const ItemId = product?.ItemId;
		const ProviderType = product?.ProviderType;
		return ProviderType === 'aliexpress' ? `/aliexpress/product/${ItemId}` : `/product/${ItemId}`;
	};

	return (
		<div className="checkout_grid">
			<div className="row">
				<div className="col-8">
					<AllCheck
						cart={cart}
						cartItems={cartItems}
						settings={settings}/>
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
											<ItemCheck product={product} variation={variation} settings={settings}/>
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
														isQuantity={true}
													/>
													:
													<TaobaoItemDescription
														currency={currency}
														productPageLink={productPageLink(product)}
														product={product}
														variation={variation}
														isQuantity={true}
													/>
											}
										</div>
									</div>
									<hr className="my-2"/>
								</div>
							)
						}
						<CheckoutItemSimpleSummary product={product} currency={currency}/>
					</div>
				)
			}
		</div>
	);
};

export default CheckoutItem;