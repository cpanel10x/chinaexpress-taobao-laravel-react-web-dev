import React, {useRef, useEffect} from "react";
import {isArray} from "lodash";
import TinySlider from "tiny-slider-react";
import 'tiny-slider/dist/tiny-slider.css';

const ImgGallery = (props) => {
	const {smallImages, activeImg, PreviewUrl, Url} = props;
	const ref = useRef(null);

	useEffect(() => {
		setTimeout(() => {
			ref?.current?.click();
		}, 3000); //mileSeconds
	}, []);

	return (
		<TinySlider className="owl-carousel owl-simple carousel-equal-height " settings={{
			lazyload: true,
			nav: false,
			mouseDrag: true
		}}>
			{isArray(smallImages) &&
			smallImages.map((picture, key) => (
				<a
					key={key}
					className={activeImg === picture ? " active" : ""}
					href="/view"
					onClick={(e) => (e.preventDefault(), props.setActiveImg(picture))}
				>
					<img
						src={picture}
						alt="product side"
					/>
				</a>
			))}
		</TinySlider>
	);

};


export default ImgGallery;
