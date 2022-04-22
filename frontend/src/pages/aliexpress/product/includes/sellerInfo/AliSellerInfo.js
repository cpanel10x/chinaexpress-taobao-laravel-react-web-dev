import {Link} from 'react-router-dom';

const AliSellerInfo = (props) => {
	const {product} = props;

	const productId = product?.item?.num_iid;
	const category_id = product?.item?.cat_id;
	const productCategoriesBreadcrumb = product?.productCategoriesBreadcrumb?.find(find => find.cateId === category_id);

	const seller = product?.seller;

	return (
		<div className="product-details-action mt-3">
			<p className="mb-1"><b>Product ID:</b> <span className="text-danger">{productId}</span></p>
			<p className="mb-1"><b>Source:</b> <span className="text-danger">AliExpress</span></p>

			<div className="card mt-3">
				<div className="card-body">
					<div className="row align-items-center">
						<div className="col-2">
							<img src={seller?.shop_icon} className="img-fluid" alt={seller?.shop_title}/>
						</div>
						<div className="col">
							<h3 className="m-0"> {seller?.shop_title}</h3>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<p>
								<b style={{color: '#751f8a'}}>{seller?.rating}</b> <span className="ml-1">Positive Seller Ratings</span>
								<br/>
								<b style={{color: '#751f8a'}}>{seller?.total_items}</b> <span className="ml-1">Total Items</span>
								<br/>
								<b style={{color: '#751f8a'}}>{seller?.fans}</b> <span className="ml-1">Loved</span>
							</p>
						</div>
						<div className="col-md-4">
							<Link to={`/aliexpress/seller/${seller?.shop_id}/${seller?.seller_id}`} className="btn btn-block btn-default">Visit Store</Link>
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