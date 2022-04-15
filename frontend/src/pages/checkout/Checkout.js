import React, {useEffect} from "react";
import {goPageTop} from "../../utils/Helpers";
import CheckoutSidebar from "./includes/CheckoutSidebar";
import swal from "sweetalert";
import {useSettings} from "../../api/GeneralApi";
import {useCartMutation, useCheckoutCart} from "../../api/CartApi";
import CheckoutItem from "./includes/CheckoutItem";
import {useMediaQuery} from "react-responsive";
import Helmet from "react-helmet";

const Checkout = (props) => {
	const {data: settings} = useSettings();

	const {data: cart} = useCheckoutCart();

	const cartItems = cart?.cart_items || [];

	const {removeCart} = useCartMutation();

	const ShippingCharges = settings?.air_shipping_charges;
	const currency = settings?.currency_icon;

	const shippingRate = 650;

	useEffect(() => {
		goPageTop();
	}, []);


	const isMobile = useMediaQuery({query: '(max-width: 991px)'});

	const removeItemFromCart = (e) => {
		e.preventDefault();
		const checkedItem = cartItems?.filter(item => item.variations.find(find => find.is_checked > 0));
		if (checkedItem?.length > 0) {
			swal({
				title: "Are you want to remove?",
				icon: "warning",
				buttons: true,
				dangerMode: true,
			}).then((willDelete) => {
				if (willDelete) {
					removeCart.mutateAsync();
				}
			});
		} else {
			swal({
				title: "Please select your item first!",
				icon: "warning"
			});
		}
	};

	return (
		<main className="main">
			<Helmet>
				<title>Checkout your cart </title>
			</Helmet>

			<div className="container">
				<div className="row">
					<div className="col-lg-8 col-md-7">
						<div className="card my-3 my-lg-5">
							<div className="card-body table-responsive-sm">
								<h3>Checked Your Products</h3>

								<div className="my-3">
									<CheckoutItem
										currency={currency}
										cart={cart}
										cartItems={cartItems}
										shippingRate={shippingRate}
										removeCart={removeCart}
										removeItemFromCart={removeItemFromCart}/>
								</div>

							</div>
						</div>
					</div>

					<aside className="col-lg-4 col-md-5">
						<CheckoutSidebar
							cart={cart}
							cartItems={cartItems}
							settings={settings}
						/>
					</aside>
				</div>
				{/* End .row */}
			</div>
			{/* End .container */}
		</main>
	);
};


export default Checkout;
