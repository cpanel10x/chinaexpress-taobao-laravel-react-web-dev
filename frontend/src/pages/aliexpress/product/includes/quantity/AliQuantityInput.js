import React from "react";
import {useAddToCart, useCartMutation} from "../../../../../api/CartApi";
import AliManageQuantity from "./includes/AliManageQuantity";
import Swal from "sweetalert2";
import {
	aliActiveConfigurations,
	aliProductConfiguration,
	aliProductConvertionPrice,
	aliProductProcessToCart
} from "../../../../../utils/AliHelpers";
import AliAddToCartButton from "./includes/AliAddToCartButton";
import {useQueryClient} from "react-query";

const AliQuantityInput = (props) => {
	const {cartItem, product, settings, activeShipping, selectShipping, operationalAttributes} = props;

	const priceCard = aliActiveConfigurations(product, operationalAttributes);

	const cache = useQueryClient();
	const {mutateAsync, isLoading} = useAddToCart();

	const aliRate = settings?.ali_increase_rate || 88;
	const weight = product?.delivery?.packageDetail?.weight || 0;

	const DeliveryCost = () => {
		const amount = selectShipping?.delivery_fee || 0;
		return aliProductConvertionPrice(amount, aliRate);
	};

	const processProductData = () => {
		const processProduct = aliProductProcessToCart(product, priceCard, aliRate);
		processProduct.weight = Number(weight).toFixed(3);
		processProduct.DeliveryCost = DeliveryCost();
		processProduct.Quantity = 1;
		processProduct.shipping_type = activeShipping;
		processProduct.hasConfigurators = true;
		processProduct.ConfiguredItems = aliProductConfiguration(product, priceCard, operationalAttributes, aliRate);
		return processProduct;
	};

	const Quantity = priceCard?.stock || 0;

	const addToCartProcess = (e) => {
		e.preventDefault();
		const processProduct = processProductData();
		let process = false;
		if (processProduct?.ConfiguredItems?.Id) {
			if (Quantity > 0) {
				process = true;
			} else {
				Swal.fire({
					text: 'This variations stock is not available',
					icon: 'info'
				});
			}
		}
		if (process) {
			mutateAsync({product: processProduct},{
				onSuccess: (cart)=>{
					cache.setQueryData("customer_cart", cart);
				}
			});
		}
	};

	const activeConfigId = priceCard?.skuPropIds || product?.item?.num_iid;
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
