import React from 'react';
import {useCheckedUnchecked} from "../../../../api/CartApi";
import SmallSpinner from "../../../../loader/SmallSpinner";
import {useQueryClient} from "react-query";

const ItemCheck = (props) => {
	const {variation} = props;

	const cache = useQueryClient();
	const {mutateAsync, isLoading} = useCheckedUnchecked();

	const isChecked = variation?.is_checked > 0;

	const checkedItem = () => {

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