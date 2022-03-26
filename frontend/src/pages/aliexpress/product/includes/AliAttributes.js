import React from 'react'

const AliAttributes = ({colorSkuPropertyValues, setActiveImg}) => {

    const selectAttribute = (e, color) => {
        e.preventDefault();
        const ImagePath = color?.skuPropertyImagePath;
        if (ImagePath) {
            setActiveImg(ImagePath)
        }
    };

    return (
        <div className="clearfix product-nav product-nav-thumbs">
            {colorSkuPropertyValues.map((color, key) => (
                <a
                    href={`/color/${color?.propertyValueDisplayName}`}
                    key={key}
                    onClick={e => selectAttribute(e, color)}
                    className={`text-center`}
                    title={color?.propertyValueDisplayName}
                >
                    {color?.skuPropertyImagePath ?
                        <img src={color?.skuPropertyImagePath} style={{width: "40px", height: "40px"}}/>
                        : <span className="plain_attribute">{color?.propertyValueDisplayName}</span>
                    }
                </a>))}
        </div>
    )
}

export default AliAttributes
