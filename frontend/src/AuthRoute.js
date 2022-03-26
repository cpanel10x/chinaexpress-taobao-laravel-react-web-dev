import React from "react";
import {Redirect, Route, withRouter} from "react-router-dom";
import {isAuthenticated} from "./api/Auth";

const AuthRoute = ({component: Component, ...rest}) => {

   const isAuth = isAuthenticated();
   return (
      <Route
         {...rest}
         render={(props) =>
            isAuth ?
               <Component {...props} />
               :
               <Redirect
                  to={{
                     pathname: "/login",
                     state: {from: props.location},
                  }}
               />
         }
      />
   );
};


export default withRouter(AuthRoute);
