import React from 'react';
import parser from "html-react-parser";
import _ from "lodash";
import {SwrGetRequest} from "../../../../utils/SwrRequests";

const ShippingAndDelivery = () => {
	const {resData, isLoading} = SwrGetRequest(`/default/page/shipping-and-delivery`);

	if (isLoading) {
		return 'Loading...';
	}

	const page = resData?.data?.singles;

	return (
		<div className="product-desc-content">
			{
				page &&
				<div className="post-content">
					{parser(page?.post_content)}
				</div>
			}
		</div>
	);
};

export default ShippingAndDelivery;