import {useMutation, useQuery} from "react-query";
import {instance} from "../utils/AxiosInstance";


export const useTabobaoProduct = (itemId) => useQuery(['product', itemId], async () => {
	try {
		const {data} = await instance.post(`/product/${itemId}`);
		return data?.item ? data?.item : {};
	} catch (error) {
		console.log(error);
	}
});


export const useProductDetails = (product_id) => useQuery(["ProductDetails", product_id], async () => {
	try {
		const {data} = await instance.get(`/product-description/${product_id}`);
		return data?.description ? data?.description : {};
	} catch (error) {
		console.log(error);
	}
});


export const useSectionProducts = (section) => useQuery(['section', section], async () => {
	try {
		const {data} = await instance.post(`get-section-products`, {section});
		return data?.products ? JSON.parse(data?.products)?.Content : [];
	} catch (error) {
		console.log(error);
	}
});


export const useRelatedProducts = (item_id) => useQuery(["relatedProducts"], async () => {
	try {
		const {data} = await instance.post(`related-products/${item_id}`);
		return data?.relatedProducts ? JSON.parse(data?.relatedProducts) : [];
	} catch (error) {
		console.log(error);
	}
});


export const useCategoryProducts = (slugKey, page = 1) => useQuery(["search", slugKey, page], async () => {
	try {
		const {data} = await instance.post(`category-products/${slugKey}`, {slugKey, page});
		return data?.products ? JSON.parse(data?.products) : {};
	} catch (error) {
		throw Error(error.response.statusText);
	}
});


export const useSearchKeyword = (keyword, page = 1) => useQuery(["search", keyword, page], async () => {
	try {
		const {data} = await instance.post(`search`, {keyword, page});
		return data?.products ? JSON.parse(data?.products) : {};
	} catch (error) {
		throw Error(error.response.statusText);
	}
});


export const useSearchPictureUpload = () => useMutation(["search-picture"], async (props) => {
	try {
		const {data} = await instance.post(`search-picture`, props);
		return data;
	} catch (error) {
		throw Error(error.response.statusText);
	}
});


export const usePictureSearch= (search_id, page = 1) => useQuery(["picture", search_id, page], async () => {
	try {
		const {data} = await instance.post(`get-picture-result/${search_id}`,{page});
		return data?.products ? JSON.parse(data?.products) : {};
	} catch (error) {
		throw Error(error.response.statusText);
	}
});





















