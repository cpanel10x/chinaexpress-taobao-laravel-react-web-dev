import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import { useMediaQuery } from "react-responsive";
import PlayCircleIcon from "../../../../../icons/PlayCircleIcon";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Zoom, Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/zoom";
import "swiper/css/navigation";
import "swiper/css/pagination";

const MediaPart = (props) => {
  const { product, activeImg, setActiveImg } = props;

  const Videos = product?.Videos?.length > 0 ? product?.Videos[0] : {};
  const PreviewUrl = Videos?.PreviewUrl || null;
  const Url = Videos?.Url || null;

  const isMobile = useMediaQuery({ query: "(max-width: 991px)" });

  useEffect(() => {
    if (Url && PreviewUrl) {
      setActiveImg(PreviewUrl);
    }
  }, [PreviewUrl, Url]);

  let Pictures = product?.Pictures || [];

  const activeImageUrl = (picture) => {
    const Large = picture?.Large?.Url || null;
    const Medium = picture?.Medium?.Url || null;
    const Small = picture?.Small?.Url || null;
    let active = Large ? Large : Medium;
    return active ? active : Small;
  };

  return (
    <div className="product-gallery product-gallery-vertical">
      <figure
        className="product-main-image d-flex"
        style={{ width: "100%", height: isMobile ? "370px" : "360px" }}
      >
        <Swiper
          zoom={true}
          pagination={{
            clickable: true,
          }}
          modules={[Zoom, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="player-wrapper">
              <ReactPlayer
                className="react-player "
                url={Url}
                playing={true}
                muted={true}
                controls={true}
                light={PreviewUrl}
                loop={true}
                pip={false}
                playIcon={<PlayCircleIcon />}
                width="100%"
                height="100%"
              />
            </div>
          </SwiperSlide>
          {Pictures?.map((picture, index) => (
            <SwiperSlide key={index}>
              <div className="swiper-zoom-container">
                <a
                  className={`rounded position-relative`}
                  href={activeImageUrl(picture)}
                  onClick={(event) => event.preventDefault()}
                >
                  <InnerImageZoom
                    src={activeImageUrl(picture)}
                    zoomSrc={activeImageUrl(picture)}
                    zoomType="click"
                  />
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </figure>
    </div>
  );
};

MediaPart.propTypes = {
  product: PropTypes.object.isRequired,
};

export default MediaPart;
