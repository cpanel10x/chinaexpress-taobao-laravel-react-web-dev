import React, {useEffect} from 'react';
import {aliProductConvertionPrice, sumCartItemTotal, sumCartItemTotalQuantity} from "../../../../../utils/AliHelpers";
import {useAliProductWeight} from "../../../../../api/AliExpressProductApi";
import {useQueryClient} from "react-query";

const AliProductSummary = (props) => {
	const {cartItem, product, settings, operationalAttributes} = props;

	const cache = useQueryClient();
	const {mutateAsync, isLoading} = useAliProductWeight();

	const currency = settings?.currency_icon || '৳';
	const isExpress = false;
	const DeliveryCost = cartItem?.DeliveryCost || 0;

	useEffect(() => {
		if (cartItem?.shipping_type === 'express' && !Number(cartItem.weight)) {
			mutateAsync(
				{cart_item_id: cartItem?.id, ItemId: cartItem?.ItemId},
				{
					onSuccess: () => {
						cache.invalidateQueries("customer_cart");
					}
				}
				);
		}
	}, [cartItem]);

	const itemTotal = sumCartItemTotal(cartItem?.variations || []);
	const quantity = sumCartItemTotalQuantity(cartItem?.variations || []);
	const totalActivePrice = parseInt(itemTotal) + parseInt(DeliveryCost);

	if (cartItem?.shipping_type === 'express') {
		return (
			<div>
				<table className="table table-bordered">
					<tbody>
					<tr>
						<td className="w-50">Total Quantity</td>
						<td className="w-50">{`${quantity}`}</td>
					</tr>
					<tr>
						<td className="w-50">Weight</td>
						<td className="w-50">{(Number(cartItem.weight) * Number(quantity)).toFixed(3)}kg</td>
					</tr>
					<tr>
						<td className="w-50">China Delivery charge</td>
						<td className="w-50">{`${currency} ${DeliveryCost}`}</td>
					</tr>
					<tr>
						<td className="w-50">Express Shipping rate</td>
						<td className="w-50">{`${currency} ${cartItem?.shipping_rate ? cartItem.shipping_rate : 0} per kg`}</td>
					</tr>
					<tr>
						<td className="w-50">Total Product Price:</td>
						<td className="w-50">{`${currency} ${totalActivePrice}`}</td>
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
					<td className="w-50">{`${currency} ${DeliveryCost}`}</td>
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