import React from 'react';
import {useCartMutation} from "../../../../api/CartApi";
import SmallSpinner from "../../../../loader/SmallSpinner";

const AllCheck = (props) => {
	const {cart, cartItems} = props;

	const {checkedUnchecked} = useCartMutation();

	const variations_count = cart?.variations_count || 0;
	const checkedItems = () => {
		let totalChecked = 0;
		cartItems?.filter(item => {
			item.variations.map(variation => {
				if (variation?.is_checked > 0) {
					totalChecked += 1;
				}
			});
		});
		return parseInt(totalChecked);
	};

	const isAllChecked = checkedItems() > 0 ? (checkedItems() === parseInt(variations_count)) : false;

	const checkedAllItem = () => {
		const checked = isAllChecked ? '0' : '1';
		return checkedUnchecked.mutateAsync({checked: checked});
	};

	return (
		<div className="d-inline">
			{
				checkedUnchecked.isLoading ?
					<SmallSpinner/>
					:
					<div className=" m-0 pretty p-default p-round">
						<input type="checkbox"
						       id="checked_all"
						       checked={isAllChecked}
						       onChange={(e) => checkedAllItem(e)}/>
						<div className="state">
							<label htmlFor={`checked_all`}>Select all</label>
						</div>
					</div>
			}
		</div>
	);
};

export default AllCheck;