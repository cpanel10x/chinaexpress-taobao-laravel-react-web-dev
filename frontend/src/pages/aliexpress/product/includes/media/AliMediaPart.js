import React, {useEffect} from "react";
import AliImgGallery from "./AliImgGallery";
import InnerImageZoom from 'react-inner-image-zoom';
import ReactPlayer from "react-player";

const AliMediaPart = (props) => {
	const {product, imagePathList, activeImg, setActiveImg} = props;

	const {thumbnail, url: videoUrl} = product?.item?.video || {};


	return (
		<div className="product-gallery product-gallery-vertical">
			<figure className="product-main-image">
				{
					activeImg === thumbnail ?
						<div className="previewVideoThumb">
							<img src={thumbnail} alt=""/>
							<div className="videoPlayerIcon" onClick={() => setActiveImg(videoUrl)}>
								<i className="icon-play-circled"/>
							</div>
						</div>
						:
						activeImg === videoUrl ? (
							<ReactPlayer
								muted={true}
								playing={true}
								controls={true}
								playsinline={true}
								loop={true}
								width="100%"
								height="auto"
								url={videoUrl}
							/>
						) : (
							activeImg &&
							<InnerImageZoom
								src={activeImg}
								zoomSrc={activeImg}
								zoomType="click"
							/>
						)
				}
			</figure>
			<AliImgGallery
				PreviewUrl={thumbnail}
				Url={videoUrl}
				setActiveImg={setActiveImg}
				activeImg={activeImg}
				Pictures={imagePathList}
			/>
		</div>
	);
};


export default AliMediaPart;
