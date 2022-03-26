import React from 'react'
import ProductSectionSkeleton from "../../../../../skeleton/productSkeleton/ProductSectionSkeleton";
import RecentItems from "../recentProduct/includes/RecentItems";
import {useHome} from "../../../../../api/GeneralApi";

const ProductsLoving = (props) => {

	const {lovingProducts: {data: products, isLoading}} = useHome();

	return (
		<div className="container deal-section mb-5">

			<div className="row mt-2 mb-2 mb-md-3">
				<div className="col-12">
					<div className="more-to-love card">
						<div className="row">
							<div className="col-2">
								<div className="love-left">
									<i className="icon-heart-empty"/>
								</div>
							</div>
							<div className="col-8">
								<h3 className="title text-center">MORE TO LOVE</h3>
							</div>
							<div className="col-2">
								<div className="love-right">
									<i className="icon-heart-empty"/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{isLoading && <ProductSectionSkeleton/>}
			{!isLoading && products.length > 0 && <RecentItems sectionCart={true} products={products}/>}

		</div>
	)
}

export default ProductsLoving
