import {isArray} from "lodash";
import React, {useEffect} from "react";
import ReactPaginate from "react-paginate";
import {withRouter} from "react-router-dom";
import ProductListSkeleton from "../../../skeleton/productSkeleton/ProductListSkeleton";
import {useQueryValueByKey, goPageTop} from "../../../utils/Helpers";
import Breadcrumb from "../../breadcrumb/Breadcrumb";
import AliProductCard from "../card/AliProductCard";

function AliExpressSearch(props) {
	let query = useQueryValueByKey("query");
	// const {resData, isLoading} = SwrGetRequest(
	// 	// 	query ? `/default/aliexpress/search?query=${query}` : null
	// 	// );
	const resData = {};
	const isLoading = true;

	useEffect(() => {
		goPageTop();
	}, []);

	if (isLoading) {
		return <ProductListSkeleton/>;
	}

	// const result = swrResponseParse(resData, "result");
	const result = {};
	const docs = result?.docs || '';
	const shipFrom = result?.shipFrom || '';
	const searchEngine = result?.searchEngine || '';
	const relatedCategories = result?.relatedCategories || '';
	const limit = result?.limit || '';
	const page = result?.page || '';
	const hasPrevPage = result?.hasPrevPage || '';
	const hasNextPage = result?.hasNextPage || '';
	const prvPage = result?.prvPage || '';
	const totalPages = result?.totalPages || '';
	const total_record_count = result?.total_record_count || '';

	const price_range = result?.price_range;

	console.log("result", typeof result, result);
	console.log("docs", docs);

	const handlePaginationClick = (data) => {
		props.history.push(
			`/aliexpress/search?query=${query}?page=${data.selected + 1}`
		);
	};

	if (isLoading) {
		<ProductListSkeleton/>;
	}

	return (
		<main className="main">
			<div className="page-content">
				<div className="container">
					<div className="row row-cols-2 row-cols-md-5 row-cols-lg-5">
						{isArray(docs) &&
						docs.map((product, key) => (
							<AliProductCard product={product} key={key}/>
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
