import React from "react";
import { Redirect, Route } from "react-router-dom";
import { isBackendAuthenticated } from "../api/Auth";
import AdminLayout from "../layouts/admin/AdminLayout";

const AdminRoute = ({ component: Component, ...rest }) => {
  const isAuth = isBackendAuthenticated();

  return (
    <Route
      {...rest}
      render={(props) => (
        <AdminLayout>
          {isAuth ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          )}
        </AdminLayout>
      )}
    />
  );
};

export default AdminRoute;
