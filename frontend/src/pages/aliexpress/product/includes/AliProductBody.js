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
import {useAliProductShippingInfo} from "../../../../api/AliExpressProductApi";
import AliAddToCart from "./addToCart/AliAddToCart";


const AliProductBody = (props) => {
	const {isMobile, product, settings} = props;
	const [operationalAttributes, setOperationalAttributes] = useState({});
	const [activeImg, setActiveImg] = useState('');

	const productId = product?.product_id;
	const product_title = product?.product_title;

	const shipment = useAliProductShippingInfo(productId);

	const {mainCart: {data: cart, isLoading}} = useCartMutation();

	const feedback = product?.feedBackRating;
	const metadata = product?.metadata;
	const formatTradeCount = metadata?.titleModule?.formatTradeCount || 0;

	const imagePathList = product?.product_small_image_urls?.string || [];

	useEffect(() => {
		setActiveImg(product?.product_main_image_url);
	}, [product]);

	const skuModule = product?.metadata?.skuModule;
	const skuProperties = product?.skuProperties;

	const storeModule = product?.storeModule;

	const FeaturedValues = product?.FeaturedValues ? product.FeaturedValues : [];
	const TaobaoVendorId = FeaturedValues?.find(find => find.Name === 'TaobaoVendorId')?.Value;
	const SalesInLast30Days = FeaturedValues?.find(find => find.Name === 'SalesInLast30Days')?.Value;
	const favCount = FeaturedValues?.find(find => find.Name === 'favCount')?.Value;
	const reviews = FeaturedValues?.find(find => find.Name === 'reviews')?.Value;

	// console.log('operationalAttributes', operationalAttributes);

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
					<AliPriceCard
						product={product}
						operationalAttributes={operationalAttributes}
						settings={settings}/>
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
							skuProperties?.length &&
							<AliAttributes
								operationalAttributes={operationalAttributes}
								setOperationalAttributes={setOperationalAttributes}
								skuProperties={skuProperties}
								setActiveImg={setActiveImg}/>
						}

						<div className="shipment">
							<AliShipmentInfo shipment={shipment} settings={settings}/>
						</div>

						<AliQuantityInput
							cart={cart}
							product={product}
							settings={settings}
							operationalAttributes={operationalAttributes}
						/>

						{/*<ProductSummary*/}
						{/*	cart={cart}*/}
						{/*	product={product}*/}
						{/*	settings={settings}*/}
						{/*/>*/}

						<AliAddToCart product={product} shipment={shipment}/>

						{/*<SellerInfo product={product}/>*/}
						<div className="mt-3">
							<table className="table table-bordered">
								<tr>
									<td className="w-50">Product Weight</td>
									<td className="w-50">0.524kg</td>
								</tr>
								<tr>
									<td className="w-50">China Local Shipping</td>
									<td className="w-50">232</td>
								</tr>
								<tr>
									<td className="w-50">Weight charge:</td>
									<td className="w-50">650 Tk per kg</td>
								</tr>
							</table>
						</div>

						<div className="product-details-action mt-3">
							<a
								href={"/add-to-express"}
								onClick={(e) => e.preventDefault()}
								className="btn btn-block btn-express"
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
