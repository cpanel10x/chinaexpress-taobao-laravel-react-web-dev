import React, {useEffect, useState} from 'react';
import AliMediaPart from "./AliMediaPart";
import AliAttributes from './AliAttributes';
import AliShipmentInfo from "./AliShipmentInfo";


const AliProductBody = ({product, general}) => {
	const [activeImg, setActiveImg] = useState('');

	const productId = product?.commonModule?.productId;

	const titleModule = product?.titleModule;
	const product_title = titleModule?.subject;
	const feedbackRating = titleModule?.feedbackRating;
	const formatTradeCount = titleModule?.formatTradeCount;

	const imagePathList = product?.imageModule?.imagePathList;

	useEffect(() => {
		let firstImage = imagePathList?.[0];
		setActiveImg(firstImage);
	}, []);

	const skuModule = product?.skuModule;
	const productSKUPropertyList = product?.skuModule?.productSKUPropertyList;
	const skuPriceList = product?.skuModule?.skuPriceList;
	const shippingModule = product?.shippingModule;
	const priceModule = product?.priceModule;
	const storeModule = product?.storeModule;

	// console.log('productSKUPropertyList', productSKUPropertyList);

	return (
		<div className="card my-5">
			<div className="card-body p-5">
				<h1 className="product-title">{product_title}</h1>
				<div className="row">
					<div className="col-md-6">
						<AliMediaPart
							activeImg={activeImg}
							setActiveImg={setActiveImg}
							smallImages={imagePathList}
						/>
					</div>
					{/* End .col-md-6 */}
					<div className="col-md-6">
						<div className="card mb-3 pricing_card">
							<div className="card-body">
								<span>{priceModule?.formatedActivityPrice}</span>
								<del className="ml-3">{priceModule?.formatedPrice}</del>
							</div>
						</div>

						<p className="mb-0"><b>{feedbackRating?.averageStar}/5</b> Rating with <b>{feedbackRating?.averageStarRage}</b>%
							positive feedback </p>
						<p>Total Sold - <b>{formatTradeCount}</b></p>

						<div className="product-details">
							{productSKUPropertyList?.length &&
							productSKUPropertyList.map((property, key) => <div key={key} className="mb-3">
								<p className="font-weight-bold m-0">{property?.skuPropertyName} :</p>
								<AliAttributes colorSkuPropertyValues={property?.skuPropertyValues} setActiveImg={setActiveImg}/>
							</div>)
							}

							<div className="row">
								<div className="col">
									<div className="input-group mb-3">
										<div className="input-group-prepend">
											<button type="button" className="btn btn-secondary px-4"><i className="fa fa-minus"/></button>
										</div>
										<input type="text" className="form-control text-center" placeholder="0" value="0" readOnly={true}/>
										<div className="input-group-append">
											<button type="button" className="btn btn-secondary px-4"><i className="fa fa-plus"/></button>
										</div>
									</div>
								</div>
								<div className="col">
									<p className="m-0">51359 pieces available</p>
								</div>
							</div>

							<div className="shipment">
								<AliShipmentInfo product={product}/>
							</div>

							<div className="row">
								<div className="col pr-1">
									<a href={"/add-to-cart"}
									   onClick={(e) => e.preventDefault()}
									   className="btn btn-custom-product btn-block"
									>
										<span>Add to Cart</span>
									</a>
								</div>
								<div className="col pl-1">
									<a href={"/add-to-wishlist"}
									   onClick={(e) => e.preventDefault()}
										// onClick={(e) => addToWishlist(e, product)}
										 className="btn btn-custom-product btn-block"
									>
										<span>Add To Wishlist</span>
									</a>
								</div>
							</div>

							<div className="product-details-action mt-3">
								<a
									href={"/add-to-express"}
									onClick={(e) => e.preventDefault()}
									className="btn btn-block btn-express px-3 py-3"
								>
									<span>Get Express Service</span>
									<p className="small m-0">15-40 Days Delivery</p>
								</a>
							</div>

							<div className="product-details-action mt-5">
								<p className="mb-1"><b>Source:</b> <span className="text-danger">AliExpress</span></p>
								<p className="mb-1"><b>Seller Name:</b> <span className="text-danger">{storeModule?.storeName}</span></p>
								<p className="mb-1"><b>Category:</b> <span className="text-danger">Abcd</span></p>
								<p className="mb-1"><b>Item as Described:</b> <span className="text-danger">A</span></p>
								<p className="mb-1"><b>Communication:</b> <span className="text-danger">A</span></p>
								<p className="mb-1"><b>Shipping Speed:</b> <span className="text-danger">A</span></p>
							</div>

							{/* End .product-details-action */}
							<div className="product-details-footer">
								<div className="social-icons social-icons-sm">
									<span className="social-label">Share:</span>
									<a
										href={`https://www.facebook.com/share.php?u=https://chinaexpress.com.bd/product/${productId}&title=${product_title}`}
										className="social-icon"
										title="Facebook"
										target="_blank"
									>
										<i className="icon-facebook-f"/>
									</a>
									<a
										className="social-icon"
										href={`fb-messenger://share/?link=https://chinaexpress.com.bd/product/${productId}`}
										data-action="share/messenger/share"
										target="blank"
									>
										<i className="icon-envelope"/>
									</a>
								</div>
							</div>
							{/* End .product-details-footer */}
						</div>
						{/* End .product-details */}
					</div>
					{/* End .col-md-6 */}
				</div>
			</div>
		</div>
	);
}

export default AliProductBody;
