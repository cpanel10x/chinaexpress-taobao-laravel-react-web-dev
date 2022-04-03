import React from 'react';
import {useAllCategories} from "../../../../../api/GeneralApi";
import {Link} from "react-router-dom";

const SellerInfo = (props) => {
	const {product} = props;
	const ProviderType = product?.ProviderType ? product.ProviderType : 'na';
	const VendorName = product?.VendorName ? product.VendorName : 'No Name';
	const VendorScore = product?.VendorScore ? product.VendorScore : 0;
	const CategoryId = product?.CategoryId ? product.CategoryId : 0;

	const {data: categories} = useAllCategories();
	const category = categories?.find(find => find?.otc_id === CategoryId) || null;


	return (
		<div className="details-filter-row my-3">
			<p className="m-0"><b>Product Code :</b> <span className="seller_info">{product?.Id}</span></p>
			<p className="m-0"><b>Source :</b> <span className="seller_info">{ProviderType} China</span></p>
			<p className="m-0"><b>Seller :</b> <span className="seller_info">{VendorName}</span></p>
			<p className="m-0"><b>Seller Score :</b> <span className="seller_info">{VendorScore}</span></p>
			<p className="m-0"><b>Category :</b> <span className="seller_info font-weight-bold">
				{category ?
					<Link to={`/shop/${category.slug}`}>{category.name}</Link>
					: 'Unknown'
				}
			</span></p>
			{/*Delivery estimate:4.7*/}
			{/*Product rating:4.7*/}
			{/*Service rating:4.7*/}
			{/*Rating:eighteen*/}
			{/*Years on the market:8*/}
		</div>
	);
};

export default SellerInfo;