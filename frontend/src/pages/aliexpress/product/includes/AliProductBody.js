import React, {useEffect, useState} from 'react';
import AliMediaPart from "./media/AliMediaPart";
import AliAttributes from './attributes/AliAttributes';
import AliPriceCard from "./AliPriceCard";
import AliQuantityInput from "./quantity/AliQuantityInput";
import {useCartMutation} from "../../../../api/CartApi";
import AliShipmentInfo from "./shipping/AliShipmentInfo";
import {useAliProductShippingInfo} from "../../../../api/AliExpressProductApi";
import AliAddToCart from "./addToCart/AliAddToCart";
import AliProductSummary from "./summary/AliProductSummary";
import AliSellerInfo from "./sellerInfo/AliSellerInfo";
import AliSocialShare from "./AliSocialShare";


const AliProductBody = (props) => {
	const {isMobile, product, settings} = props;
	const [operationalAttributes, setOperationalAttributes] = useState({});
	const [activeImg, setActiveImg] = useState('');
	const [selectShipping, setSelectShipping] = useState('');

	const productId = product?.product_id;

	const shipment = useAliProductShippingInfo(productId);

	const {mainCart: {data: cart, isLoading}} = useCartMutation();

	const feedback = product?.feedBackRating;
	const metadata = product?.metadata;
	const product_title = product?.metadata?.titleModule?.product_title;
	const formatTradeCount = metadata?.titleModule?.formatTradeCount || 0;

	const imagePathList = product?.product_small_image_urls?.string || [];

	useEffect(() => {
		let mainImg = product?.product_main_image_url;
		mainImg = mainImg ? mainImg : product?.product_small_image_urls?.string?.[0];
		setActiveImg(mainImg);
	}, [product]);

	const skuProperties = product?.skuProperties;

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
							skuProperties?.length > 0 &&
							<AliAttributes
								operationalAttributes={operationalAttributes}
								setOperationalAttributes={setOperationalAttributes}
								skuProperties={skuProperties}
								setActiveImg={setActiveImg}/>
						}

						<div className="shipment">
							<AliShipmentInfo
								selectShipping={selectShipping}
								setSelectShipping={setSelectShipping}
								shipment={shipment}
								settings={settings}/>
						</div>

						<AliQuantityInput
							cart={cart}
							product={product}
							settings={settings}
							shipment={shipment}
							selectShipping={selectShipping}
							operationalAttributes={operationalAttributes}
						/>

						<AliProductSummary
							cart={cart}
							product={product}
							selectShipping={selectShipping}
							settings={settings}
							operationalAttributes={operationalAttributes}
						/>

						<AliAddToCart
							product={product}
							shipment={shipment}
							settings={settings}/>

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

						<AliSellerInfo product={product}/>

						<AliSocialShare product={product} settings={settings}/>

					</div>
					{/* End .product-details */}
				</div>
				{/* End .col-md-6 */}
			</div>


		</div>
	);
}

export default AliProductBody;
