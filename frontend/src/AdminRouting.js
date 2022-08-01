import React from "react";
import AdminRoute from "./routers/AdminRoute";
import AdminDashboard from "./admin/dashboard/AdminDashboard";
import RecentOrder from "./admin/pages/order/recent/RecentOrder";
import WalletIndex from "./admin/pages/order/wallet/WalletIndex";
import ManageInvoice from "./admin/pages/order/invoice/ManageInvoice";
import ManageTracking from "./admin/pages/order/tracking/ManageTracking";
import ManageProducts from "./admin/pages/products/ManageProducts";
import CouponLogs from "./admin/pages/coupon/logs/CouponLogs";
import CouponList from "./admin/pages/coupon/list/CouponList";
import CustomerIndex from "./admin/pages/customer/CustomerIndex";
import TaxonomyIndex from "./admin/pages/taxonomy/TaxonomyIndex";
import MenuIndex from "./admin/pages/menu/MenuIndex";
import ContactIndex from "./admin/pages/contact/ContactIndex";
import PageIndex from "./admin/pages/pages/PageIndex";
import FaqIndex from "./admin/pages/faqs/FaqIndex";
import TopNoticeIndex from "./admin/pages/front-setting/top-notice/TopNoticeIndex";

const AdminRouting = () => {
  return (
    <>
      <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />

      <AdminRoute path="/admin/order/recent" exact component={RecentOrder} />
      <AdminRoute path="/admin/order/wallet" exact component={WalletIndex} />
      <AdminRoute path="/admin/order/invoice" exact component={ManageInvoice} />
      <AdminRoute
        path="/admin/order/tracking"
        exact
        component={ManageTracking}
      />
      <AdminRoute path="/admin/product/list" exact component={ManageProducts} />
      <AdminRoute path="/admin/coupon/logs" exact component={CouponLogs} />
      <AdminRoute path="/admin/coupon/list" exact component={CouponList} />
      <AdminRoute path="/admin/customer" exact component={CustomerIndex} />
      <AdminRoute path="/admin/menu" exact component={MenuIndex} />
      <AdminRoute path="/admin/taxonomy" exact component={TaxonomyIndex} />
      <AdminRoute path="/admin/contact" exact component={ContactIndex} />
      <AdminRoute path="/admin/pages" exact component={PageIndex} />
      <AdminRoute path="/admin/faqs" exact component={FaqIndex} />
      <AdminRoute
        path="/admin/front-setting/top-notice"
        exact
        component={TopNoticeIndex}
      />
      <AdminRoute
        path="/admin/front-setting/announcement"
        exact
        component={AdminDashboard}
      />
      <AdminRoute
        path="/admin/front-setting/banner"
        exact
        component={AdminDashboard}
      />
      <AdminRoute
        path="/admin/front-setting/promo-banner"
        exact
        component={AdminDashboard}
      />
      <AdminRoute
        path="/admin/front-setting/sections"
        exact
        component={AdminDashboard}
      />
      <AdminRoute
        path="/admin/front-setting/image-loading"
        exact
        component={AdminDashboard}
      />
      <AdminRoute
        path="/admin/setting/general"
        exact
        component={AdminDashboard}
      />
      <AdminRoute
        path="/admin/setting/price"
        exact
        component={AdminDashboard}
      />
      <AdminRoute
        path="/admin/setting/order-limit"
        exact
        component={AdminDashboard}
      />
      <AdminRoute
        path="/admin/setting/popup"
        exact
        component={AdminDashboard}
      />
      <AdminRoute
        path="/admin/setting/block-words"
        exact
        component={AdminDashboard}
      />
      <AdminRoute
        path="/admin/setting/messages"
        exact
        component={AdminDashboard}
      />
      <AdminRoute
        path="/admin/setting/cache-control"
        exact
        component={AdminDashboard}
      />
      <AdminRoute
        path="/admin/setting/bkash-api-response"
        exact
        component={AdminDashboard}
      />
      <AdminRoute
        path="/admin/setting/general"
        exact
        component={AdminDashboard}
      />
      <AdminRoute path="/admin/user" exact component={AdminDashboard} />
      <AdminRoute path="/admin/role" exact component={AdminDashboard} />
      <AdminRoute path="/admin/bkash/refund" exact component={AdminDashboard} />
      <AdminRoute
        path="/admin/log/dashboard"
        exact
        component={AdminDashboard}
      />
      <AdminRoute
        path="/admin/log/error-list"
        exact
        component={AdminDashboard}
      />
    </>
  );
};

export default AdminRouting;
