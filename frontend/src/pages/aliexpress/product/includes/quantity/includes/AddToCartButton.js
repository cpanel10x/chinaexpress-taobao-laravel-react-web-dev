import React from 'react'
import SpinnerButtonLoader from "../../../../../../loader/SpinnerButtonLoader";

const AddToCartButton = props => {
   const {Quantity, isLoading, MasterQuantity} = props;


   return (
      <div className="mb-3">
         <div className="row">
            <div className="col-6 col-md-4">
               {
                  isLoading ?
                     <SpinnerButtonLoader buttonClass={`btn btn-custom-product btn-wishlist btn-block`}/>
                     :
                     <a href={"/add-to-cart"}
                        onClick={(e) => props.addToCartProcess(e)}
                        className="btn btn-custom-product btn-addToCart btn-block"
                     >
                        <span className="cartIcon"><i className="fas fa-cart-arrow-down"/></span>
                        <span>Add to Cart</span>
                     </a>
               }
            </div>
            <div className="col">
               <p className="m-0 py-2">{Quantity >= 0 ? Quantity : MasterQuantity} pieces available</p>
            </div>
         </div>
      </div>
   )
}


export default AddToCartButton