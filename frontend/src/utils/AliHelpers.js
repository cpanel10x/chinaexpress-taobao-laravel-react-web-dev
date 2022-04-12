



export const aliProductConvertionPrice = (Amount, aliRate) => {
	return Math.round(Number(Amount) * Number(aliRate));
};






export const aliActiveConfigurations = (product, operationalAttributes) => {
	const skuList = product?.skuList || [];
	let query = '';
	for (const operation in operationalAttributes) {
		if (operation !== 'ShipsFrom') {
			const item = operationalAttributes[operation];
			query += `${item.propertyValueIdLong},`;
		}
	}
	const skuKey = query + operationalAttributes?.ShipsFrom?.propertyValueIdLong;
	const cardPrice = skuList.find(find => find.skuPropIds === skuKey);
	return cardPrice?.skuVal ? cardPrice : {};
};