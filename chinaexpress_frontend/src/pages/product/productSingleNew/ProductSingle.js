import React, {useEffect} from "react";
import {withRouter, useParams} from "react-router-dom";
import ProductBody from "./productBody/ProductBody";
import ProductDetailsTab from "./includes/ProductDetailsTab";
import RelatedProduct from "../reletedProduct/RelatedProduct";
import My404Component from "../../404/My404Component";
import {goPageTop} from "../../../utils/Helpers";
import ProductDetailsSkeleton from "../../../skeleton/productSkeleton/ProductDetailsSkeleton";
import {useMediaQuery} from "react-responsive";
import {useTabobaoProduct} from "../../../api/ProductApi";

const ProductSingle = props => {
	const {item_id} = useParams();

	const {data: product, isLoading} = useTabobaoProduct(item_id);

	const isMobile = useMediaQuery({query: '(max-width: 991px)'});

	const cartConfigured = {};

	useEffect(() => {
		goPageTop();
	}, []);

	if (isLoading) {
		return <ProductDetailsSkeleton/>;
	}

	if (!product?.Id) {
		return <My404Component/>;
	}

	return (
		<div className="main">
			<div className="bg-gray main mt-4">
				<div className="container">

					<div className="row">
						<div className="col-lg-9 col-md-12">
							<ProductBody
								product={product}
								cartConfigured={cartConfigured}
							/>

							<div className="card mb-3 mb-lg-5">
								<div className="card-body">
									<ProductDetailsTab product={product}/>
								</div>
							</div>

						</div>
						{
							!isMobile &&
							<div className="col-lg-3 d-none d-lg-block">
								<RelatedProduct item_id={item_id}/>
							</div>
						}
					</div>

					{
						isMobile &&
						<div className="card mb-3 d-block d-lg-none">
							<div className="card-body">
								<h4>Related Products</h4>
								<RelatedProduct item_id={item_id}/>
							</div>
						</div>
					}

				</div>
			</div>
		</div>
	);
};


export default withRouter(ProductSingle);
