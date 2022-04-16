import React from 'react';
import {Link} from "react-router-dom";
import {sumCartItemTotal} from "../../../../../utils/AliHelpers";
import Swal from 'sweetalert2'
import {useItemMarkAsCart} from "../../../../../api/CartApi";
import {useQueryClient} from "react-query";
import ProductWishListButton from "../wishlist/ProductWishListButton";

const AddToCartButtons = (props) => {
	const {cartItem, product, settings} = props;

	const item_id = product?.Id ? product.Id : 'na';

	const cache = useQueryClient();
	const {mutateAsync, isLoading} = useItemMarkAsCart();

	const isExistsOnCart = cartItem?.IsCart || 0;

	const processAddToCart = (event) => {
		event.preventDefault();
		if (cartItem?.Quantity > 0) {
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
				<ProductWishListButton product={product} settings={settings}/>
			</div>
		</div>
	);
};

export default AddToCartButtons;