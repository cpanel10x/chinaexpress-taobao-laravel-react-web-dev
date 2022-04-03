import React, {useEffect} from "react";
import WishlistPage from "./wishlistPage/WishlistPage";
import {goPageTop} from "../../utils/Helpers";
import {useSettings, useWishList} from "../../api/GeneralApi";

const Wishlist = () => {
   const {data: wishList} = useWishList();

   useEffect(() => {
      goPageTop();
   }, []);

   return (
      <div>
         <div className="row justify-content-center">
            <div className="col-md-6">
               <WishlistPage wishList={wishList}/>
            </div>
         </div>
      </div>
   );
};


export default Wishlist;
