import { Image } from "antd";
import React from "react";
import LoaderImg from './../assets/img/loader.png';


const ImageLoader = ({ className, path, width, height, loader }) => {
    return (
        <>
            <Image
                className={className}
                width={width ? width : 'auto'}
                height={height ? height : 'auto'}
                preview={false}
                src={path}
                placeholder={
                    <Image
                        width={width ? width : 80}
                        height={height ? height : 80}
                        src={LoaderImg}
                    />
                }
                fallback={loader ? loader : LoaderImg}
            />
        </>
    );
}

export default ImageLoader;