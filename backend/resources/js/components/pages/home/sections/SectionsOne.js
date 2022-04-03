import React from "react";
import {Link} from "react-router-dom";
import {loadAsset} from "../../../utils/Helpers";
import ProductSectionSkeleton from "../../../skeleton/productSkeleton/ProductSectionSkeleton";
import RecentItems from "../includes/Products/recentProduct/includes/RecentItems";
import {useQuery} from "react-query";
import {getSectionProducts} from "../../../api/GeneralApi";

const SectionsOne = (props) => {
	const {settings} = props;

	const section_key = 'section_one';
	const {data, isLoading, isSuccess} = useQuery(["section", section_key], () => getSectionProducts(section_key));

	const products = data?.products ? JSON.parse(data?.products)?.Content : [];

	const section_one_title = settings?.section_one_title || '';
	const section_one_title_image = settings?.section_one_title_image || '';
	const section_one_visible_title = settings?.section_one_visible_title || '';
	const query_url = settings?.section_one_query_url || '';
	const query_type = settings?.section_one_query_type || '';

	if (isLoading) {
		return (
			<div className="container deal-section">
				<div className="card my-5">
					<div className="card-body">
						<ProductSectionSkeleton/>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="container deal-section">
			<div className="card my-5">
				<div className="card-body">
					<div className="row mb-3">
						<div className="col-6">
							<h3 className="title ">
								{section_one_visible_title === "image" ? (
									<img src={loadAsset(section_one_title_image)}/>
								) : (
									section_one_title
								)}
							</h3>
						</div>
						<div className="col-6 text-right">
							{query_type === "search_query" ?
								<Link to={`/search${query_url}`} className="btn btn-custom-product px-4">View All</Link>
								:
								<Link to={`/shop${query_url}`} className="btn btn-custom-product px-4"> View All </Link>
							}
						</div>
					</div>
					{products?.length > 0 && <RecentItems products={products} settings={settings}/>}
				</div>
			</div>
		</div>
	);
};


export default SectionsOne;
