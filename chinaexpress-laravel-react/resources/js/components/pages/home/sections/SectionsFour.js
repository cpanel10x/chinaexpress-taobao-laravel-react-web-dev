import React from 'react';
import {Link} from "react-router-dom";
import ProductSectionSkeleton from "../../../skeleton/productSkeleton/ProductSectionSkeleton";
import RecentItems from "../includes/Products/recentProduct/includes/RecentItems";
import {useQuery} from "react-query";
import {getSectionProducts} from "../../../api/GeneralApi";

const SectionsFour = props => {
	const {settings} = props;

	const section_key = 'section_four';
	const {data, isLoading} = useQuery(["section", section_key], () => getSectionProducts(section_key));

	const products = data?.products ? JSON.parse(data?.products)?.Content : [];

	const section_four_title = settings?.section_four_title || '';
	const query_url = settings?.section_four_query_url || '';
	const query_type = settings?.section_four_query_type || '';

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
					<div className="row mt-2 mb-0 mb-md-2 mb-md-3">
						<div className="col-6">
							<h3 className="title "> {section_four_title}</h3>
						</div>
						<div className="col-6 text-right">
							{query_type === "search_query" ?
								<Link to={`/search${query_url}`} className="btn btn-custom-product px-4">View All</Link>
								:
								<Link to={`/shop${query_url}`} className="btn btn-custom-product px-4"> View All </Link>
							}
						</div>
					</div>

					{products?.length > 0 && <RecentItems products={products}/>}

				</div>
			</div>
		</div>
	)
};

export default SectionsFour;