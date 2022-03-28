import React from 'react';
import AttributeImage from "../../../../pages/checkout/includes/attributes/AttributeImage";
import {Link} from "react-router-dom";
import {characterLimiter} from "../../../../utils/Helpers";
import AttrConfigs from "../../../../pages/checkout/includes/attributes/AttrConfigs";

const OrderBody = (props) => {

	const {product, currency} = props;

	return (
		<div className="cartItem">
			{
				product?.item_variations?.map((variation, index) =>
					<div className="variation" key={index}>
						<div className="row align-items-center">
							<div className="col-2">
								<AttributeImage product={product} attributes={variation?.attributes}/>
							</div>
							<div className="col-10">
								<Link to={`/product/${product.ItemId}`} title={product.Title}>
									{characterLimiter(product.Title, 130)}
								</Link>
								<div className="row">
									<div className="col-12">
										<p className="my-1 small">Weight: <strong>{product.weight} Kg.</strong> <span
											className="ml-2">Shipping Rate: <strong>{currency + ' ' + product.shipping_rate}</strong> per Kg.</span>
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
	);
};

export default OrderBody;