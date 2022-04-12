import React, {useEffect, useState} from 'react'
import PropertyValues from "./includes/PropertyValues";

const AliAttributes = (props) => {
	const {skuProperties, setActiveImg, operationalAttributes, setOperationalAttributes} = props;

	const Properties = skuProperties.filter(findItem => findItem.skuPropertyName !== 'ShipsFrom');
	const ShipsFrom = skuProperties.find(findItem => findItem.skuPropertyName === 'ShipsFrom');
	const ShipsFromCountries = ShipsFrom.skuPropertyValues.find(value => value.propertyValueName === 'China');

	useEffect(() => {
		if (Properties?.length > 0) {
			Properties?.map((property, index) => {
				if (index === 0) {
					const PropertyName = property?.skuPropertyName;
					const skuPropertyValues = property?.skuPropertyValues[0];
					const exists = operationalAttributes?.[PropertyName];
					if (!exists) {
						setOperationalAttributes({
							...operationalAttributes,
							[PropertyName]: skuPropertyValues
						});
					}
				}
			});
		}

		const existsShipsFrom = operationalAttributes?.ShipsFrom;
		if (!existsShipsFrom) {
			setOperationalAttributes({
				...operationalAttributes,
				ShipsFrom: ShipsFromCountries
			});
		}
	}, [Properties, ShipsFromCountries]);


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
			<div>
				<p>
					<b>ShipsFrom : </b>
					<span className="seller_info">{ShipsFromCountries?.propertyValueDisplayName || 'Unknown'}</span>
				</p>
			</div>
		</div>
	)
}

export default AliAttributes
