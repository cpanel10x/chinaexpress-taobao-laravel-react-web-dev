import React from 'react';

const AliAdditionalInformation = (props) => {
	const {product} = props;
	const specsModule = product?.specsModule?.props || [];


	return (
		<div className="border p-3 product-desc-content rounded">
			{
				specsModule.map((specs, index) =>
					<div className="row" key={index}>
						<div className="col-md-3 col-6"><b>{specs.attrName}</b></div>
						<div className="col-md-9 col-6">
							{specs.attrValue}
						</div>
						<div className="col-md-12">
							<hr className="my-2"/>
						</div>
					</div>
				)
			}
		</div>
	);
};

export default AliAdditionalInformation;