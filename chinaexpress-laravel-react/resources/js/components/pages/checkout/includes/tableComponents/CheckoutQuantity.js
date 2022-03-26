import React from 'react';
import swal from "sweetalert";
import {useQueryClient} from "react-query";
import {updateCustomerCart} from '../../../../api/Queries';
import SpinnerButtonLoader from '../../../../loader/SpinnerButtonLoader';

const CheckoutQuantity = (props) => {
	const {product, variation} = props;

	const cache = useQueryClient();
	const {isLoading, mutateAsync} = updateCustomerCart();

	let maxQuantity = variation?.maxQuantity;

	const updateCustomerCartQuantity = (newQty) => {
		let Max = maxQuantity ? parseInt(maxQuantity) : 0;
		let proceed = true;
		if (parseInt(newQty) > Max) {
			proceed = false;
			swal({
				text: 'Maximum quantity already selected',
				icon: "warning",
				buttons: "Ok, Understood",
			});
		}
		if (proceed) {
			const updateData = {
				cart_id: product?.cart_id,
				item_id: product?.id,
				variation_id: variation?.id,
				qty: parseInt(newQty),
			};
			mutateAsync(updateData, {
				onSuccess: (responseData) => {
					if (responseData?.status) {
						cache.setQueryData('customer_cart', (responseData?.cart || {}));
					}
				}
			});
		}
	};

	const incrementDecrement = (proQty, qtyType = null) => {
		let calculateQty = proQty;
		if (qtyType === 'minus') {
			calculateQty = parseInt(proQty) - 1;
		} else {
			calculateQty = parseInt(proQty) + 1;
		}
		updateCustomerCartQuantity(calculateQty);
	};

	return (
		<div className="input-group input-group-sm">
			<div className="input-group-prepend">
				<button
					type="button"
					onClick={() => incrementDecrement(variation.qty, 'minus')}
					className="btn btn-default"
				>
					<i className="icon-minus"/>
				</button>
			</div>
			<input
				type="text"
				className="form-control text-center"
				value={variation.qty}
				onChange={e => updateCustomerCartQuantity(e.target.value)}
				min={1}
				max={variation.maxQuantity}
				step={1}
				required={true}
			/>
			<div className="input-group-append">
				<button
					type="button"
					onClick={() => incrementDecrement(variation.qty)}
					className="btn btn-default"
				>
					<i className="icon-plus"/>
				</button>
			</div>
		</div>
	);
};

export default CheckoutQuantity;