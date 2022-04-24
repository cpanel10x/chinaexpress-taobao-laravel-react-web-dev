import React from 'react';
import {useAliProductDescription} from "../../../../../../api/AliExpressProductApi";

const AliProductDescription = (props) => {
	const {product} = props;

	const descriptionModule = product?.item?.desc?.url;

	// const {data: description, isLoading} = useAliProductDescription(descriptionModule);

	if (!descriptionModule) {
		return '';
	}

	return (
		<div className="product-desc-content descriptionModule">
			<div className="embed-responsive embed-responsive-4by3">
				<iframe className="embed-responsive-item" src={descriptionModule}/>
			</div>
		</div>
	);
};

export default AliProductDescription;