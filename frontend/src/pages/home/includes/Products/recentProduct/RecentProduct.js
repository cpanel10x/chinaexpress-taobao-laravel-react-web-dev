import React from 'react'
import ProductSectionSkeleton from "../../../../../skeleton/productSkeleton/ProductSectionSkeleton";
import RecentItems from "./includes/RecentItems";
import {useRecentViewProducts} from "../../../../../api/ProductApi";

const RecentProduct = (props) => {


   const {data: products, isLoading} = useRecentViewProducts();


   return (
      <div className="container deal-section">
         <div className="card my-5">
            <div className="card-body">
               <div className="row mb-3">
                  <div className="col-12">
                     <h3 className="title">Recently Viewed </h3>
                  </div>
               </div>

               {isLoading && <ProductSectionSkeleton/>}
               {!isLoading && products.length > 0 && <RecentItems products={products}/>}

            </div>
         </div>
      </div>
   )
};


export default RecentProduct;



