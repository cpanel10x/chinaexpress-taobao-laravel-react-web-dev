import React from 'react';

const AliSellerInfo = (props) => {
	const {product} = props;

	const productId = product?.product_id;
	const feedBackRating = product?.feedBackRating;
	const category_id = product?.first_level_category_id;
	const productCategoriesBreadcrumb = product?.productCategoriesBreadcrumb?.find(find => find.cateId === category_id);
	const metadata = product?.metadata;
	const storeModule = metadata?.storeModule;

	return (
		<div className="product-details-action mt-3">
			<p className="mb-1"><b>Product ID:</b> <span className="text-danger">{productId}</span></p>
			<p className="mb-1"><b>Source:</b> <span className="text-danger">AliExpress</span></p>
			<p className="mb-1"><b>Seller Name:</b> <span className="text-danger">{storeModule?.storeName}</span></p>
			{
				productCategoriesBreadcrumb?.name &&
				<p className="mb-1"><b>Category:</b> <span className="text-danger">{productCategoriesBreadcrumb?.name}</span></p>
			}
			{/*<p className="mb-1"><b>Item as Described:</b> <span className="text-danger">A</span></p>*/}
			{/*<p className="mb-1"><b>Communication:</b> <span className="text-danger">A</span></p>*/}
			{/*<p className="mb-1"><b>Shipping Speed:</b> <span className="text-danger">A</span></p>*/}
		</div>
	);
};

export default AliSellerInfo;