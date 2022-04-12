const PropertyValues = (props) => {
	const {PropertyValues, skuPropertyName, selectProperty, selectAttribute, setActiveImg} = props;

	const isExistOnSelectAttr = (Attribute, className = 'isSelect') => {
		if (selectProperty?.propertyValueIdLong === Attribute.propertyValueIdLong) {
			return className;
		}
		return '';
	};


	return (
		<div className="clearfix product-nav product-nav-thumbs">
			{
				PropertyValues.map((Attribute, key) =>
					<div
						key={key}
						onClick={() => selectAttribute(skuPropertyName, Attribute)}
						className={`attrItem text-center ${isExistOnSelectAttr(Attribute)}`}
						title={Attribute?.propertyValueName}
					>
						{Attribute?.skuPropertyImagePath ?
							<img src={Attribute?.skuPropertyImagePath}
							     onClick={() => setActiveImg(Attribute?.skuPropertyImagePath)}
							     alt={Attribute?.propertyValueName}
							     style={{width: '2.5rem', height: '2.5rem'}}/>
							: Attribute?.propertyValueName
						}
					</div>
				)}
		</div>
	);
};

export default PropertyValues;