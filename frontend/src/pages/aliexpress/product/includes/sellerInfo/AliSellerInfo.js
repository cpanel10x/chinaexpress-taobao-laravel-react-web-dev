import React from 'react';

const AliSellerInfo = (props) => {
	const {product} = props;

	const productId = product?.actionModule?.productId;
	const feedBackRating = product?.feedBackRating;
	const category_id = product?.first_level_category_id;
	const productCategoriesBreadcrumb = product?.productCategoriesBreadcrumb?.find(find => find.cateId === category_id);

	const storeModule = product?.storeModule;

	return (
		<div className="product-details-action mt-3">
			<p className="mb-1"><b>Product ID:</b> <span className="text-danger">{productId}</span></p>
			<p className="mb-1"><b>Source:</b> <span className="text-danger">AliExpress</span></p>

			<div className="card mt-3">
				<div className="card-body">
					<h3 style={{color: '#751f8a'}}><i className="icon-shop-window"/> {storeModule?.storeName}</h3>
					<div className="row">
						<div className="col-md-12">
							<p><b style={{color: '#751f8a'}}>{storeModule?.positiveRate}</b> <span className="ml-1">Positive Seller Ratings</span></p>
						</div>
						<div className="col-md-4">
							<a href="#" className="btn btn-block btn-default">Visit Store</a>
						</div>
					</div>
				</div>
			</div>

			{
				productCategoriesBreadcrumb?.name &&
				<p className="mb-1"><b>Category:</b> <span className="text-danger">{productCategoriesBreadcrumb?.name}</span></p>
			}
			{/*<p className="mb-1"><b>Communication:</b> <span className="text-danger">A</span></p>*/}
			{/*<p className="mb-1"><b>Shipping Speed:</b> <span className="text-danger">A</span></p>*/}
		</div>
	);
};

export default AliSellerInfo;