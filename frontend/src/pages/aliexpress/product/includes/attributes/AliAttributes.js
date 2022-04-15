import React, {useEffect, useState} from 'react'
import PropertyValues from "./includes/PropertyValues";

const AliAttributes = (props) => {
	const {skuProperties, setActiveImg, operationalAttributes, setOperationalAttributes} = props;

	const Properties = skuProperties?.filter(findItem => findItem.skuPropertyName !== 'ShipsFrom');
	const ShipsFrom = skuProperties?.find(findItem => findItem.skuPropertyName === 'ShipsFrom');
	const ShipsFromCountries = ShipsFrom?.skuPropertyValues?.find(value => value.propertyValueName === 'China');

	useEffect(() => {
		if (skuProperties?.length > 0) {
			let selectedProperties = {};
			skuProperties?.map((property, index) => {
				const PropertyName = property?.skuPropertyName;
				const skuPropertyValues = property?.skuPropertyValues[0];
				selectedProperties[PropertyName] = skuPropertyValues;
			});
			setOperationalAttributes(selectedProperties);
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

	return (
		<div className="mb-3">
			{
				Properties?.map((property, index) =>
					<div key={index} className="mb-3">
						<p>
							<b>{property?.skuPropertyName} : </b>
							<span className="seller_info">{selectProperty(property)?.propertyValueName || 'Unknown'}</span>
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
						<span className="seller_info">{ShipsFromCountries?.propertyValueDisplayName || 'Unknown'}</span>
					</p>
				</div>
			}
		</div>
	)
}

export default AliAttributes
