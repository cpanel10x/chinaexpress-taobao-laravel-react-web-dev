import React from "react";
import ReactPaginate from "react-paginate";
import ProductCart from "../../product/productList/ProductCart";
import {withRouter} from "react-router-dom";

const PictureSearchProductList = (props) => {
	const {search_id, currentPage, totalPage, Content, TotalCount} = props;

	const handlePaginationClick = (data) => {
		props.history.push(`/search/picture/${search_id}?page=${data.selected + 1}`);
	};

	return (
		<div className="product_list_container">
			<div className="mb-3">
				<h2>Total found <span>{TotalCount}</span> Products</h2>
			</div>

			<div className="products mb-3">
				<div
					className={`row justify-content-center row-cols-2 row-cols-md-4 row-cols-lg-5`}>
					{Content?.length > 0 &&
					Content.map((product, key) => (
						<ProductCart key={key} product={product} productClass="col"/>
					))}
				</div>
			</div>

			<nav aria-label="Page navigation">
				<ReactPaginate
					previousLabel={`Prev`}
					nextLabel={"Next"}
					breakLabel={"..."}
					breakClassName={"break-me"}
					forcePage={currentPage - 1}
					pageCount={totalPage}
					marginPagesDisplayed={2}
					pageRangeDisplayed={3}
					onPageChange={handlePaginationClick}
					containerClassName={"pagination justify-content-center"}
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
	);
};


export default withRouter(PictureSearchProductList);
