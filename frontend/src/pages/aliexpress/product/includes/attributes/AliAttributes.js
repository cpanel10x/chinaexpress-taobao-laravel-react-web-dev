import React from 'react'

const AliAttributes = (props) => {
	const {colorSkuPropertyValues, setActiveImg} = props;

	const selectAttribute = (e, color) => {
		e.preventDefault();
		const ImagePath = color?.skuPropertyImagePath;
		if (ImagePath) {
			setActiveImg(ImagePath)
		}
	};

	return (
		<div className="clearfix product-nav product-nav-thumbs">
			{
				colorSkuPropertyValues.map((color, key) =>
					<div
						key={key}
						onClick={e => selectAttribute(e, color)}
						className={`attrItem text-center `}
						title={color?.propertyValueDisplayName}
					>
						{/*{index2 === 0 && setFirstAttributeOnLoad(group.key, Attribute)}*/}
						{color?.skuPropertyImagePath ?
							<img src={color?.skuPropertyImagePath}
							     onClick={() => setActiveImg(color?.skuPropertyImagePath)}
							     alt={color?.propertyValueDisplayName}
							     style={{width: '2.5rem', height: '2.5rem'}}/>
							: color?.propertyValueDisplayName
						}
					</div>
				)}
		</div>
	)
}

export default AliAttributes
