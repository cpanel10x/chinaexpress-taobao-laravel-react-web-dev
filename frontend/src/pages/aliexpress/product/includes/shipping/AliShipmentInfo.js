import {aliProductConvertionPrice} from "../../../../../utils/AliHelpers";
import {useEffect, useState} from "react";
import ShippingModal from "./includes/ShippingModal";

const AliShipmentInfo = props => {
	const {shipment, settings, selectShipping, setSelectShipping} = props;
	const [optionEnable, setOptionEnable] = useState(false);

	const {data: shipingInfo, isLoading} = shipment;

	const currency = settings?.currency_icon || '৳';
	const aliRate = settings?.ali_increase_rate || 88;
	const freightResult = shipingInfo?.freightResult;

	useEffect(() => {
		if (!selectShipping && freightResult?.length > 0) {
			shippingRate(freightResult?.[0]);
		}
	}, [freightResult, selectShipping]);

	if (shipment.isLoading) {
		return 'loading shipping...';
	}

	const shippingRate = (amount) => {
		return aliProductConvertionPrice(amount, aliRate);
	};

	const toggleChoseOption = (event, option = true) => {
		event.preventDefault();
		setOptionEnable(option)
	};


	return (
		<div className="mb-3">

			{
				optionEnable &&
				<ShippingModal
					currency={currency}
					freightResult={freightResult}
					shippingRate={shippingRate}
					selectShipping={selectShipping}
					setSelectShipping={setSelectShipping}
					setOptionEnable={setOptionEnable}
				/>
			}

			<div className="row align-items-center">
				<div className="col-md-2 col-3">
					<p className="m-0">Shipping:</p>
				</div>
				<div className="col-md-7 col-5">
					{
						selectShipping ?
							<div>
								<p className="m-0">{selectShipping.company + ` | ${currency} ` + shippingRate(selectShipping?.freightAmount?.value)}</p>
								<p className="m-0">{`${selectShipping?.time} Days`}</p>
							</div>
							:
							<p className="m-0">Chose your shipping</p>
					}
				</div>
				<div className="col-md-3 col-4">
					<a href="#"
					   onClick={event => toggleChoseOption(event)}
					   className="small">
						More Option <i className="icon-down-open"/>
					</a>
				</div>
			</div>
		</div>
	);
};


export default AliShipmentInfo;
