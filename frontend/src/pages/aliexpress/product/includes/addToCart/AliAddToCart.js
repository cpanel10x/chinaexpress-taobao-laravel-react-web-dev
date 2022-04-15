import React from 'react';
import AliProductWishListButton from "../wishlist/AliProductWishListButton";
import {sumCartItemTotal} from "../../../../../utils/AliHelpers";
import Swal from 'sweetalert2'
import {useItemMarkAsCart} from "../../../../../api/CartApi";
import {useQueryClient} from "react-query";

const AliAddToCart = (props) => {
	const {cartItem, product, shipment, settings} = props;
	const {data: shipingInfo} = shipment;
	const isShipping = shipingInfo?.freightResult?.length;

	const productId = product?.product_id;

	const cache = useQueryClient();
	const {mutateAsync, isLoading} = useItemMarkAsCart();

	const itemTotal = sumCartItemTotal(cartItem?.variations || []);
	const isExistsOnCart = cartItem?.IsCart || 0;

	const processAddToCart = (event) => {
		event.preventDefault();
		if (itemTotal) {
			mutateAsync({
				item_id: productId,
				shipping_type: 'reguler',
			}, {
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
						<button type="button"
						        className={`btn btn-custom-product btn-addToCart btn-block disabled`}
						>
							<span className="cartIcon"><i className="icon-cart"/></span>
							<span>Add to Cart</span>
						</button>
						:
						<a href={"add-to-cart"}
						   onClick={event => processAddToCart(event)}
						   className={`btn btn-custom-product btn-addToCart btn-block ${!isShipping && 'disabled'}`}
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