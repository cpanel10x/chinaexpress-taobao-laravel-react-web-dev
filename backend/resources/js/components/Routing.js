import React from "react";
import {Route, Switch} from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./auth/login/Login";
import My404Component from "./pages/404/My404Component";
import Faq from "./pages/faq/Faq";
import Contact from "./pages/contact/Contact";
import SinglePage from "./pages/single/SinglePage";
import ProductSingle from "./pages/product/productSingleNew/ProductSingle";
import Checkout from "./pages/checkout/Checkout";
import Wishlist from "./pages/wishlist/Wishlist";
import LoadCategory from "./pages/category/LoadCategory";
import LoadShopProducts from "./pages/shop/LoadShopProducts";
import LoadSearchProducts from "./pages/search/LoadSearchProducts";
import Dashboard from "./auth/dashboard/Dashboard";
import AuthRoute from "./AuthRoute";
import Payment from "./pages/payment/Payment";
// import PaymentSuccessFail from "../pages/payment/PaymentSuccessFail";
import LoadPictureSearchProduct from "./pages/search/LoadPictureSearchProduct";
import OrderDetails from "./auth/dashboard/orders/OrderDetails";
import paymentStatus from "./auth/dashboard/orders/paymentStatus";
import AliExpressSearch from "./pages/aliexpress/search/AliExpressSearch";
import AliProductPage from "./pages/aliexpress/product/AliProductPage";
import ForgotPassword from "./auth/forgot/ForgotPassword";

const Routing = () => {
   return (
      <Switch>
         <Route path="/" exact component={Home}/>
         <Route path="/login" exact component={Login}/>
         <Route path="/forgot-password" exact component={ForgotPassword}/>
         <Route path="/faq" exact component={Faq}/>
         <Route path="/contact" exact component={Contact}/>

         <Route path="/pages/:slug" exact component={SinglePage}/>
         <Route path="/product/:item_id" exact component={ProductSingle}/>
         <Route
            path="/search"
            exact={true}
            component={LoadSearchProducts}
         />
         <Route path="/search/picture/:search_id" exact component={LoadPictureSearchProduct}/>
         <Route
            path="/shop/:category_slug"
            exact
            component={LoadShopProducts}
         />

         {/* start aliexpress route develop */}
         <Route path="/aliexpress/search" exact={true} component={AliExpressSearch}/>
         <Route path="/aliexpress/product/:productId" exact={true} component={AliProductPage}/>
         {/* end aliexpress route develop */}

         <AuthRoute path="/checkout" exact component={Checkout}/>

         <AuthRoute
            path="/dashboard/:section?"
            exact
            component={Dashboard}
         />
         <AuthRoute path="/payment" exact component={Payment}/>
         <AuthRoute path="/wishlist" exact component={Wishlist}/>
         <AuthRoute path="/order/:orderId" exact component={OrderDetails}/>
         <AuthRoute
            path="/payment/:orderId"
            exact
            component={paymentStatus}
         />

         {/* <AuthRoute path="/online/payment/:status/:tran_id" exact component={PaymentSuccessFail}/> */}

         <Route
            path="/:category_slug/:sub_slug?"
            exact
            component={LoadCategory}
         />

         <Route path="*" exact component={My404Component}/>
      </Switch>
   );
};

export default Routing;
