import {aliProductConvertionPrice} from "../../../../../utils/AliHelpers";
import {useEffect} from "react";

const AliShipmentInfo = props => {
	const {shipment, settings, selectShipping, setSelectShipping} = props;

	const {data: shipingInfo, isLoading} = shipment;

	const currency = settings?.currency_icon || '৳';
	const aliRate = settings?.ali_increase_rate || 88;
	const freightResult = shipingInfo?.freightResult;

	useEffect(() => {
		if (!selectShipping && freightResult?.length > 0) {
			const amount = shippingRate(freightResult?.[0]?.freightAmount?.value);
			setSelectShipping(amount);
		}

	}, [freightResult, selectShipping]);

	if (shipment.isLoading) {
		return 'loading shipping...';
	}


	if (!freightResult?.length) {
		return '';
	}

	const shippingRate = (amount) => {
		const calculateAmount = aliProductConvertionPrice(amount, aliRate);
		if (!selectShipping) {
			setSelectShipping(calculateAmount);
		}
		return calculateAmount;
	};

	return (
		<div className="form-group">
			<label htmlFor="shipping_method">Shipping Method:</label>
			{
				<select
					className="form-control"
					onChange={e => setSelectShipping(e.target.value)}
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
	);
};


export default AliShipmentInfo;
