import React from 'react';
import {aliActiveConfigurations, aliProductConvertionPrice} from "../../../../../utils/AliHelpers";

const AliProductSummary = (props) => {
	const {cartItem, product, selectShipping, settings, operationalAttributes} = props;
	const priceCard = aliActiveConfigurations(product, operationalAttributes);
	const skuActivityAmount = priceCard?.skuVal?.skuActivityAmount?.value || 0;

	const currency = settings?.currency_icon || '৳';
	const aliRate = settings?.ali_increase_rate || 88;
	const isExpress = false;
	const activePrice = aliProductConvertionPrice(skuActivityAmount, aliRate);
	const totalActivePrice = parseInt(activePrice) + (selectShipping ? parseInt(selectShipping) : 0);

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
					<td className="w-50">Products Price</td>
					<td className="w-50">{`${currency} ${activePrice}`}</td>
				</tr>
				<tr>
					<td className="w-50">Shipping charge</td>
					<td className="w-50">{`${currency} ${selectShipping}`}</td>
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