import React from "react";
import {useCartMutation} from "../../../../../api/CartApi";
import AliManageQuantity from "./includes/AliManageQuantity";
import swal from 'sweetalert';
import {aliActiveConfigurations, aliProductConfiguration, aliProductProcessToCart} from "../../../../../utils/AliHelpers";
import AliAddToCartButton from "./includes/AliAddToCartButton";

const AliQuantityInput = (props) => {
	const {cart, product, settings, shipment, selectShipping, operationalAttributes} = props;

	const {data: shipingInfo} = shipment;
	const priceCard = aliActiveConfigurations(product, operationalAttributes);

	const {addToCart: {mutateAsync, isLoading}} = useCartMutation();

	const aliRate = settings?.ali_increase_rate || 88;
	const weight = shipingInfo?.packageInfo?.weight || 0;

	const processProduct = aliProductProcessToCart(product, priceCard, aliRate);
	processProduct.weight = Number(weight).toFixed(3);
	processProduct.DeliveryCost = selectShipping;
	processProduct.Quantity = 1;
	processProduct.hasConfigurators = true;

	const ConfiguredItems = aliProductConfiguration(product, priceCard, operationalAttributes, aliRate);
	processProduct.ConfiguredItems = ConfiguredItems;

	const Quantity = priceCard?.skuVal?.availQuantity || 0;

	const addToCartProcess = (e) => {
		e.preventDefault();
		let process = false;
		if (ConfiguredItems?.Id) {
			if (ConfiguredItems?.qty > 0) {
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

	const configItem = cart?.cart_items?.find(findItem => findItem?.variations?.find(find => String(find.configId) === String(activeConfigId)));
	const cartConfiguredItem = configItem?.variations?.find(find => String(find.configId) === String(activeConfigId));

	if (!configItem || !cartConfiguredItem?.qty) {
		return (
			<AliAddToCartButton
				addToCartProcess={addToCartProcess}
				isLoading={isLoading}
				Quantity={Quantity}/>);
	}

	return (
		<AliManageQuantity
			cart={cart}
			configItem={configItem}
			cartConfiguredItem={cartConfiguredItem}
			Quantity={Quantity}
			product={product}
		/>
	);
};


export default AliQuantityInput;
