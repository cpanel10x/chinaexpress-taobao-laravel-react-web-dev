import React from 'react';
import {useAliProductShippingInfo} from "../../../../../api/AliExpressProductApi";
import {aliProductConvertionPrice} from "../../../../../utils/AliHelpers";

const AliShipmentInfo = props => {
	const {shipment, settings} = props;

	const {data: shipingInfo, isLoading} = shipment;

	const currency = settings?.currency_icon || '৳';
	const aliRate = settings?.ali_increase_rate || 88;

	if (shipment.isLoading) {
		return 'loading shipping...';
	}

	const freightResult = shipingInfo?.freightResult;

	if (!freightResult?.length) {
		return '';
	}

	return (
		<div className="form-group">
			<label htmlFor="shipping_method">Shipping Method:</label>
			{
				<select className="form-control" id="shipping_method">
					{
						freightResult?.map((freight, key) =>
							<option
								value="1"
								key={key}>
								{`${freight.company} (${freight?.time} Days) | ${currency + ' ' + aliProductConvertionPrice(freight?.freightAmount?.value, aliRate)}`}
							</option>
						)
					}
				</select>
			}
		</div>
	);
};


export default AliShipmentInfo;
