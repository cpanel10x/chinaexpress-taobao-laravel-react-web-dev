import React from "react";
import PropTypes from "prop-types";
import {
	cartColorAttributes,
	cartProductQuantityUpdate,
	numberWithCommas
} from "../../../utils/CartHelpers";
import {Link} from "react-router-dom";
import _ from "lodash";
import AttributeImage from "./attributes/AttributeImage";
import AttrConfigs from "./attributes/AttrConfigs";
import ItemCheck from "./tableComponents/ItemCheck";
import CheckoutQuantity from "./tableComponents/CheckoutQuantity";

const TableConfigItems = props => {
	const {currency, product, variations} = props;

	const weight = product?.weight || 0;
	const shipping_rate = product?.shipping_rate || 650;

	const approxWeight = (qty) => {
		const itemWeight = Number(weight) * Number(qty);
		return Number(itemWeight).toFixed(3);
	};

	return (
		<React.Fragment>
			{
				variations?.map(variation =>
					<>
						<tr>
							<td className="align-middle text-center" rowSpan={3}>
								<ItemCheck product={product} variation={variation}/>
							</td>
							<td className="align-middle text-center" style={{width: "8rem"}} rowSpan={3}>
								<AttributeImage product={product} attributes={variation?.attributes}/>
							</td>
							<td colSpan={2}>
								<div className="product_title">
									<Link to={`/product/${product.ItemId}`} title={product.Title}>
										{product.Title}
									</Link>
								</div>
							</td>
						</tr>
						<tr>
							<td colSpan={2}>
								<span className="mr-1">Weight: <b>{approxWeight(variation.qty)} Kg.</b></span>
								<span>Shipping Rate: <b>{currency + ' ' + shipping_rate}</b> per Kg.</span>
							</td>
						</tr>
						<tr key={variation.id}>
							<td className="align-middle">
								<div className="Attributes">
									<AttrConfigs attributes={variation?.attributes}/>
								</div>
								<div className="clearfix">
									<div className="price float-left">
										<span>{` ${currency + ' ' + variation.price} `}</span>
									</div>
									<div className="float-left manage-quantity mr-3 my-2" style={{maxWidth: "155px"}}>
										<CheckoutQuantity product={product} variation={variation}/>
									</div>
									<div className="maxQuantityText float-left">
										Max: {variation.maxQuantity}
									</div>
								</div>
							</td>
							<td className="align-middle text-center" style={{width: "7rem"}}>
								{`${currency + ' ' + Math.round(Number(variation.qty) * Number(variation.price))}`}
							</td>
						</tr>
					</>
				)
			}
		</React.Fragment>
	);
};


export default TableConfigItems;
