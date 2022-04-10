import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import AliMediaPart from "./AliMediaPart";
import AliAttributes from './AliAttributes';
import AliShipmentInfo from "./AliShipmentInfo";
import AliPriceCard from "./AliPriceCard";


const AliProductBody = (props) => {
	const {isMobile, product, settings, cartConfigured} = props;

	const [activeImg, setActiveImg] = useState('');

	const currencyIcon = settings?.currency_icon || '৳';

	const productId = product?.commonModule?.productId;

	const titleModule = product?.titleModule;
	const product_title = titleModule?.subject;
	const feedbackRating = titleModule?.feedbackRating;
	const formatTradeCount = titleModule?.formatTradeCount;

	const imagePathList = product?.imageModule?.imagePathList || [];

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


	const FeaturedValues = product?.FeaturedValues ? product.FeaturedValues : [];
	const TaobaoVendorId = FeaturedValues?.find(find => find.Name === 'TaobaoVendorId')?.Value;
	const SalesInLast30Days = FeaturedValues?.find(find => find.Name === 'SalesInLast30Days')?.Value;
	const favCount = FeaturedValues?.find(find => find.Name === 'favCount')?.Value;
	const reviews = FeaturedValues?.find(find => find.Name === 'reviews')?.Value;

	// console.log('productSKUPropertyList', productSKUPropertyList);

	return (
		<div className="product-details-top">

			{/*{*/}
			{/*	!isLoading &&*/}
			{/*	<PopupShown settings={settings} cart={cart} product_id={product_id}/>*/}
			{/*}*/}
			{!isMobile && <h1 className="single-product-title">{product_title}</h1>}
			<div className="row">
				<div className="col-md-5">
					<AliMediaPart
						imagePathList={imagePathList}
						activeImg={activeImg}
						setActiveImg={setActiveImg}
						product={product}
					/>
				</div>
				{/* End .col-md-6 */}
				<div className="col-md-7">

					{isMobile && <h1 className="single-product-title">{product_title}</h1>}

					<AliPriceCard product={product} settings={settings}/>
					<p className="mb-0"><b>{favCount}</b> Favorite with <b>{reviews}</b> positive feedback </p>
					{
						SalesInLast30Days &&
						<p>Sales In Last 30 Days - <b>{SalesInLast30Days}</b></p>
					}
					<div className="product-details">
						{/*<LoadAttributes*/}
						{/*	setActiveImg={setActiveImg}*/}
						{/*	cartStore={cartStore}*/}
						{/*	setCartStore={setCartStore}*/}
						{/*	product={product}*/}
						{/*/>*/}
						{/*<QuantityInput cart={cart} product={product} settings={settings} activeConfiguredItems={activeConfiguredItems}/>*/}
						{/*<ProductSummary*/}
						{/*	cart={cart}*/}
						{/*	product={product}*/}
						{/*	settings={settings}*/}
						{/*/>*/}
						<div className="row">
							<div className="col pr-1">
								<Link to={"/checkout"}
								      className="btn btn-custom-product btn-addToCart btn-block"
								>
									<span className="cartIcon"><i className="icon-cart"/></span>
									<span>Buy Now</span>
								</Link>
							</div>
							<div className="col pl-1">
								{/*<ProductWishListButton product={product}/>*/}
							</div>
						</div>

						{/*<SellerInfo product={product}/>*/}

						{/*<SocialShare product={product} settings={settings}/>*/}

					</div>
					{/* End .product-details */}
				</div>
				{/* End .col-md-6 */}
			</div>


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
