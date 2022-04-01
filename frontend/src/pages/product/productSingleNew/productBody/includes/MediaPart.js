import React from "react";
import PropTypes from "prop-types";
import ImgGallery from "./ImgGallery";
import ReactPlayer from "react-player";
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';

const MediaPart = (props) => {
   const {product, activeImg, setActiveImg} = props;

   const Videos = product?.Videos?.length > 0 ? product?.Videos[0] : {};
   const PreviewUrl = Videos?.PreviewUrl || null;
   const Url = Videos?.Url || null;

   return (
      <div className="product-gallery product-gallery-vertical">
         <figure className="product-main-image">
            {activeImg === Url && Url ? (
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
               <InnerImageZoom
                  src={activeImg ? activeImg : product.MainPictureUrl}
                  zoomSrc={activeImg ? activeImg : product.MainPictureUrl}
                  zoomType="click"
               />
            )}
         </figure>
         <ImgGallery
            PreviewUrl={PreviewUrl}
            Url={Url}
            setActiveImg={setActiveImg}
            activeImg={activeImg}
            Pictures={product.Pictures}
         />
      </div>
   );
};

MediaPart.propTypes = {
   product: PropTypes.object.isRequired,
};

export default MediaPart;
