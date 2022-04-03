import React, { useEffect } from "react";
import { isArray } from "lodash";
import ImgGallery from "./ImgGallery";
import {
  SideBySideMagnifier,
  MOUSE_ACTIVATION,
  TOUCH_ACTIVATION,
} from "react-image-magnifiers";

const AliMediaPart = (props) => {
  const { smallImages, activeImg } = props;


  return (
    <div className="product-gallery product-gallery-vertical">
      <div className="row">
        <figure className="product-main-image">
          <SideBySideMagnifier
            imageSrc={activeImg}
            imageAlt={'AliExpress'}
            // onImageLoad={true}
            mouseActivation={MOUSE_ACTIVATION.click} // Optional
            touchActivation={TOUCH_ACTIVATION.TAP} // Optional
            fillAvailableSpace={false} // if false fillGapLeft not working
          // fillGapLeft={15}
          // fillGapRight={8}
          // fillGapTop={12}
          // fillGapBottom={10}
          />
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
