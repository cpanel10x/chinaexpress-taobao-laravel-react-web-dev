import React, {useEffect} from "react";
import {withRouter, useParams, useHistory} from "react-router-dom";
import {goPageTop} from "../../utils/Helpers";
import Breadcrumb from "../breadcrumb/Breadcrumb";
import ProductListSkeleton from "../../skeleton/productSkeleton/ProductListSkeleton";
import My404Component from "../404/My404Component";
import PictureSearchProductList from "./includes/PictureSearchProductList";
import {useQuery} from "../../utils/customHooks";
import {usePictureSearch} from "../../api/ProductApi";


const LoadPictureSearchProduct = props => {
	const { search_id } = useParams();
	const history = useHistory();
	const query = useQuery();
	const page = query.get("page");
	const currentPage = page ? page : 1;

	const limit = 35;
	const offset = currentPage ? Math.ceil(currentPage * limit) : 0;

	const {data, isLoading} = usePictureSearch(search_id, currentPage);


	const queryUrl = `/default/get-picture-result/${search_id}?offset=${offset}&limit=${limit}`;
	// const {resData, isLoading} = SwrPostRequest(search_id ? queryUrl : null);
	const resData  = {};

	let products = resData?.data?.products;
	products = products ? JSON.parse(products) : {Content: {}, TotalCount: 0};
	const Content = products?.Content ? products.Content : 0;
	const TotalCount = products?.TotalCount ? products.TotalCount : 1;
	const totalPage = Math.ceil(TotalCount / limit);


	useEffect(() => {
		goPageTop();
	}, [search_id, page]);


	if (!isLoading && !Content?.length) {
		return <My404Component/>;
	}

	return (
		<main className="main">
			<div className="page-content">
				<div className="container">
					<div className="card my-5">
						<div className="card-body">
							{
								isLoading ?
									<ProductListSkeleton/>
									:
									<PictureSearchProductList
										search_id={search_id}
										Content={Content}
										TotalCount={TotalCount}
										currentPage={currentPage}
										totalPage={totalPage}
									/>
							}
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};


export default withRouter(LoadPictureSearchProduct);
