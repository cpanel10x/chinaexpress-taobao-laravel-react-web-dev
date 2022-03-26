import React, { useState } from "react";
import LoadAttributes from "./includes/attribute/LoadAttributes";
import ProductSummary from "./includes/ProductSummary";
import MediaPart from "./includes/MediaPart";
import {
  findProductCartFromState, getActiveConfiguredItems,
} from "../../../../utils/CartHelpers";
import { withRouter, Link } from "react-router-dom";
import QuantityInput from "./quantity/QuantityInput";
import SocialShare from "./includes/SocialShare";
import SellerInfo from "./includes/SellerInfo";
import PriceCard from "./includes/PriceCard";
import {useSettings} from "../../../../api/GeneralApi";
import {useCart} from "../../../../api/CartApi";

const ProductBody = (props) => {
  const { product } = props;
  const [cartStore, setCartStore] = useState({});

  const {data: settings} = useSettings();
  const {data: cart} = useCart();

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

  let activeProduct = findProductCartFromState(cartStore, product_id);


  const addToWishlist = (e, product) => {
    e.preventDefault();
    alert('add to wishlist')
    // props.productAddToWishlist(product);
  };

  return (
    <div className="product-details-top">
      <h1 className="single-product-title">{Title}</h1>
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
          <PriceCard product={product} settings={settings} activeConfiguredItems={activeConfiguredItems} />
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
            <QuantityInput cart={cart} product={product} settings={settings} activeConfiguredItems={activeConfiguredItems} />
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
                  <span className="cartIcon"><i className="icon-cart" /></span>
                  <span>Buy Now</span>
                </Link>
              </div>
              <div className="col pl-1">
                <a href={"/add-to-wishlist"}
                  onClick={(e) => e.preventDefault()}
                  // onClick={(e) => addToWishlist(e, product)}
                  className="btn btn-custom-product btn-wishlist btn-block"
                >
                  <span className="cartIcon"><i className="icon-heart-empty" /></span>
                  <span>Wishlist</span>
                </a>
              </div>
            </div>

            <SellerInfo product={product} />

            <SocialShare product={product} settings={settings} />

          </div>
          {/* End .product-details */}
        </div>
        {/* End .col-md-6 */}
      </div>
    </div>
  );
};


export default withRouter(ProductBody);
