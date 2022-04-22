import React from 'react';
import parser from "html-react-parser";
import {useAliProductDescription} from "../../../../../../api/AliExpressProductApi";

const AliProductDescription = (props) => {
	const {product} = props;

	const descriptionModule = product?.descriptionModule?.descriptionUrl;

	const {data: description, isLoading} = useAliProductDescription(descriptionModule);

	if (!descriptionModule) {
		return '';
	}

	return (
		<div className="product-desc-content">
			<div className="table-responsive">
				{description && parser(description)}
			</div>
		</div>
	);
};

export default AliProductDescription;