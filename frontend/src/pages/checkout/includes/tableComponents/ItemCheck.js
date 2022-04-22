import React from 'react';
import {useCheckedUnchecked} from "../../../../api/CartApi";
import SmallSpinner from "../../../../loader/SmallSpinner";
import {useQueryClient} from "react-query";
import {itemIsCheckWillProcess, sumCartItemTotal} from "../../../../utils/AliHelpers";
import Swal from "sweetalert2";

const ItemCheck = (props) => {
	const {product, variation, settings} = props;

	const cache = useQueryClient();
	const {mutateAsync, isLoading} = useCheckedUnchecked();

	const currency = settings?.currency_icon;

	const isChecked = variation?.is_checked > 0;

	const willProcess = () => {
		let {process, minOrder} = itemIsCheckWillProcess(product, settings);
		const Title = product?.Title;
		if (!process) {
			Swal.fire({
				icon: 'info',
				html:
					`<b>Product total must be greater than ${currency} ${minOrder}</b> </br>` +
					`<p class="text-danger mb-0">${Title}</p>`,
				confirmButtonText: 'Ok, Understood',
			});
		}
		return process;
	};


	const checkedItem = () => {
		const process = willProcess();
		if (process) {
			const checked = isChecked ? '0' : '1';
			const variation_id = variation?.id || null;
			mutateAsync(
				{variation_id, checked},
				{
					onSuccess: (cart) => {
						cache.setQueryData("useCheckoutCart", cart);
					}
				}
			);
		}
	};

	// console.log('isChecked', variation)

	return (
		<div>
			{
				isLoading ?
					<SmallSpinner/>
					: (
						<div className="pretty p-default p-round">
							<input type="checkbox"
							       id={`variation_${variation.configId}`}
							       checked={isChecked}
							       onChange={() => checkedItem()}/>
							<div className="state">
								<label htmlFor={`variation_${variation.configId}`}/>
							</div>
						</div>
					)
			}
		</div>
	);
};

export default ItemCheck;