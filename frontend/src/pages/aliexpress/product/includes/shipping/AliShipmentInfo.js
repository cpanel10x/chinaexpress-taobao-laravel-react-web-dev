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
			shippingRate(freightResult?.[0]?.freightAmount?.value);
		}
	}, [freightResult, selectShipping]);

	if (shipment.isLoading) {
		return 'loading shipping...';
	}


	const shippingRate = (amount) => {
		const calculateAmount = aliProductConvertionPrice(amount, aliRate);
		if (!selectShipping) {
			setSelectShipping(calculateAmount);
		}
		return calculateAmount;
	};

	return (
		<div className="mb-3">
			<div className="row align-items-center">
				<div className="col-md-2 col-3">
					<p className="m-0">Shipping:</p>
				</div>
				<div className="col-md-7 col-5">
					<p className="m-0">Chose a Shipping</p>
				</div>
				<div className="col-md-3 col-3">
					<a href="#" className="text-primary">
						Change <i className="icon-pencil"/>
					</a>
				</div>
			</div>
			<div className="form-group d-none">
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
		</div>
	);
};


export default AliShipmentInfo;
