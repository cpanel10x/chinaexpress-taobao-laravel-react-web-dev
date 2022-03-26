import React, { useEffect } from 'react';
import { withRouter } from "react-router-dom";
import { goPageTop } from "../../../utils/Helpers";
import ProductDetailsSkeleton from "../../../skeleton/productSkeleton/ProductDetailsSkeleton";
import { isEmpty } from "lodash";
import My404Component from "../../404/My404Component";
import AliProductDetailsTab from "./includes/AliProductDetailsTab";
import AliProductBody from "./includes/AliProductBody";
import AliRelatedProduct from "./includes/AliRelatedProduct";

const AliProductPage = (props) => {
  const { match } = props;
  const { productId } = match.params;
  const general = {};

  // const { resData, isLoading } = SwrGetRequest(
  //   productId ? `/default/aliexpress/product/${productId}` : null
  // );


  const resData  = {};
  const isLoading  = true;

  useEffect(() => {
    goPageTop();
  }, [productId]);

  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  const product = resData?.data?.result;

  if (isEmpty(product)) {
    return <My404Component />;
  }

  return (
    <div className="bg-gray main">
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            <AliProductBody
              product={product}
              general={general}
            />
            <div className="card my-5">
              <div className="card-body p-5">
                <AliProductDetailsTab product={product} />
              </div>
            </div>
          </div>
          <div className="col-md-3 d-none d-lg-block">
            <div className="card my-5">
              <div className="card-body">
                <AliRelatedProduct productId={productId} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-12 d-block d-lg-none">
          {/*<AliRelatedProduct productId={productId}/>*/}
        </div>
      </div>
    </div>
  );
};



export default withRouter(AliProductPage);

