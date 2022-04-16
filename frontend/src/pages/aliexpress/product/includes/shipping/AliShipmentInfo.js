import {aliProductConvertionPrice, sumCartItemTotal} from "../../../../../utils/AliHelpers";
import {useEffect, useState} from "react";
import {useChooseShipping} from "../../../../../api/AliExpressProductApi";
import Swal from "sweetalert2";
import {useQueryClient} from "react-query";

const AliShipmentInfo = props => {
	const {cartItem, product, shipment, settings, selectShipping, setSelectShipping} = props;
	const [activeShipping, setActiveShipping] = useState('regular');

	const {data: shipingInfo} = shipment;

	const cache = useQueryClient();
	const {mutateAsync, isLoading} = useChooseShipping();

	const itemTotal = sumCartItemTotal(cartItem?.variations || []);
	const currency = settings?.currency_icon || '৳';

	let aliRate = settings?.ali_increase_rate || 0;
	aliRate = aliRate ? parseInt(aliRate) : 90;
	let minOrder = settings?.express_shipping_min_value || 0;
	minOrder = minOrder ? parseInt(minOrder) : 300;

	const freightResult = shipingInfo?.freightResult;

	useEffect(() => {
		if (!selectShipping && freightResult?.length > 0) {
			setSelectShipping(freightResult?.[0]);
		}
	}, [freightResult, setSelectShipping]);

	if (shipment.isLoading) {
		return 'loading shipping...';
	}

	const shippingRate = (amount) => {
		return aliProductConvertionPrice(amount, aliRate);
	};

	const selectShippingMethod = (event) => {
		const value = event.target.value;
		if (value === 'regular') {
			setActiveShipping(value);
			mutateAsync(
				{item_id: product?.product_id, shipping_type: value},
				{
					onSuccess: () => {
						cache.invalidateQueries("customer_cart");
					}
				});
		} else if (value === 'express') {
			if (itemTotal > minOrder) {
				setActiveShipping(value);
				mutateAsync(
					{item_id: product?.product_id, shipping_type: value},
					{
						onSuccess: () => {
							cache.invalidateQueries("customer_cart");
						}
					});
			} else {
				Swal.fire({
					text: `Your product minimum order value ${currency} ${minOrder}`,
					icon: 'warning',
					confirmButtonText: 'Ok, Dismiss'
				});
				setActiveShipping('regular');
			}
		}
		return '';
	};

	const updateDeliveryCharge = (event) => {
		const shippingValue = event.target.value;
	};

	return (
		<div className="mb-3">
			<div className="mb-2">
				{
					freightResult?.length > 0 &&
					<div className="form-check form-check-inline">
						<input className="form-check-input"
						       type="radio"
						       onChange={event => selectShippingMethod(event)}
						       checked={activeShipping === 'regular'}
						       name="shipping"
						       id="regular"
						       value="regular"/>
						<label className="form-check-label" htmlFor="regular">Regular Shipping</label>
					</div>
				}
				<div className="form-check form-check-inline">
					<input className="form-check-input"
					       type="radio"
					       onChange={event => selectShippingMethod(event)}
					       checked={activeShipping === 'express'}
					       name="shipping"
					       id="express"
					       value="express"/>
					<label className="form-check-label" htmlFor="express">Express Shipping</label>
				</div>
			</div>
			{
				activeShipping === 'regular' && freightResult?.length > 0 &&
				<div>
					{
						<select
							className="form-control"
							onChange={event => updateDeliveryCharge(event)}
							value={selectShipping}
							id="shipping_method">
							{
								freightResult?.map((freight, key) =>
									<option
										key={key}
										value={shippingRate(freight?.freightAmount?.value)}>
										{`${freight.company} (${freight?.time} Days) | ${currency + ' ' + shippingRate(freight?.freightAmount?.value)}`}
									</option>
								)
							}
						</select>
					}
				</div>
			}
		</div>
	);
};


export default AliShipmentInfo;
