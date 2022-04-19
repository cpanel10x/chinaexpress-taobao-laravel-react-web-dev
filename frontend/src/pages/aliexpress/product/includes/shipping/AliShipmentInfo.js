import {aliProductConvertionPrice, sumCartItemTotal} from "../../../../../utils/AliHelpers";
import {useEffect, useState} from "react";
import {useChooseShipping} from "../../../../../api/AliExpressProductApi";
import Swal from "sweetalert2";
import {useQueryClient} from "react-query";
import ShippingModal from "./includes/ShippingModal";

const AliShipmentInfo = props => {
	const {cartItem, product, shipment, settings, selectShipping, setSelectShipping} = props;
	const [activeShipping, setActiveShipping] = useState('regular');
	const [optionEnable, setOptionEnable] = useState(false);

	const cache = useQueryClient();
	const {mutateAsync, isLoading} = useChooseShipping();

	const itemTotal = sumCartItemTotal(cartItem?.variations || []);
	const currency = settings?.currency_icon || '৳';
	const item_id = product?.product_id;

	let aliRate = settings?.ali_increase_rate || 0;
	aliRate = aliRate ? parseInt(aliRate) : 90;
	let minOrder = settings?.express_shipping_min_value || 0;
	minOrder = minOrder ? parseInt(minOrder) : 300;

	const isExpressEnable = itemTotal >= minOrder;

	const freightResult = shipment?.freightResult;

	useEffect(() => {
		if (!selectShipping && freightResult?.length > 0) {
			setSelectShipping(freightResult?.[0]);
		}
	}, [freightResult, setSelectShipping]);

	const shippingRate = (amount) => {
		return aliProductConvertionPrice(amount, aliRate);
	};

	const updateShippingInformation = (updateData) => {
		mutateAsync(
			{item_id, ...updateData},
			{
				onSuccess: () => {
					cache.invalidateQueries("customer_cart");
				}
			});
	};

	useEffect(() => {
		if (!isExpressEnable) {
			const shipping_cost = shippingRate(selectShipping?.freightAmount?.value || 0);
			updateShippingInformation({shipping_cost, shipping_type: activeShipping});
			setActiveShipping('regular');
		}
	}, [isExpressEnable]);


	const selectShippingMethod = (event) => {
		const value = event.target.value;
		if (value === 'regular') {
			setActiveShipping(value);
			const shipping_cost = shippingRate(selectShipping?.freightAmount?.value || 0);
			updateShippingInformation({shipping_cost, shipping_type: value});
		} else if (value === 'express') {
			if (isExpressEnable) {
				setActiveShipping(value);
				updateShippingInformation({shipping_type: value});
			} else {
				Swal.fire({
					text: `For Express shipping min product value ${currency} ${minOrder}`,
					icon: 'warning',
					confirmButtonText: 'Ok, Dismiss'
				});
				setActiveShipping('regular');
			}
		}else{
			setActiveShipping(null);
		}
		return '';
	};

	const toggleChoseOption = (event, option = true) => {
		event.preventDefault();
		setOptionEnable(option);
	};

	const updateDeliveryCharge = (shipping) => {
		setSelectShipping(shipping);
		const shipping_cost = shippingRate(shipping?.freightAmount?.value || 0);
		updateShippingInformation({shipping_cost, shipping_type: activeShipping});
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
					<label className={`form-check-label ${isExpressEnable && 'font-weight-bold'}`} htmlFor="express">Express Shipping </label>
				</div>
			</div>
			{
				activeShipping === 'regular' && freightResult?.length > 0 &&
				<div>
					{
						optionEnable &&
						<ShippingModal
							currency={currency}
							freightResult={freightResult}
							shippingRate={shippingRate}
							selectShipping={selectShipping}
							updateDeliveryCharge={updateDeliveryCharge}
							setOptionEnable={setOptionEnable}
						/>
					}

					<div className="list-group-item list-group-item-action p-2 rounded">
						<h5 className="mb-1">{`${selectShipping.company}`}</h5>
						<div className="d-flex w-100 justify-content-between">
							<div>
								<p className="mb-1">Shipping Rate: {`${currency} ` + shippingRate(selectShipping?.freightAmount?.value)}</p>
								<small>{`Estimated duration: ${selectShipping?.time} Days`}</small>
							</div>
							<div>
								<a href="#"
								   onClick={event => toggleChoseOption(event)}
								   className="small">
									More Option <i className="icon-down-open"/>
								</a>
							</div>
						</div>
					</div>
				</div>
			}
		</div>
	);
};


export default AliShipmentInfo;
