import React from 'react';
import {useCheckedUnchecked} from "../../../../api/CartApi";
import SmallSpinner from "../../../../loader/SmallSpinner";
import {useQueryClient} from "react-query";
import Swal from "sweetalert2";
import {itemIsCheckWillProcess, sumCartItemTotal} from "../../../../utils/AliHelpers";

const AllCheck = (props) => {
	const {cart, cartItems, settings} = props;

	const cache = useQueryClient();
	const {mutateAsync, isLoading} = useCheckedUnchecked();

	const variations_count = cart?.variations_count || 0;

	const currency = settings?.currency_icon;

	const checkedItems = () => {
		let totalChecked = 0;
		cartItems?.map(item => {
			item.variations.map(variation => {
				if (variation?.is_checked > 0) {
					totalChecked += 1;
				}
			});
		});
		return parseInt(totalChecked);
	};

	const isAllChecked = checkedItems() > 0 ? (checkedItems() === parseInt(variations_count)) : false;

	const checkedAllItem = (event) => {
		let thisIsChecked = event.target.checked;
		let process = true;
		if (thisIsChecked) {
			for (let i = 0; i < cartItems.length; i++) {
				const product = cartItems[i];
				const {process: willProcess, minOrder} = itemIsCheckWillProcess(product, settings);
				const Title = product?.Title;
				if (!willProcess) {
					Swal.fire({
						icon: 'info',
						html:
							`<b>Product total must be greater than ${currency} ${minOrder}</b> </br>` +
							`<p class="text-danger mb-0">${Title}</p>`,
						confirmButtonText: 'Ok, Understood',
					});
					process = false;
					break;
				}
			}
		}

		if (process) {
			const checked = isAllChecked ? '0' : '1';
			return mutateAsync(
				{checked},
				{
					onSuccess: (cart) => {
						cache.setQueryData("useCheckoutCart", cart);
					}
				});
		}
		return '';
	};

	return (
		<div className="d-inline">
			{
				isLoading ?
					<SmallSpinner/>
					:
					<div className=" m-0 pretty p-default p-round">
						<input type="checkbox"
						       id="checked_all"
						       checked={isAllChecked}
						       onChange={event => checkedAllItem(event)}/>
						<div className="state">
							<label htmlFor={`checked_all`}>Select all</label>
						</div>
					</div>
			}
		</div>
	);
};

export default AllCheck;