import React from "react";
import BrowseCategories from "./includes/BrowseCategories";
import OwlCarousel from "react-owl-carousel";
import {loadAsset} from "../../../../utils/Helpers";
import BannerSkeleton from "../../../../skeleton/BannerSkeleton";
import {SwrGetRequest} from "../../../../utils/SwrRequests";

const Intro = () => {

	const {resData, isLoading} = SwrGetRequest(`/default/banners`);

	const banners = resData?.data?.banners;

	return (
		<div className="intro-section">
			<div className="container mt-0 mt-md-2">
				<div className="row">
					<div className="col-lg-9">
						<div className="row">
							<div className="col-lg-3 cols d-none d-lg-block">
								<BrowseCategories/>
							</div>
							<div className="col-lg-9 cols col-md-12 col-12 mb-md-0 mb-2 p-lg-0">
								<div className="intro-slider-container">
									{banners && !isLoading ? (
										<OwlCarousel
											className="intro-slider owl-carousel owl-theme owl-nav-inside row cols-1"
											loop={false}
											margin={0}
											dots={false}
											nav={false}
											autoplayTimeout={10000}
											responsive={{
												0: {items: 1},
												480: {items: 1},
												576: {items: 1},
												768: {items: 1},
												992: {items: 1},
												1200: {items: 1},
											}}
										>
											{banners.map((banner, key) => (
												<div
													key={key}
													className="intro-slide bg-image d-flex align-items-center"
													style={{
														backgroundColor: "#e9e9e9",
														backgroundImage: `url(${loadAsset(
															banner.post_thumb
														)})`,
													}}
												/>
											))}
										</OwlCarousel>
									) : (
										<BannerSkeleton/>
									)}
								</div>
							</div>
						</div>
					</div>

					<div className="col-md-3 d-none d-lg-block">
						<a href="#">
							<img src={`/img/demo14-banner1.png`} style={{height: "442px"}} className="img-fluid"/>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Intro;
