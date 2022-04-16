import React from 'react';
import {Link} from "react-router-dom";

const AttributeImage = (props) => {
	const {product, attributes} = props;

	const MainPictureUrl = product?.MainPictureUrl;
	const ItemId = product?.ItemId;
	const parseAttributes = attributes ? JSON.parse(attributes) : [];
	const findPicture = parseAttributes?.find(find => find.MiniImageUrl || find.ImageUrl);
	const imagePath = findPicture ? (findPicture?.MiniImageUrl ? findPicture?.MiniImageUrl : findPicture?.ImageUrl) : MainPictureUrl;

	const ProviderType = product?.ProviderType;
	const product_link = ProviderType === 'aliexpress' ? `/aliexpress/search?url=https://www.aliexpress.com/item/${ItemId}.html` : `/product/${ItemId}`;


	return (
		<figure className="m-0">
			<Link to={product_link}>
				<img className="img-fluid mx-auto" src={imagePath} alt="attributes"/>
			</Link>
		</figure>
	);
};

export default AttributeImage;