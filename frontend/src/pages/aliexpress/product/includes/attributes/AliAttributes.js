import React, {useEffect} from 'react'
import PropertyValues from "./includes/PropertyValues";

const AliAttributes = (props) => {
	const {skuProperties, setActiveImg, operationalAttributes, setOperationalAttributes} = props;

	const Properties = skuProperties?.filter(findItem => findItem.skuPropertyName !== 'Ships From');
	const ShipsFrom = skuProperties?.find(findItem => findItem.skuPropertyName === 'Ships From');
	const ShipsFromCountries = ShipsFrom?.skuPropertyValues?.find(value => value.propertyValueName === 'China');

	useEffect(() => {
		if (skuProperties?.length > 0) {
			let selectedProperties = {};
			skuProperties?.map((property, index) => {
				const PropertyName = property?.skuPropertyName;
				selectedProperties[PropertyName] = property?.skuPropertyValues[0];
			});
			if (ShipsFromCountries) {
				setOperationalAttributes({...selectedProperties, ['Ships From']: ShipsFromCountries});
			} else {
				setOperationalAttributes(selectedProperties);
			}
		}
	}, [skuProperties]);

	const selectAttribute = (skuPropertyName, Attribute) => {
		setOperationalAttributes({
			...operationalAttributes,
			[skuPropertyName]: Attribute
		});
	};

	const selectProperty = (property) => {
		const skuPropertyName = property?.skuPropertyName;
		return operationalAttributes?.[skuPropertyName];
	};

	// console.log('operationalAttributes', operationalAttributes);

	return (
		<div className="mb-3">
			{
				Properties?.map((property, index) =>
					<div key={index} className="mb-3">
						<p>
							<b>{property?.skuPropertyName} : </b>
							<span className="seller_info">{selectProperty(property)?.propertyValueDisplayName || 'Unknown'}</span>
						</p>
						<PropertyValues
							skuPropertyName={property?.skuPropertyName}
							PropertyValues={property?.skuPropertyValues}
							selectProperty={selectProperty(property)}
							selectAttribute={selectAttribute}
							setActiveImg={setActiveImg}
						/>
					</div>
				)
			}
			{
				ShipsFromCountries?.propertyValueDisplayName &&
				<div>
					<p>
						<b>Ship From : </b>
						<span className="seller_info">{selectProperty(ShipsFrom)?.propertyValueDisplayName || 'Unknown'}</span>
					</p>
				</div>
			}
		</div>
	)
}

export default AliAttributes
