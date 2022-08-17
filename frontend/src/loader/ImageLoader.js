import { Image } from "antd";
import React from "react";
import LoaderImg from './../assets/img/loader.png';


const ImageLoader = ({ path, width, height }) => {
    return (
        <>
            <Image
                width={width ? width : 80}
                height={height ? height : 80}
                preview={false}
                src={path}
                placeholder={
                    <Image
                        width={width ? width : 80}
                        height={height ? height : 80}
                        src={LoaderImg}
                    />
                }
                fallback={LoaderImg}
            />
        </>
    );
}

export default ImageLoader;