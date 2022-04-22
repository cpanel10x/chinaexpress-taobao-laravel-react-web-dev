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

	const productItem = product?.item || {};
	const productId = productItem?.num_iid;

	const {data: cart} = useCart();
	const cartItem = cart?.cart_items?.find(item => String(item.ItemId) === String(productId)) || {};

	// const {data: shipment, isLoading: shippingLoading} = useAliProductShippingInfo(productId);
	const {shipment, shippingLoading} = {shipment: {}, shippingLoading: false};

	const product_title = productItem?.title;

	const imagePathList = productItem?.images || [];

	useEffect(() => {
		const mainImg = imagePathList?.length > 0 ? imagePathList[0] : '';
		if (mainImg) {
			setActiveImg(mainImg);
		}
	}, [imagePathList]);

	const skuProperties = product?.item?.skus?.props || [];
	const ShipsFrom = skuProperties?.find(find => find.name === 'Ships From');
	let hasShipFromChina = ShipsFrom?.values?.find(value => value.name === 'China');
	hasShipFromChina = hasShipFromChina ? hasShipFromChina : (!ShipsFrom?.values?.length);
	const hasBDShipment = shipment?.body?.freightResult?.length > 0;

	return (
		<div className="product-details-top">
			{!isMobile && <h1 className="single-product-title">{product_title}</h1>}
			<div className="row">
				<div className="col-md-5">
					<AliMediaPart
						product={product}
						imagePathList={imagePathList}
						activeImg={activeImg}
						setActiveImg={setActiveImg}
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
						<b>{productItem?.wish_count}</b> Loved | <b>{productItem?.sales}</b> Orders
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
