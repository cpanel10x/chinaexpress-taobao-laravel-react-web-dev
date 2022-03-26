import React from "react";
import {Link} from "react-router-dom";
import {getObjectValueByKey} from "../../../utils/SwrRequests";

const AliProductCard = ({product}) => {
    const currency_icon = "$";
    const metadata = getObjectValueByKey(product, "metadata");
    const image = getObjectValueByKey(metadata, "image");
    const productId = getObjectValueByKey(metadata, "productId");

    const addToWishlist = (e, product) => {
        e.preventDefault();
    };

    return (
        <div className="col">
            <div className="product shadow product-7">
                <figure className="product-media">
                    <Link to={`/aliexpress/product/${productId}`}>
                        <img
                            src={image.imgUrl}
                            className="product-image"
                        />
                    </Link>
                    <div className="product-action-vertical">
                        <a
                            href={`/add-to-wishlist`}
                            onClick={(e) => addToWishlist(e, product)}
                            className="btn-product-icon btn-wishlist btn-expandable"
                        >
                            <span>add to wishlist</span>
                        </a>
                        <Link
                            to={`/aliexpress/product/${productId}`}
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
                        title={product.product_title}
                    >
                        <Link to={`/aliexpress/product/${productId}`}>
                            {product.product_title}
                        </Link>
                    </h3>
                    <div className="clearfix d-block product-price">
                        <span className="float-left">
                            {`${currency_icon}`}{" "}
                            <span className="price_span">
                            {product.app_sale_price}
                            </span>
                        </span>
                        <del className="sold_item_text">
                            {product.discount_rate}
                        </del>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AliProductCard;
