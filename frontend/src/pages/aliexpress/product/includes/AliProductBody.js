import React, {useEffect, useState} from 'react';
import AliMediaPart from "./media/AliMediaPart";
import AliAttributes from './attributes/AliAttributes';
import AliPriceCard from "./AliPriceCard";
import AliQuantityInput from "./quantity/AliQuantityInput";
import {useCart} from "../../../../api/CartApi";
import AliShipmentInfo from "./shipping/AliShipmentInfo";
import {useAliProductShippingInfo} from "../../../../api/AliExpressProductApi";
import AliAddToCart from "./addToCart/AliAddToCart";
import AliProductSummary from "./summary/AliProductSummary";
import AliSellerInfo from "./sellerInfo/AliSellerInfo";
import AliSocialShare from "./AliSocialShare";
import MediumSpinner from "../../../../loader/MediumSpinner";


const AliProductBody = (props) => {
	const {isMobile, product, settings} = props;
	const [operationalAttributes, setOperationalAttributes] = useState({});
	const [activeImg, setActiveImg] = useState('');
	const [activeShipping, setActiveShipping] = useState();
	const [selectShipping, setSelectShipping] = useState('');

	const productId = product?.product_id;

	const {data: cart} = useCart();
	const cartItem = cart?.cart_items?.find(item => item.ItemId === productId) || {};

	const {data: shipment, isLoading: shippingLoading} = useAliProductShippingInfo(productId);

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
	const ShipsFrom = skuProperties?.find(find => find.skuPropertyName === 'ShipsFrom');
	let hasShipFromChina = ShipsFrom?.skuPropertyValues?.find(value => value.propertyValueName === 'China');
	hasShipFromChina = hasShipFromChina ? hasShipFromChina : (!ShipsFrom?.skuPropertyValues?.length);
	const hasBDShipment = shipment?.freightResult?.length > 0;

	return (
		<div className="product-details-top">
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
						<b>{feedback?.averageStar}/5</b> Rating with <b>{feedback?.averageStarRage}</b>% positive feedback
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
						{
							shippingLoading ?
								<div className="text-center py-3">
									<MediumSpinner buttonClass="text-danger"/>
								</div>
								:
								(hasShipFromChina || hasBDShipment) ?
									<div className="shipment">
										<AliShipmentInfo
											cartItem={cartItem}
											product={product}
											activeShipping={activeShipping}
											setActiveShipping={setActiveShipping}
											selectShipping={selectShipping}
											setSelectShipping={setSelectShipping}
											shipment={shipment}
											settings={settings}/>

										<AliQuantityInput
											cartItem={cartItem}
											product={product}
											settings={settings}
											shipment={shipment}
											activeShipping={activeShipping}
											selectShipping={selectShipping}
											operationalAttributes={operationalAttributes}
										/>

										<AliProductSummary
											cartItem={cartItem}
											product={product}
											selectShipping={selectShipping}
											settings={settings}
											operationalAttributes={operationalAttributes}
										/>

										<AliAddToCart
											cartItem={cartItem}
											product={product}
											settings={settings}/>
									</div>
									:
									<h3 className="text-danger my-3">"This product not possible to Ship Bangladesh"</h3>
						}

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
