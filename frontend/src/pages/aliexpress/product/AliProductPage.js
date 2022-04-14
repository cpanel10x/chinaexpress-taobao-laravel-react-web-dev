import React, {useEffect, useRef} from 'react';
import {useParams} from "react-router-dom";
import {goPageTop} from "../../../utils/Helpers";
import ProductDetailsSkeleton from "../../../skeleton/productSkeleton/ProductDetailsSkeleton";
import AliProductBody from "./includes/AliProductBody";
import AliRelatedProduct from "./includes/AliRelatedProduct";
import {useMediaQuery} from "react-responsive";
import {useAliProductDetails} from "../../../api/AliExpressProductApi";
import {useSettings} from "../../../api/GeneralApi";
import RecentViewProduct from "../../product/reletedProduct/RecentViewProduct";
import AliExpressProduct404 from "../../404/AliExpressProduct404";
import AliProductDetailsTab from "./includes/detailsTab/AliProductDetailsTab";
import {useQuery} from "../../../utils/customHooks";

const AliProductPage = (props) => {
	const query = useQuery();
	const query_url = query.get('url');

	const {productId} = useParams();
	const {data: settings} = useSettings();
	const {data: product, isLoading} = useAliProductDetails(query_url);

	const cardRef = useRef(null);

	const currencyIcon = settings?.currency_icon || '৳';

	const isMobile = useMediaQuery({query: '(max-width: 991px)'});

	const cartConfigured = {};

	useEffect(() => {
		goPageTop();
	}, [productId]);

	if (isLoading) {
		return <ProductDetailsSkeleton/>;
	}

	if (!product?.product_id) {
		return <AliExpressProduct404/>;
	}

	return (
		<div className="main">
			<div className="bg-gray main mt-4">
				<div className="container">

					<div className="row" ref={cardRef}>
						<div className="col-lg-9 col-md-12">
							<AliProductBody
								isMobile={isMobile}
								settings={settings}
								product={product}
								cartConfigured={cartConfigured}
							/>

							<div className="card mb-3 mb-lg-4">
								<div className="card-body">
									<AliProductDetailsTab product={product}/>
								</div>
							</div>

						</div>
						{
							!isMobile &&
							<div className="col-lg-3 d-none d-lg-block">
								<AliRelatedProduct productId={productId} cardRef={cardRef}/>
							</div>
						}
					</div>

					{
						isMobile &&
						<div className="card mb-3">
							<div className="card-body">
								<h4>Related Products</h4>
								<AliRelatedProduct productId={productId}/>
							</div>
						</div>
					}


					<div className="card mb-3">
						<div className="card-body">
							<h3>Recent View</h3>
							<RecentViewProduct currencyIcon={currencyIcon}/>
						</div>
					</div>

				</div>
			</div>
		</div>
	);
};


export default AliProductPage;

