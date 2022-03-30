import React from "react";
import ProductCart from "../../product/productList/ProductCart";
import {withRouter} from "react-router-dom";
import PagePaginator from "../../../pagination/PagePaginator";

const PictureSearchProductList = (props) => {
	const {search_id, currentPage, totalPage, currencyIcon, Content, TotalCount} = props;

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
						<ProductCart key={key} product={product} currencyIcon={currencyIcon} productClass="col"/>
					))}
				</div>
			</div>

			<PagePaginator
				handlePaginationClick={handlePaginationClick}
				currentPage={currentPage}
				totalPage={totalPage}/>

		</div>
	);
};


export default withRouter(PictureSearchProductList);
