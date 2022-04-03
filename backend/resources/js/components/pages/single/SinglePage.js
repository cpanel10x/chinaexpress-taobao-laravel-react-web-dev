import React, {useEffect, useState} from "react";
import {isEmpty, isObject} from "lodash";
import {withRouter} from "react-router-dom";
import {goPageTop} from "../../utils/Helpers";
import parser from "html-react-parser";
import My404Component from "../404/My404Component";
import Breadcrumb from "../breadcrumb/Breadcrumb";
import {SwrGetRequest} from "../../utils/SwrRequests";
import PageSkeleton from "../../skeleton/PageSkeleton";

const SinglePage = ({match}) => {
   const {slug} = match.params;

   const {resData, isLoading} = SwrGetRequest(
      slug ? `/default/page/${slug}` : null
   );

   const pagesData = () => {
      const data = isObject(resData) ? resData.data : {};
      if (!isEmpty(data)) {
         return data.singles;
      }
      return {};
   };
   const page = pagesData();

   useEffect(() => {
      goPageTop();
   }, [slug]);

   if (isLoading) {
      return <PageSkeleton/>;
   }

   if (isEmpty(page)) {
      return <My404Component/>;
   }

   return (
      <main className="main">
         <div className="container">
            <div className="card my-5">
               <div className="card-body">
                  <h2 className="title">
                     {page.post_title &&
                     parser(page.post_title)}
                  </h2>
                  <div className="mb-3">
                     {page.post_content &&
                     parser(page.post_content)}
                  </div>
               </div>
            </div>
         </div>
      </main>
   );
};

export default withRouter(SinglePage);
