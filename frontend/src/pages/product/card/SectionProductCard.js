import React from "react";
import {Link} from "react-router-dom";
import LazyLoad from "react-lazyload";
import {getDBProductPrice, taobaoCardProductPrepareForLove} from "../../../utils/CartHelpers";
import SmallSpinnerButtonLoader from "../../../loader/SmallSpinnerButtonLoader";
import {useQueryClient} from "react-query";
import {useSettings} from "../../../api/GeneralApi";
import {useAddToWishList} from "../../../api/WishListApi";

const SectionProductCard = (props) => {
	const {product, className} = props;

	const {data: settings} = useSettings();
	const rate = settings?.increase_rate || 0;
	const currency_icon = settings?.currency_icon || '৳';

	const cache = useQueryClient();
	const {isLoading, mutateAsync} = useAddToWishList();

	const addToWishlist = (e) => {
		e.preventDefault();
		const loveProduct = taobaoCardProductPrepareForLove(product, rate);
		mutateAsync(loveProduct, {
			onSuccess: (responseData) => {
				if (responseData?.status) {
					cache.setQueryData('wishlist', (responseData?.wishlists || {}));
				}
			}
		});
	};

	const image = product?.MainPictureUrl || product?.img;
	const Title = product?.Title || product?.name;
	const ItemId = product?.ItemId || product?.product_code;

	return (
		<div className={className ? className : 'col-lg-12 col-md-6 col-6'}>
			<div className="product">
				<figure className="product-media">
					<Link to={`/product/${ItemId}`} className="w-100">
						<LazyLoad height={236} once>
							<img
								src={image}
								className="product-image"
								alt={Title}
							/>
						</LazyLoad>
					</Link>
					<div className="product-action-vertical">
						{
							isLoading ?
								<SmallSpinnerButtonLoader buttonClass="btn-product-icon btn-wishlist btn-expandable" textClass="text-white"/>
								:
								<a
									href={`/add-to-wishlist`}
									onClick={(e) => addToWishlist(e)}
									title="Add Wishlist"
									className="btn-product-icon btn-wishlist btn-expandable"
								>
									<i className="icon-heart-empty"/> <span>Love This</span>
								</a>
						}
						<Link
							to={`/product/${ItemId}`}
							className="btn-product-icon btn-quickview"
							title="Quick view"
						>
							<span>Quick view</span>
						</Link>
					</div>
				</figure>
				<div className="product-body">
					<h3
						className="product-title"
						style={{
							whiteSpace: "nowrap",
							textOverflow: "ellipsis",
							overflow: "hidden",
						}}
						title={Title}
					>
						<Link to={`/product/${ItemId}`}>
							{Title}
						</Link>
					</h3>
					<div className="clearfix d-block product-price">
                  <span className="float-left">{`${currency_icon}`} <span
	                  className="price_span">{getDBProductPrice(product, rate)}</span></span>
						{
							product?.total_sold > 0 && <span className="sold_item_text">SOLD: {product.total_sold}</span>
						}
					</div>

				</div>
			</div>
		</div>
	);
};


export default SectionProductCard;
