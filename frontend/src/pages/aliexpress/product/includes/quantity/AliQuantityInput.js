import React from "react";
import {useCartMutation} from "../../../../../api/CartApi";
import AliManageQuantity from "./includes/AliManageQuantity";
import swal from 'sweetalert';
import {
	aliActiveConfigurations,
	aliProductConfiguration,
	aliProductConvertionPrice,
	aliProductProcessToCart
} from "../../../../../utils/AliHelpers";
import AliAddToCartButton from "./includes/AliAddToCartButton";

const AliQuantityInput = (props) => {
	const {cartItem, product, settings, shipment, selectShipping, operationalAttributes} = props;

	const {data: shipingInfo} = shipment;
	const priceCard = aliActiveConfigurations(product, operationalAttributes);

	const {addToCart: {mutateAsync, isLoading}} = useCartMutation();

	const aliRate = settings?.ali_increase_rate || 88;
	const weight = shipingInfo?.packageInfo?.weight || 0;

	const DeliveryCost = () => {
		const amount = selectShipping?.freightAmount?.value || 0;
		return aliProductConvertionPrice(amount, aliRate);
	};

	const processProductData = () => {
		const processProduct = aliProductProcessToCart(product, priceCard, aliRate);
		processProduct.weight = Number(weight).toFixed(3);
		processProduct.DeliveryCost = DeliveryCost();
		processProduct.Quantity = 1;
		processProduct.hasConfigurators = true;
		processProduct.ConfiguredItems = aliProductConfiguration(product, priceCard, operationalAttributes, aliRate);
		return processProduct;
	};

	const Quantity = priceCard?.skuVal?.availQuantity || 0;

	const addToCartProcess = (e) => {
		e.preventDefault();
		const processProduct = processProductData();

		let process = false;
		if (processProduct?.ConfiguredItems?.Id) {
			if (Quantity > 0) {
				process = true;
			} else {
				swal({
					text: 'This variations stock is not available',
					icon: 'info'
				});
			}
		}
		if (process) {
			mutateAsync({product: processProduct});
		}
	};

	const activeConfigId = priceCard?.skuPropIds;

	const cartConfiguredItem = cartItem?.variations?.find(find => String(find.configId) === String(activeConfigId));

	if (!cartItem || !cartConfiguredItem?.qty) {
		return (
			<AliAddToCartButton
				addToCartProcess={addToCartProcess}
				isLoading={isLoading}
				Quantity={Quantity}/>);
	}

	return (
		<AliManageQuantity
			cartItem={cartItem}
			cartConfiguredItem={cartConfiguredItem}
			Quantity={Quantity}
			product={product}
		/>
	);
};


export default AliQuantityInput;
