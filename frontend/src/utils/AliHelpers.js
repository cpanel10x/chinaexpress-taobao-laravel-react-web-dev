export const wishListProcessProduct = (product, aliRate) => {
	const metadata = product?.metadata;
	const titleModule = metadata?.titleModule;
	const averageStar = titleModule?.feedbackRating?.averageStar || 0;
	const priceModule = metadata?.priceModule;
	const minActivityAmount = priceModule?.minActivityAmount?.value || 0;
	const minAmount = priceModule?.minAmount?.value || 0;
	return {
		name: titleModule?.product_title,
		ItemId: product?.product_id,
		provider_type: 'aliexpress',
		img: product?.product_small_image_urls?.string?.[0],
		rating: averageStar,
		sale_price: parseInt(minActivityAmount) * parseInt(aliRate),
		regular_price: parseInt(minAmount) * parseInt(aliRate),
		stock: product?.quantityObject?.totalAvailQuantity,
		total_sold: titleModule?.tradeCount,
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
	const skuList = product?.skuModule?.skuPriceList || [];
	let query = '';
	for (const operation in operationalAttributes) {
		const item = operationalAttributes[operation];
		query += `${item.propertyValueIdLong},`;
	}
	query = query.substring(0, query.length - 1);
	const cardPrice = skuList.find(find => find.skuPropIds === query);
	return cardPrice?.skuVal ? cardPrice : {};
};


const aliProductPriceCardToPrice = (priceCard, aliRate) => {
	const minPrice = priceCard?.skuVal?.skuActivityAmount?.value || 0;
	const maxPrice = priceCard?.skuVal?.skuAmount?.value || 0;
	const price = minPrice ? Math.round(Number(minPrice) * Number(aliRate)) : Math.round(Number(maxPrice) * Number(aliRate));
	return price;
}


export const aliProductProcessToCart = (product, priceCard, aliRate) => {
	const price = aliProductPriceCardToPrice(priceCard, aliRate);
	return {
		Id: product?.actionModule?.productId,
		ProviderType: 'aliexpress',
		Title: product?.titleModule?.subject,
		TaobaoItemUrl: product?.pageModule?.itemDetailUrl,
		MainPictureUrl: product?.imageModule?.imagePathList?.[0] || '',
		MasterQuantity: product?.quantityModule?.totalAvailQuantity,
		FirstLotQuantity: null,
		NextLotQuantity: null,
		Price: price,
		Quantity: 1,
		IsCart: false
	}
};


export const aliProductConfiguration = (product, priceCard, operationalAttributes, aliRate) => {
	let configItem = {};
	configItem.Id = priceCard?.skuPropIds || product?.actionModule?.productId;
	configItem.qty = 1;
	configItem.maxQuantity = priceCard?.skuVal?.availQuantity;
	configItem.price = aliProductPriceCardToPrice(priceCard, aliRate);
	let attributes = [];
	for (let attribute in operationalAttributes) {
		const item = operationalAttributes[attribute];
		attributes.push({
			Id: item?.propertyValueId,
			Pid: item?.propertyValueIdLong,
			PropertyName: attribute,
			Value: item?.propertyValueName,
			ImageUrl: item?.skuPropertyImagePath || null,
		});
	}
	configItem.Attributes = attributes;
	return configItem;
};


export const sumCartItemTotal = (cartItem) => {
	return cartItem.reduce((sum, {price, qty}) => sum + parseInt(price) * parseInt(qty), 0)
}


export const sumCartItemTotalQuantity = (cartItem) => {
	return cartItem.reduce((sum, {price, qty}) => sum + parseInt(qty), 0)
}