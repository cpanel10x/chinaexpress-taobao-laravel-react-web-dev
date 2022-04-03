import React, {useEffect, useState} from 'react'
import ProductSectionSkeleton from "../../../../../skeleton/productSkeleton/ProductSectionSkeleton";
import RecentItems from "../recentProduct/includes/RecentItems";
import {isEmpty} from "lodash";
import {loadLovingProducts} from "../../../../../utils/Services";

const ProductsLoving = (props) => {
   const [loading, setLoading] = useState(true);
   const [products, setProducts] = useState([]);

   useEffect(() => {
      if (isEmpty(products)) {
         loadLovingProducts()
            .then(response => {
               const lovingProducts = JSON.parse(response.lovingProducts);
               if (!isEmpty(lovingProducts)) {
                  setProducts(lovingProducts);
               }
               setLoading(false);
            });
      }
   }, []);

   return (
      <div className="container deal-section mb-5">

         <div className="row mt-2 mb-2 mb-md-3">
            <div className="col-12">
               <div className="more-to-love card">
                  <div className="row">
                     <div className="col-2">
                        <div className="love-left">
                           <i className="icon-heart-empty"/>
                        </div>
                     </div>
                     <div className="col-8">
                        <h3 className="title text-center">MORE TO LOVE</h3>
                     </div>
                     <div className="col-2">
                        <div className="love-right">
                           <i className="icon-heart-empty"/>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {loading && <ProductSectionSkeleton/>}
         {!loading && products.length > 0 && <RecentItems sectionCart={true} products={products}/>}


      </div>
   )
}

export default ProductsLoving
