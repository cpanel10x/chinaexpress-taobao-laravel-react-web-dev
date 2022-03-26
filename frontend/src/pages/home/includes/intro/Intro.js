import React from "react";
import BrowseCategories from "./includes/BrowseCategories";
import {loadAsset} from "../../../../utils/Helpers";
import BannerSkeleton from "../../../../skeleton/BannerSkeleton";
import TinySlider from "tiny-slider-react";
import 'tiny-slider/dist/tiny-slider.css';
import {useHome} from "../../../../api/GeneralApi";

const Intro = () => {

	const {banner: {data: banners, isLoading}} = useHome();


	const imgStyles = {
		objectFit: "cover",
		opacity: 1,
		transition: "ease-in-out 200ms"
	};

	const settings = {
		controls: true,
		controlsPosition: "bottom",
		nav: false,
		autoplay: true,
		autoplayButtonOutput: false,
		speed: 700,
		autoplayHoverPause: true,
		rewind: false,
		controlsText: ['<i class="icon-left-open"></i>', '<i class="icon-right-open"></i>'],
		mouseDrag: true
	};

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
									{banners?.length > 0 && !isLoading ? (
										<TinySlider settings={settings}>
											{
												banners.map((banner, index) => (
													<div key={index} style={{position: "relative"}}>
														<img
															className={`tns-lazy-img`}
															src={loadAsset(banner.post_thumb)}
															data-src={loadAsset(banner.post_thumb)}
															style={imgStyles}
														/>
													</div>
												))
											}
										</TinySlider>
									) : (
										<BannerSkeleton/>
									)}
								</div>
							</div>
						</div>
					</div>

					<div className="col-md-3 d-none d-lg-block">
						<a href="#">
							<img src={loadAsset(`img/demo14-banner1.jpg`)} className="img-fluid"/>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Intro;
