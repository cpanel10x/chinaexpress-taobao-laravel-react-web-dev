import React from 'react';
import ProductDetailsSkeleton from "../../../../skeleton/productSkeleton/ProductDetailsSkeleton";
import {isEmpty} from "lodash";
import SectionProductCard from "../../../product/card/SectionProductCard";

const AliRelatedProduct = props => {
	const productId = props?.productId;

	// const {resData, isLoading} = SwrGetRequest(
	//     productId ? `/default/aliexpress/related-products/${productId}` : null
	// );
	const resData = {};
	const isLoading = false;

	if (isLoading) {
		return <ProductDetailsSkeleton/>;
	}

	const products = resData?.data?.result;

	if (isEmpty(products)) {
		return 'Product will be loaded soon';
	}

	return (
		<div className="product-sidebar p-0">

			<div className="row">
				{products.map((product, index) => (
					<SectionProductCard key={index} product={product}/>
				))}
			</div>

		</div>
	);
};


export default AliRelatedProduct;
