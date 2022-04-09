import React, {useState} from "react";
import LoadAttributes from "./includes/attribute/LoadAttributes";
import ProductSummary from "./includes/ProductSummary";
import MediaPart from "./includes/MediaPart";
import {getActiveConfiguredItems} from "../../../../utils/CartHelpers";
import {withRouter, Link} from "react-router-dom";
import QuantityInput from "./quantity/QuantityInput";
import SocialShare from "./includes/SocialShare";
import SellerInfo from "./includes/SellerInfo";
import PriceCard from "./includes/PriceCard";
import {useCartMutation} from "../../../../api/CartApi";
import {useMediaQuery} from "react-responsive";
import ProductWishListButton from "./wishlist/ProductWishListButton";
import PopupShown from "./oneTimePopup/PopupShown";

const ProductBody = (props) => {
	const {product, settings} = props;
	const [cartStore, setCartStore] = useState({});

	const {mainCart: {data: cart, isLoading}} = useCartMutation();

	const [activeImg, setActiveImg] = useState("");

	const product_id = product?.Id ? product.Id : 'na';
	const Title = product?.Title ? product.Title : 'No Title';

	const ConfiguredItems = product?.ConfiguredItems ? product.ConfiguredItems : [];
	const selectAttributes = cartStore?.Attributes || [];
	const activeConfiguredItems = getActiveConfiguredItems(ConfiguredItems, selectAttributes);

	const FeaturedValues = product?.FeaturedValues ? product.FeaturedValues : [];
	const TaobaoVendorId = FeaturedValues?.find(find => find.Name === 'TaobaoVendorId')?.Value;
	const SalesInLast30Days = FeaturedValues?.find(find => find.Name === 'SalesInLast30Days')?.Value;
	const favCount = FeaturedValues?.find(find => find.Name === 'favCount')?.Value;
	const reviews = FeaturedValues?.find(find => find.Name === 'reviews')?.Value;

	const isMobile = useMediaQuery({query: '(max-width: 991px)'});


	return (
		<div className="product-details-top">

			{
				!isLoading &&
				<PopupShown settings={settings} cart={cart} product_id={product_id}/>
			}

			{!isMobile && <h1 className="single-product-title">{Title}</h1>}
			<div className="row">
				<div className="col-md-5">
					<MediaPart
						activeImg={activeImg}
						setActiveImg={setActiveImg}
						product={product}
					/>
				</div>
				{/* End .col-md-6 */}
				<div className="col-md-7">

					{isMobile && <h1 className="single-product-title">{Title}</h1>}

					<PriceCard product={product} settings={settings} activeConfiguredItems={activeConfiguredItems}/>
					<p className="mb-0"><b>{favCount}</b> Favorite with <b>{reviews}</b> positive feedback </p>
					{
						SalesInLast30Days &&
						<p>Sales In Last 30 Days - <b>{SalesInLast30Days}</b></p>
					}
					<div className="product-details">
						<LoadAttributes
							setActiveImg={setActiveImg}
							cartStore={cartStore}
							setCartStore={setCartStore}
							product={product}
						/>
						<QuantityInput cart={cart} product={product} settings={settings} activeConfiguredItems={activeConfiguredItems}/>
						<ProductSummary
							cart={cart}
							product={product}
							settings={settings}
						/>
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
								<ProductWishListButton product={product}/>
							</div>
						</div>

						<SellerInfo product={product}/>

						<SocialShare product={product} settings={settings}/>

					</div>
					{/* End .product-details */}
				</div>
				{/* End .col-md-6 */}
			</div>
		</div>
	);
};


export default withRouter(ProductBody);
