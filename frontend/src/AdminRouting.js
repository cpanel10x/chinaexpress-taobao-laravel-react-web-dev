import React from "react";
import AdminRoute from "./routers/AdminRoute";
import AdminDashboard from "./admin/dashboard/AdminDashboard";
import RecentOrder from "./admin/pages/order/recent/RecentOrder";
import Wallet from "./admin/pages/order/wallet/Wallet";

const AdminRouting = () => {
  return (<>
    <AdminRoute path="/admin/dashboard" exact component={AdminDashboard}/>
    <AdminRoute path="/admin/order/recent" exact component={RecentOrder}/>
    <AdminRoute path="/admin/order/wallet" exact component={Wallet}/>
    <AdminRoute path="/admin/order/invoice" exact component={AdminDashboard}/>
    <AdminRoute path="/admin/order/tracking" exact component={AdminDashboard}/>
  </>);
};

export default AdminRouting;
