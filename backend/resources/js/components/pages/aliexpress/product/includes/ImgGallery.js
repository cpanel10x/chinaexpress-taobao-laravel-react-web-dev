import React, {useRef, useEffect} from "react";
import {isArray} from "lodash";
import OwlCarousel from "react-owl-carousel";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const ImgGallery = (props) => {
    const {smallImages, activeImg, PreviewUrl, Url} = props;
    const ref = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            ref?.current?.click();
        }, 3000); //mileSeconds
    }, []);

    return (
        <OwlCarousel
            className="owl-carousel owl-simple carousel-equal-height "
            loop={false}
            margin={5}
            nav={true}
            dots={false}
            responsive={{
                0: {items: 5},
            }}
        >
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

        </OwlCarousel>
    );

};


export default ImgGallery;
