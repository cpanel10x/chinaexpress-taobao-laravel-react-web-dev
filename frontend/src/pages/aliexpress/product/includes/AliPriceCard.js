import React from 'react';

const AliPriceCard = (props) => {
	const {product, settings, activeConfiguredItems} = props;


	const currency = settings?.currency_icon || '৳';
	const rate = settings?.increase_rate || 15;

	const priceModule = product?.priceModule;


	const discount = 100 - (priceModule?.formatedActivityPrice / priceModule?.formatedPrice * 100);

	return (
		<div className="card mb-3 pricing_card">
			<div className="card-body">
				<div>
					<span>{currency + ' ' + priceModule?.formatedActivityPrice}</span>
					{
						Number(discount) > 0 &&
						<del className="ml-3">{currency + ' ' + priceModule?.formatedPrice}</del>
					}
				</div>
				{
					Number(discount) > 0 &&
					<div className="discount_box">
						{Math.round(discount)}% Discount
					</div>
				}
			</div>
		</div>
	);
};

export default AliPriceCard;