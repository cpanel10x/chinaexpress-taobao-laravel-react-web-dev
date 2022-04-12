import React from 'react';
import AliProductWishListButton from "../wishlist/AliProductWishListButton";

const AliAddToCart = (props) => {
	const {shipment, product} = props;
	const {data: shipingInfo, isLoading} = shipment;
	const isShipping = shipingInfo?.freightResult?.length;

	return (
		<div className="row">
			<div className="col pr-1">
				<a href={"add-to-cart"}
				   onClick={e => e.preventDefault()}
				   className={`btn btn-custom-product btn-addToCart btn-block ${!isShipping && 'disabled'}`}
				>
					<span className="cartIcon"><i className="icon-cart"/></span>
					<span>Add to Cart</span>
				</a>
			</div>
			<div className="col pl-1">
				<AliProductWishListButton product={product}/>
			</div>
		</div>
	);
};

export default AliAddToCart;