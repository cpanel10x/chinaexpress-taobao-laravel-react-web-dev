import React from "react";
import {Link} from "react-router-dom";
import LazyLoad from "react-lazyload";
import {getDBProductPrice} from "../../../utils/CartHelpers";
import {useAddToWishList} from "../../../api/Queries";
import SmallSpinnerButtonLoader from "../../../loader/SmallSpinnerButtonLoader";
import {useQueryClient} from "react-query";
import {useSettings} from "../../../api/GeneralApi";

const SectionProductCard = (props) => {
   const {product} = props;

   const {data: settings} = useSettings();
   const rate = settings?.increase_rate || 0;
   const currency_icon = settings?.currency_icon || '৳';

   const cache = useQueryClient();
   const {isLoading, mutateAsync} = useAddToWishList();

   const addToWishlist = (e) => {
      e.preventDefault();
      mutateAsync({product: product}, {
         onSuccess: (responseData) => {
            if (responseData?.status) {
               cache.setQueryData('wishlist', (responseData?.wishlists || {}));
            }
         }
      });
   };


   return (
      <div className="col-lg-12 col-md-6 col-6">
         <div className="product">
            <figure className="product-media">
               <Link to={`/product/${product.ItemId}`} className="w-100">
                  <LazyLoad height={236} once>
                     <img
                        src={product.MainPictureUrl}
                        className="product-image"
                        alt={product?.Title}
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
                           <i className="icon-heart-empty"/> <span>add to wishlist</span>
                        </a>
                  }
                  <Link
                     to={`/product/${product.ItemId}`}
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
                  title={product.Title}
               >
                  <Link to={`/product/${product.ItemId}`}>
                     {product.Title}
                  </Link>
               </h3>

               {/* End .product-title letter-spacing-normal font-size-normal */}
               <div className="product-price">
                  <div className="new-price">{`${currency_icon} ${getDBProductPrice(
                     product,
                     rate
                  )}`}</div>
               </div>
               {/* End .product-price */}
            </div>
         </div>
      </div>
   );
};


export default SectionProductCard;
