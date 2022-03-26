import React from "react";
import PropTypes from "prop-types";
import OwlCarousel from "react-owl-carousel";
import SectionProductCard from "../../../../../product/card/SectionProductCard";
import ProductCart from "../../../../../product/productList/ProductCart";

const RecentItems = props => {
  const { products, settings } = props;
  const currencyIcon = settings?.currency_icon || '৳';

  return (
    <div className="row row-cols-lg-5 row-cols-md-4 row-cols-sm-3 row-cols-2 ">
      {products.map((product, index) => {
        // if (sectionCart) {
        //    return <SectionProductCard key={index} product={product}/>
        // }
        return (
          <ProductCart
            key={index}
            productClass={`col`}
            product={product}
            currencyIcon={currencyIcon}
          />
        );
      })}
    </div>
  );
};

RecentItems.propTypes = {};

export default RecentItems;
