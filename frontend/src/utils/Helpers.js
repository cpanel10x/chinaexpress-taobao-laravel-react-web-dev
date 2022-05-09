import {
	isArray,
	isEmpty,
	isNaN,
	camelCased,
	truncate,
} from "lodash";


/**
 *
 * @param categories
 * @param parentId
 * @returns {{}|*}
 */
export const find_cat_parent = (categories, ParentId) => {
	if (!isEmpty(categories) && isArray(categories) && !isNaN(ParentId)) {
		return categories.find((find) => find.otc_id === ParentId);
	}
	return {};
};

/**
 *
 * @param category
 * @returns {string|*}
 */
export const loadCatImg = (category) => {
	const asset_base_url = process.env.REACT_APP_ASSET_ENDPOINT;
	if (!isEmpty(category)) {
		const picture = category.picture;
		if (picture) {
			return asset_base_url + "/" + picture;
		}
		const IconImageUrl = category.IconImageUrl;
		if (IconImageUrl) {
			return IconImageUrl;
		}
	}
	return asset_base_url + "/assets/img/backend/no-image-300x300.png";
};


export const loadProductImg = (product, mainPicture = "/assets/img/backend/no-image-300x300.png") => {
	const Pictures = product?.Pictures ? JSON.parse(product.Pictures) : [];
	if (Pictures?.length > 0) {
		const firstPicture = Pictures[0];
		if (firstPicture?.Medium) {
			return firstPicture?.Medium?.Url;
		}
	}
	return mainPicture;
};

/**
 *
 * @param slug
 * @returns {*}
 */
export const slugToKey = (slug) => {
	return camelCased(slug);
};

/**
 * @description go to page top
 */
export const goPageTop = () => {
	try {
		window.scroll({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	} catch (error) {
		window.scrollTo(0, 0);
	}
};


export const characterLimiter = (string, length = 42, separator = "...") => {
	return truncate(string, {
		length: length,
		separator: separator,
	});
};


export const loadAsset = (path) => {
	const basePath = process.env.REACT_APP_ASSET_ENDPOINT;
	return `${basePath}/${path}`;
};



export const checkIsEmail = (input) => {
	const format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return !!input.match(format);
};

