import React, {useEffect} from "react";
import {useLocation, withRouter} from "react-router-dom";
import ProductListSkeleton from "../../skeleton/productSkeleton/ProductListSkeleton";
import {goPageTop} from "../../utils/Helpers";
import SearchProductList from "./includes/SearchProductList";
import My404Component from "../404/My404Component";
import {useSearchKeyword} from "../../api/GeneralApi";

function useQuery() {
	const { search } = useLocation();
	return React.useMemo(() => new URLSearchParams(search), [search]);
}

const LoadSearchProducts = (props) => {
	const query = useQuery();
	const keyword = query.get("keyword");
	const page = query.get("page");
	const currentPage = page ? page : 0;

	const limit = 35;
	const offset = currentPage ? Math.ceil(currentPage * limit) : 0;

	const {data: products, mutateAsync, isLoading} = useSearchKeyword(keyword, currentPage);

	useEffect(() => {
		goPageTop();
		mutateAsync({keyword, offset, limit});
	}, [keyword, currentPage]);


	if (isLoading) {
		return (
			<div className="container">
				<div className="card my-5">
					<div className="card-body">
						<ProductListSkeleton/>
					</div>
				</div>
			</div>
		)
	}

	const Content = products?.Content || [];
	const TotalCount = products?.TotalCount || 1;
	const totalPage = Math.ceil(TotalCount / limit);


	if (!Content?.length) {
		return <My404Component/>;
	}

	return (
		<main className="main">
			<div className="page-content">
				<div className="container">
					<div className="card my-5">
						<div className="card-body">
							<SearchProductList
								keyword={keyword}
								Content={Content}
								TotalCount={TotalCount}
								currentPage={currentPage}
								totalPage={totalPage}
							/>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};


export default withRouter(LoadSearchProducts);
