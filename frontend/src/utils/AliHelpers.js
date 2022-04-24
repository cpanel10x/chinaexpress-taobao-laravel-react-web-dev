import Swal from "sweetalert2";


export const aliItemPriceFromString = (price) => {
	const priceArray = isNaN(Number(price)) ? price.split(" - ") : [];
	return priceArray?.length > 0 ? Math.round(Number(priceArray[0])) : Math.round(Number(price));
};

export const wishListProcessProduct = (product, aliRate) => {
	let price = aliItemPriceFromString(product?.item?.price || '');
	let promotion_price = aliItemPriceFromString(product?.item?.promotion_price || '');
	return {
		name: product?.item?.title,
		ItemId: product?.item?.num_iid,
		provider_type: 'aliexpress',
		img: product?.item?.images?.[0],
		rating: null,
		sale_price: price * parseInt(aliRate),
		regular_price: promotion_price * parseInt(aliRate),
		stock: product?.item?.stock,
		total_sold: product?.item?.sales,
	}
};


export const urlSearchParams = (fullUrl) => {
	const urlSearchParams = new URLSearchParams(fullUrl);
	return Object.fromEntries(urlSearchParams.entries());
};

export const aliProductConvertionPrice = (Amount, aliRate) => {
	return Math.round(Number(Amount) * Number(aliRate));
};


export const aliActiveConfigurations = (product, operationalAttributes) => {
	const skuList = product?.item?.skus?.skuMap || {};
	const skuProps = product?.item?.skus?.props || [];
	let query = '';
	skuProps.map((prop) => {
		const item = operationalAttributes[prop.name];
		query += `${prop?.pid}:${item?.vid};`;
	});
	query = query.substring(0, query.length - 1);
	let cardPrice = skuList?.[query];
	if (!cardPrice) {
		cardPrice = {
			stock: product?.item?.stock,
			price: product?.item?.price,
			promotion_price: product?.item?.promotion_price,
		}
	}
	cardPrice.skuPropIds = query;
	return cardPrice;
};


const aliProductPriceCardToPrice = (priceCard, aliRate) => {
	const minPrice = priceCard?.promotion_price || 0;
	const maxPrice = priceCard?.price || 0;
	const price = minPrice ? Math.round(Number(minPrice) * Number(aliRate)) : Math.round(Number(maxPrice) * Number(aliRate));
	return price;
}


export const aliProductProcessToCart = (product, priceCard, aliRate) => {
	const price = aliProductPriceCardToPrice(priceCard, aliRate);
	return {
		Id: product?.item?.num_iid,
		ProviderType: 'aliexpress',
		Title: product?.item?.title,
		TaobaoItemUrl: product?.item?.product_url,
		MainPictureUrl: product?.item?.images?.[0] || '',
		MasterQuantity: product?.item?.stock,
		FirstLotQuantity: null,
		NextLotQuantity: null,
		Price: price,
		Quantity: 1,
		IsCart: false
	}
};


export const aliProductConfiguration = (product, priceCard, operationalAttributes, aliRate) => {
	const attributesProps = product?.item?.skus?.props || [];
	let configItem = {};
	configItem.Id = priceCard?.skuPropIds || product?.item?.num_iid;
	configItem.qty = 1;
	configItem.maxQuantity = priceCard?.stock;
	configItem.price = aliProductPriceCardToPrice(priceCard, aliRate);

	let attributes = [];
	attributesProps?.map(item => {
		const attribute = operationalAttributes[item?.name];
		attributes.push({
			Id: item?.pid,
			Pid: attribute?.vid,
			PropertyName: item?.name,
			Value: attribute?.name,
			ImageUrl: attribute?.image || null,
		});
	});
	configItem.Attributes = attributes;
	return configItem;
};


export const sumCartItemTotal = (variations) => {
	return variations.reduce((sum, {price, qty}) => sum + parseInt(price) * parseInt(qty), 0)
}


export const sumCartItemTotalQuantity = (variations) => {
	return variations.reduce((sum, {price, qty}) => sum + parseInt(qty), 0)
}


export const itemIsCheckWillProcess = (cartItem, settings) => {
	const min_order_amount = settings?.min_order_amount || 0;
	const ali_min_order_value = settings?.ali_min_order_value || 0;
	const express_shipping_min_value = settings?.express_shipping_min_value || 0;
	let process = true;
	let minOrder = min_order_amount;
	if (cartItem?.ProviderType === 'aliexpress') {
		minOrder = ali_min_order_value;
		if (cartItem?.shipping_type === 'express') {
			minOrder = express_shipping_min_value;
		}
	}
	const checkedVariations = cartItem?.variations?.filter(variation => parseInt(variation.is_checked) === 1);
	const itemTotal = sumCartItemTotal(checkedVariations);
	if (Number(itemTotal) < Number(minOrder)) {
		process = false;
	}
	console.log('itemTotal', itemTotal)
	return {process, minOrder};
};


export const itemValidateWillPayment = (cartItems, settings) => {
	const currency = settings?.currency_icon;
	let process = true;
	for (let i = 0; i < cartItems.length; i++) {
		const product = cartItems[i];
		const {process: willProcess, minOrder} = itemIsCheckWillProcess(product, settings);
		const Title = product?.Title;
		if (!willProcess) {
			Swal.fire({
				icon: 'info',
				html:
					`<b>Product value must be greater than ${currency} ${minOrder}</b> </br>` +
					`<p class="text-danger mb-0">${Title}</p>`,
				confirmButtonText: 'Ok, Understood',
			});
			process = false;
			break;
		}
	}

	return process;
};





