import React from 'react';
import {useCartMutation} from "../../../../api/CartApi";
import SmallSpinner from "../../../../loader/SmallSpinner";

const ItemCheck = (props) => {
	const {product, variation} = props;

	const {checkedUnchecked: checkbox} = useCartMutation();

	const isChecked = variation?.is_checked > 0;

	const checkedItem = async (e) => {
		const checked = isChecked ? '0' : '1';
		const variation_id = variation?.id || null;
		return checkbox.mutateAsync({variation_id: variation_id, checked: checked});
	};

	return (
		<div>
			{
				checkbox.isLoading ?
					<SmallSpinner/>
					: (
						<div className="pretty p-default p-round">
							<input type="checkbox"
							       checked={isChecked}
							       onChange={(e) => checkedItem(e)}/>
							<div className="state">
								<label htmlFor={`product_${product.id}`}/>
							</div>
						</div>
					)
			}
		</div>
	);
};

export default ItemCheck;