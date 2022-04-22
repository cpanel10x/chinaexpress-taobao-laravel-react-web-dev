const PropertyValues = (props) => {
	const {PropertyValues, skuPropertyName, selectProperty, selectAttribute, setActiveImg} = props;

	const isExistOnSelectAttr = (Attribute, className = 'isSelect') => {
		if (selectProperty?.vid === Attribute.vid) {
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
						title={Attribute?.name}
					>
						{Attribute?.image ?
							<img src={Attribute?.image}
							     onClick={() => setActiveImg(Attribute?.image)}
							     alt={Attribute?.name}
							     style={{width: '2.5rem', height: '2.5rem'}}/>
							: Attribute?.name
						}
					</div>
				)}
		</div>
	);
};

export default PropertyValues;