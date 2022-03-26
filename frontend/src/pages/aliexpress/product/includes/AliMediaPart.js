import React from "react";
import ImgGallery from "./ImgGallery";
import InnerImageZoom from 'react-inner-image-zoom';

const AliMediaPart = (props) => {
  const { smallImages, activeImg } = props;


  return (
    <div className="product-gallery product-gallery-vertical">
      <div className="row">
        <figure className="product-main-image">

          <InnerImageZoom src={activeImg} zoomSrc={activeImg} />

        </figure>

        <ImgGallery
          setActiveImg={props.setActiveImg}
          activeImg={activeImg}
          smallImages={smallImages}
        />
      </div>
    </div>
  );
};


export default AliMediaPart;
