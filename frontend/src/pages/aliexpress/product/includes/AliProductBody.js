import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import AliMediaPart from "./media/AliMediaPart";
import AliAttributes from './attributes/AliAttributes';
import AliPriceCard from "./AliPriceCard";
import AliQuantityInput from "./quantity/AliQuantityInput";
import {useCartMutation} from "../../../../api/CartApi";
import AliProductWishListButton from "./wishlist/AliProductWishListButton";
import AliShipmentInfo from "./shipping/AliShipmentInfo";
import SocialShare from "../../../product/productSingleNew/productBody/includes/SocialShare";


const AliProductBody = (props) => {
	const {isMobile, product, settings} = props;
	const [activeImg, setActiveImg] = useState('');

	const {mainCart: {data: cart, isLoading}} = useCartMutation();

	const currencyIcon = settings?.currency_icon || '৳';


	// const activeConfiguredItems = getActiveConfiguredItems(ConfiguredItems, selectAttributes);
	const activeConfiguredItems = {};

	const productId = product?.product_id;
	const product_title = product?.product_title;
	const lastest_volume = product?.lastest_volume;
	const feedback = product?.feedBackRating;
	const titleModule = product?.titleModule || {};
	const metadata = product?.metadata;
	const formatTradeCount = metadata?.titleModule?.formatTradeCount || 0;

	const imagePathList = product?.product_small_image_urls?.string || [];

	useEffect(() => {
		setActiveImg(product?.product_main_image_url);
	}, [product]);

	const skuModule = product?.metadata?.skuModule;
	const productSKUPropertyList = skuModule?.productSKUPropertyList;

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
					<p className="mb-2">
						<b>{feedback?.averageStar}/5</b> Rating with <b>{feedback?.averageStarRage}</b>%
						positive feedback
						<br/>
						Total Loved - <b>{product?.wishedCount}</b>
						<br/>
						Total Sold - <b>{formatTradeCount}</b>
					</p>

					<div className="product-details">
						{
							productSKUPropertyList?.length &&
							productSKUPropertyList.map((property, index) =>
								<div key={index} className="mb-3">
									<p>
										<b>{property?.skuPropertyName} : </b>
										<span className="seller_info">{property?.skuPropertyName || 'not selected'}</span>
									</p>
									<AliAttributes colorSkuPropertyValues={property?.skuPropertyValues} setActiveImg={setActiveImg}/>
								</div>
							)}


						<div className="shipment">
							<AliShipmentInfo product={product}/>
						</div>

						<AliQuantityInput
							cart={cart}
							product={product}
							settings={settings}
							activeConfiguredItems={activeConfiguredItems}/>

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
								<AliProductWishListButton product={product}/>
							</div>
						</div>

						{/*<SellerInfo product={product}/>*/}


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

						<SocialShare product={product} settings={settings}/>

					</div>
					{/* End .product-details */}
				</div>
				{/* End .col-md-6 */}
			</div>


		</div>
	);
}

export default AliProductBody;
