import React from "react";
import PropTypes from "prop-types";

import TinySlider from "tiny-slider-react";
import 'tiny-slider/dist/tiny-slider.css';

const ImgGallery = (props) => {
	const {Pictures, activeImg, PreviewUrl, Url, setActiveImg} = props;


	const settings = {
		items: 4,
		controls: true,
		controlsPosition: "bottom",
		nav: false,
		autoplay: false,
		autoplayButtonOutput: false,
		speed: 700,
		autoplayHoverPause: true,
		rewind: false,
		controlsText: ['<i class="icon-left-open"></i>', '<i class="icon-right-open"></i>'],
		mouseDrag: true
	};

	const imgStyles = {
		objectFit: "cover",
		opacity: 1,
		transition: "ease-in-out 200ms"
	};

	const activeImageUrl = (picture) => {
		const Large = picture?.Large?.Url || null;
		const Medium = picture?.Medium?.Url || null;
		const Small = picture?.Small?.Url || null;
		let active = Large ? Large : Medium;
		return active ? active : Small;
	};

	const productImage = (event, picture) => {
		event.preventDefault();
		let active = activeImageUrl(picture);
		if(active){
			setActiveImg(active);
		}
	};

	const playVideo = (event, Url) => {
		event.preventDefault();
		if(Url){
			setActiveImg(Url);
		}
	};

	if (!Pictures?.length) {
		return '';
	}

	return (
		<TinySlider settings={settings}>
			{/*{*/}
			{/*	PreviewUrl && Url &&*/}
			{/*	<div>*/}
			{/*		<a*/}
			{/*			className={`${activeImg === Url ? "active video_thumb" : " video_thumb"}`}*/}
			{/*			href={"/view"}*/}
			{/*			onClick={(event) => playVideo(event, Url)}*/}
			{/*		>*/}
			{/*			<img*/}
			{/*				className="rounded tns-lazy-img"*/}
			{/*				src={PreviewUrl || ''}*/}
			{/*				style={imgStyles}*/}
			{/*			/>*/}
			{/*			<span className="videoPlayerIcon">*/}
      {/*      <i className="icon-play"/>*/}
      {/*    </span>*/}
			{/*		</a>*/}
			{/*	</div>*/}
			{/*}*/}
			{Pictures?.map((picture, key) => (
				<div key={key}>
					<a
						className={`rounded position-relative ${activeImg === picture.Large.Url && "active"}`}
						href={activeImageUrl(picture)}
						onClick={(event) => productImage(event, picture)}
					>
						<img
							className="rounded tns-lazy-img"
							src={activeImageUrl(picture)}
							style={imgStyles}
						/>
					</a>
				</div>
			))}

		</TinySlider>
	)


};

ImgGallery.propTypes = {
	Pictures: PropTypes.array.isRequired,
};

export default ImgGallery;
