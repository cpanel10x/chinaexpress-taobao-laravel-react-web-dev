import React from 'react'
import AliSpecifications from "./AliSpecifications";
// import AliShippingAndDelivery from "./AliShippingAndDelivery";
import AliProductDescription from "./AliProductDescription";
import AliProductSellerInfo from "./AliProductSellerInfo";

const AliProductDetailsTab = ({ product }) => {

  const specsModule = product?.specsModule;

  return (
    <div className="product-details-tab">
      <ul className="nav nav-pills justify-content-center" role="tablist">
        <li className="nav-item">
          <a
            className="nav-link active"
            id="product-shipping-link"
            data-toggle="tab"
            href="#product-shipping-tab"
            role="tab"
            aria-controls="product-shipping-tab"
            aria-selected="false"
          >
            Shipping &amp; Delivery
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="product-info-link"
            data-toggle="tab"
            href="#product-info-tab"
            role="tab"
            aria-controls="product-info-tab"
            aria-selected="true"
          >
            Specifications
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="product-desc-link"
            data-toggle="tab"
            href="#seller-info-tab"
            role="tab"
            aria-controls="seller-info-tab"
            aria-selected="false"
          >
            Seller Info
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="product-desc-link"
            data-toggle="tab"
            href="#product-desc-tab"
            role="tab"
            aria-controls="product-desc-tab"
            aria-selected="false"
          >
            Description
          </a>
        </li>
      </ul>
      <div className="tab-content">
        <div
          className="tab-pane fade show active"
          id="product-shipping-tab"
          role="tabpanel"
          aria-labelledby="product-shipping-link"
        >
          {/*<AliShippingAndDelivery />*/}
        </div>

        <div
          className="tab-pane fade"
          id="product-info-tab"
          role="tabpanel"
          aria-labelledby="product-info-link"
        >
          <AliSpecifications specsModule={specsModule} />
        </div>

        <div
          className="tab-pane fade"
          id="seller-info-tab"
          role="tabpanel"
          aria-labelledby="seller-info-link"
        >
          <AliProductSellerInfo specsModule={specsModule} />
        </div>

        <div
          className="tab-pane fade"
          id="product-desc-tab"
          role="tabpanel"
          aria-labelledby="product-desc-link"
        >
          <AliProductDescription product={product} />
        </div>

      </div>
      {/* End .tab-content */}
    </div>
  )
}

export default AliProductDetailsTab
