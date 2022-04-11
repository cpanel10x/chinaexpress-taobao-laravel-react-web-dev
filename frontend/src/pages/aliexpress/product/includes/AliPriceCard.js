import React from 'react';

const AliPriceCard = (props) => {
	const {product, settings, activeConfiguredItems} = props;


	const currency = settings?.currency_icon || '৳';
	const aliRate = settings?.ali_increase_rate || 15;

	const priceModule = product?.metadata?.priceModule || {};


	const minActivityAmount = priceModule?.minActivityAmount?.value;
	const minAmount = priceModule?.minAmount?.value;
	const maxActivityAmount = priceModule?.maxActivityAmount?.value;
	const maxAmount = priceModule?.maxAmount?.value;
	const discount = priceModule?.discount;

	const multiPlyAmount = (Amount) => {
		return Math.round(Number(Amount) * Number(aliRate));
	};


	const formatedDiscountedPrice = () => {
		let amount = 0;
		if (minActivityAmount) {
			amount = `${currency} ${multiPlyAmount(minActivityAmount)}`;
		}
		if (maxActivityAmount) {
			amount += ` - ${currency} ${multiPlyAmount(maxActivityAmount)}`;
		}
		return amount;
	};

	const formatedRegularMaxPrice = () => {
		let amount = 0;
		if (minAmount) {
			amount = `${currency} ${multiPlyAmount(minAmount)}`;
		}
		if (maxAmount) {
			amount += ` - ${currency} ${multiPlyAmount(maxAmount)}`;
		}
		return amount;
	};

	return (
		<div className="card mb-3 pricing_card">
			<div className="card-body">
				<div>
					<span>{formatedDiscountedPrice()}</span>
					{
						parseInt(discount) > 0 &&
						<del className="ml-3">{formatedRegularMaxPrice()}</del>
					}
				</div>
				{
					parseInt(discount) > 0 &&
					<div className="discount_box">
						{Math.round(discount)}% Discount
					</div>
				}
			</div>
		</div>
	);
};

export default AliPriceCard;