import React from 'react';
import {Link} from "react-router-dom";
import AliProductWishListButton from "../wishlist/AliProductWishListButton";
import {sumCartItemTotal} from "../../../../../utils/AliHelpers";
import Swal from 'sweetalert2'
import {useItemMarkAsCart} from "../../../../../api/CartApi";
import {useQueryClient} from "react-query";

const AliAddToCart = (props) => {
	const {cartItem, product, shipment, settings} = props;
	const {data: shipingInfo} = shipment;

	const item_id = product?.product_id;

	const cache = useQueryClient();
	const {mutateAsync, isLoading} = useItemMarkAsCart();

	const itemTotal = sumCartItemTotal(cartItem?.variations || []);
	const isExistsOnCart = cartItem?.IsCart || 0;

	const processAddToCart = (event) => {
		event.preventDefault();
		if (itemTotal) {
			mutateAsync({item_id}, {
				onSuccess: () => {
					cache.invalidateQueries("customer_cart");
				}
			});
		} else {
			Swal.fire({
				text: 'Add your quantity first',
				icon: 'warning',
				confirmButtonText: 'Ok, Dismiss'
			});
		}
	};


	return (
		<div className="row">
			<div className="col pr-1">
				{
					isExistsOnCart ?
						<Link to={`/checkout`} className={`btn btn-custom-product btn-addToCart btn-block`}>
							<span className="cartIcon"><i className="icon-cart"/></span>
							<span>Buy Now</span>
						</Link>
						:
						<a href={"add-to-cart"}
						   onClick={event => processAddToCart(event)}
						   className={`btn btn-custom-product btn-addToCart btn-block`}
						>
							<span className="cartIcon"><i className="icon-cart"/></span>
							<span>Add to Cart</span>
						</a>
				}
			</div>
			<div className="col pl-1">
				<AliProductWishListButton product={product} settings={settings}/>
			</div>
		</div>
	);
};

export default AliAddToCart;