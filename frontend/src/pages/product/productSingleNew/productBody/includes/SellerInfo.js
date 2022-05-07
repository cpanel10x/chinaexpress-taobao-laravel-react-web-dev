import React from 'react';
import {useAllCategories} from "../../../../../api/GeneralApi";
import {Link} from "react-router-dom";

const SellerInfo = (props) => {
	const {product} = props;
	const ProviderType = product?.ProviderType ? product.ProviderType : 'na';
	const VendorName = product?.VendorName ? product.VendorName : 'No Name';
	const VendorScore = product?.VendorScore ? product.VendorScore : 0;
	const CategoryId = product?.CategoryId ? product.CategoryId : 0;

	const VendorId = product?.VendorId || null;

	const {data: categories} = useAllCategories();
	const category = categories?.find(find => find?.otc_id === CategoryId) || null;


	return (
		<div className="details-filter-row my-3">
			<p className="mb-1"><b>Product ID:</b> <span className="text-danger">{product?.Id}</span></p>
			<p className="mb-1"><b>Source:</b> <span className="text-danger">{ProviderType}</span></p>

			<div className="card mt-3">
				<div className="card-body">
					<div className="row mb-2 align-items-center">
						<div className="col-2 col-sm-2">
							<h1 className="text-center m-0" style={{fontSize: '2rem'}}>
								<i className="icon-shop-window"/>
							</h1>
						</div>
						<div className="col">
							<h3 className="m-0"> {VendorName}</h3>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<p>
								<span className="ml-1">Seller: </span> <b style={{color: '#751f8a'}}>{VendorName}</b>
								<br/>
								<span className="ml-1">Seller Score: </span> <b style={{color: '#751f8a'}}>{VendorScore}/20</b>
								{
									category &&
									<>
										<br/>
										<span className="ml-1">Category</span> <b style={{color: '#751f8a'}}><Link
										to={`/shop/${category.slug}`}>{category.name}</Link></b>
									</>
								}
							</p>

						</div>
						<div className="col-md-4">
							<Link to={`/taobao/vendor/${VendorId}?seller=${VendorName}&rating=${VendorScore}`}
							      className="btn btn-block btn-default">Visit Store</Link>
						</div>
					</div>
				</div>
			</div>

		</div>
	);
};

export default SellerInfo;