import React from 'react';
import {aliProductConvertionPrice, sumCartItemTotal, sumCartItemTotalQuantity} from "../../../../../utils/AliHelpers";

const AliProductSummary = (props) => {
	const {cartItem, product, selectShipping, settings, operationalAttributes} = props;

	const currency = settings?.currency_icon || '৳';
	const aliRate = settings?.ali_increase_rate || 88;
	const isExpress = false;

	const shippingRate = () => {
		const amount = selectShipping.freightAmount?.value ?? 0;
		return aliProductConvertionPrice(amount, aliRate);
	};

	const itemTotal = sumCartItemTotal(cartItem?.variations || []);
	const quantity = sumCartItemTotalQuantity(cartItem?.variations || []);
	const totalActivePrice = parseInt(itemTotal) + shippingRate();

	if (isExpress) {
		return (
			<div>
				<table className="table table-bordered">
					<tbody>
					<tr>
						<td className="w-50">Weight</td>
						<td className="w-50">0.524kg</td>
					</tr>
					<tr>
						<td className="w-50">China Delivery charge</td>
						<td className="w-50">0.524kg</td>
					</tr>
					<tr>
						<td className="w-50">Express Shipping rate</td>
						<td className="w-50">232</td>
					</tr>
					<tr>
						<td className="w-50">Total Product Price:</td>
						<td className="w-50">650 Tk per kg</td>
					</tr>
					</tbody>
				</table>
			</div>
		);
	}


	return (
		<div>
			<table className="table table-bordered">
				<tbody>
				<tr>
					<td className="w-50">Total Quantity</td>
					<td className="w-50">{`${quantity}`}</td>
				</tr>
				<tr>
					<td className="w-50">Products Price</td>
					<td className="w-50">{`${currency} ${itemTotal}`}</td>
				</tr>
				<tr>
					<td className="w-50">Shipping charge</td>
					<td className="w-50">{`${currency} ${shippingRate()}`}</td>
				</tr>
				<tr>
					<td className="w-50">Total Product Price:</td>
					<td className="w-50">{`${currency} ${totalActivePrice}`}</td>
				</tr>
				</tbody>
			</table>
		</div>
	);
};

export default AliProductSummary;