import React, {useState} from 'react';
import {Link} from "react-router-dom";
import Swal from 'sweetalert2'
import {useItemMarkAsCart} from "../../../../../api/CartApi";
import {useQueryClient} from "react-query";
import ProductWishListButton from "../wishlist/ProductWishListButton";
import PopupShown from "../oneTimePopup/PopupShown";
import {sumCartItemTotal} from "../../../../../utils/AliHelpers";

const AddToCartButtons = (props) => {
	const {cartItem, product, settings} = props;
	const [showPopup, setShowPopup] = useState(false);

	const cache = useQueryClient();
	const {mutateAsync, isLoading} = useItemMarkAsCart();

	const item_id = product?.Id ? product.Id : 'na';
	const min_order = settings?.min_order_amount || 0;
	const currency = settings?.currency_icon || '৳';
	const itemTotal = sumCartItemTotal(cartItem?.variations || []);
	const isExistsOnCart = cartItem?.IsCart || 0;

	const processAddToCart = () => {
		mutateAsync({item_id}, {
			onSuccess: () => {
				setShowPopup(false);
				cache.invalidateQueries("customer_cart");
			}
		});
	};

	const ensurePopupRead = (event) => {
		event.preventDefault();
		if (itemTotal) {
			if (parseInt(itemTotal) >= parseInt(min_order)) {
				setShowPopup(true);
			} else {
				Swal.fire({
					text: `Minimum product value ${currency} ${min_order}`,
					icon: 'warning',
					confirmButtonText: 'Ok, Dismiss'
				});
			}
		} else {
			Swal.fire({
				text: 'Add your quantity first',
				icon: 'warning',
				confirmButtonText: 'Ok, Dismiss'
			});
		}
	};

	return (
		<div>
			{
				showPopup && !cartItem?.is_popup_shown &&
				<PopupShown
					cartItem={cartItem}
					item_id={item_id}
					processAddToCart={processAddToCart}
					setShowPopup={setShowPopup}
					settings={settings}/>
			}
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
							   onClick={event => ensurePopupRead(event)}
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
		</div>
	);
};

export default AddToCartButtons;