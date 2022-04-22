import React, {useEffect} from "react";
import AliImgGallery from "./AliImgGallery";
import InnerImageZoom from 'react-inner-image-zoom';
import ReactPlayer from "react-player";

const AliMediaPart = (props) => {
	const {product, imagePathList, activeImg, setActiveImg} = props;

	const firstImage = imagePathList?.length > 0 ? imagePathList[0] : '';
	const PreviewUrl =  '';
	const Url = '';

	useEffect(() => {
		if (firstImage) {
			setActiveImg(firstImage);
		}
	}, [firstImage]);

	return (
		<div className="product-gallery product-gallery-vertical">
			<figure className="product-main-image">
				{
					activeImg === PreviewUrl ?
						<div className="previewVideoThumb">
							<img src={PreviewUrl} alt=""/>
							<div className="videoPlayerIcon" onClick={() => setActiveImg(Url)}>
								<i className="icon-play-circled"/>
							</div>
						</div>
						:
						activeImg === Url ? (
							<ReactPlayer
								muted={true}
								playing={true}
								controls={true}
								playsinline={true}
								loop={true}
								width="100%"
								height="auto"
								url={Url}
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
				PreviewUrl={PreviewUrl}
				Url={Url}
				setActiveImg={setActiveImg}
				activeImg={activeImg}
				Pictures={imagePathList}
			/>
		</div>
	);
};


export default AliMediaPart;
