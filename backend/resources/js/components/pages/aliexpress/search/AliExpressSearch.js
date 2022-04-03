import { isArray } from "lodash";
import React, { useEffect } from "react";
import ReactPaginate from "react-paginate";
import { withRouter } from "react-router-dom";
import ProductListSkeleton from "../../../skeleton/productSkeleton/ProductListSkeleton";
import { getQueryValueByKey, goPageTop } from "../../../utils/Helpers";
import {
  SwrGetRequest,
  swrResponseParse,
  getObjectValueByKey,
} from "../../../utils/SwrRequests";
import Breadcrumb from "../../breadcrumb/Breadcrumb";
import AliProductCard from "../card/AliProductCard";

function AliExpressSearch(props) {
  let query = getQueryValueByKey("query");
  const { resData, isLoading } = SwrGetRequest(
    query ? `/default/aliexpress/search?query=${query}` : null
  );

  useEffect(() => {
    goPageTop();
  }, []);

  if (isLoading) {
    return <ProductListSkeleton />;
  }

  const result = swrResponseParse(resData, "result");
  const docs = getObjectValueByKey(result, "docs");
  const shipFrom = getObjectValueByKey(result, "shipFrom");
  const searchEngine = getObjectValueByKey(result, "searchEngine");
  const relatedCategories = getObjectValueByKey(result, "relatedCategories");
  const limit = getObjectValueByKey(result, "limit");
  const page = getObjectValueByKey(result, "page");
  const hasPrevPage = getObjectValueByKey(result, "hasPrevPage");
  const hasNextPage = getObjectValueByKey(result, "hasNextPage");
  const prvPage = getObjectValueByKey(result, "prvPage");
  const totalPages = getObjectValueByKey(result, "totalPages");
  const total_record_count = getObjectValueByKey(result, "total_record_count");

  const price_range = getObjectValueByKey(result, "price_range");

  console.log("result", typeof result, result);
  console.log("docs", docs);

  const handlePaginationClick = (data) => {
    props.history.push(
      `/aliexpress/search?query=${query}?page=${data.selected + 1}`
    );
  };

  if (isLoading) {
    <ProductListSkeleton />;
  }

  return (
    <main className="main">
      <div className="page-content">
        <div className="container">
          <div className="row row-cols-2 row-cols-md-5 row-cols-lg-5">
            {isArray(docs) &&
              docs.map((product, key) => (
                <AliProductCard product={product} key={key} />
              ))}
          </div>

          <nav aria-label="Page navigation">
            <ReactPaginate
              previousLabel={`Prev`}
              nextLabel={"Next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              forcePage={page - 1}
              pageCount={totalPages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePaginationClick}
              containerClassName={
                "pagination justify-content-center"
              }
              pageClassName={`page-item`}
              pageLinkClassName={`page-link`}
              previousClassName={`page-item`}
              previousLinkClassName={`page-link page-link-prev`}
              nextClassName={`page-item`}
              nextLinkClassName={`page-link page-link-next`}
              disabledClassName={"disabled"}
              activeClassName={"active"}
            />
          </nav>
        </div>
      </div>
    </main>
  );
}

export default withRouter(AliExpressSearch);
