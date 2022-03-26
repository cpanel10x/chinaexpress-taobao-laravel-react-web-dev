import React from 'react';
import MegaMenuItem from "./MegaMenuItem";
import {Link} from "react-router-dom";
import {loadAsset} from "../../../../../utils/Helpers";

const CategoryType = ({categories, parent}) => {

	if (parent?.children_count) {
		return <MegaMenuItem categories={categories} parent={parent}/>
	}

	return (
		<li>
			<Link to={`/shop/${parent.slug}`}>
				{
					parent?.icon ?
						<img src={loadAsset(parent.icon)}
						     style={{width: "20px", display: "inline", marginRight: "1rem"}}
						     alt={parent.name}/>
						:
						<i className="icon-laptop"/>
				}
			</Link>
		</li>
	)
};

export default CategoryType;