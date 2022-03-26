import React from "react";
import SectionProductCard from "../card/SectionProductCard";
import {useRelatedProducts} from "../../../api/ProductApi";

const RelatedProduct = (props) => {
	const {item_id} = props;

	const {data: relatedProducts, isLoading} = useRelatedProducts(item_id);


	return (
		<div className="product-sidebar mb-3">
			<div className="row">
				{relatedProducts?.map((product, index) => (
					<SectionProductCard key={index} product={product}/>
				))}
			</div>
		</div>
	);
};

export default RelatedProduct;
