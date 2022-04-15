import React, {useState} from 'react';
import Swal from 'sweetalert2'
import {useExpressSerciew} from "../../../../../api/AliExpressProductApi";
import ExpressPopup from "./includes/ExpressPopup";
import {sumCartItemTotal} from "../../../../../utils/AliHelpers";

const ExpressOption = (props) => {
	const {cartItem, product, settings} = props;
	const [showModal, setShowModal] = useState(false);

	const productId = product?.product_id;

	const itemTotal = sumCartItemTotal(cartItem?.variations || []);

	const processToExpress = () => {
		if (itemTotal) {
			setShowModal(true)
		} else {
			Swal.fire({
				text: 'Add your quantity first',
				icon: 'warning',
				confirmButtonText: 'Ok, Dismiss'
			});
		}
	};


	return (
		<>
			{
				showModal &&
				<ExpressPopup
					setShowModal={setShowModal}
					cartItem={cartItem}
					settings={settings}/>
			}
			<div className="product-details-action mt-3">
				{
					cartItem?.shipping_type === 'express' ?
						<button
							type="button"
							className="btn btn-block btn-express active"
						>
							<span>Get Express Service</span>
							<p className="small m-0">15-40 Days Delivery</p>
						</button>
						:
						<button
							type="button"
							onClick={() => processToExpress()}
							className="btn btn-block btn-express"
						>
							<span>Get Express Service</span>
							<p className="small m-0">15-40 Days Delivery</p>
						</button>
				}
			</div>
		</>
	);
};

export default ExpressOption;