import axios from "axios";
import {useMutation, useQuery} from "react-query";

export const useSettings = () => useQuery("settings", async () => {
	try {
		const {data} = await axios.post(`/default/general`, process);
		return data?.settings ? JSON.parse(data?.settings) : {};
	} catch (error) {
		throw Error(error.response.statusText);
	}
});


export const useWishList = () => useQuery("wishlist", async () => {
	try {
		const {data} = await axios.post(`/default/wishlist`, process);
		return data?.wishlists ? data?.wishlists : [];
	} catch (error) {
		throw Error(error.response.statusText);
	}
});


export const getSectionProducts = async (section) => {
	try {
		const {data} = await axios.post(`/default/get-section-products`, {section});
		return data;
	} catch (error) {
		throw Error(error.response.statusText);
	}
};


export const getSingleProducts = async (itemId) => {
	try {
		const {data} = await axios.post(`/default/product/${itemId}`, {});
		return data;
	} catch (error) {
		throw Error(error.response.statusText);
	}
};

export const useAllCategories = () => useQuery('allCategories', async () => {
	try {
		const startTime = new Date().getTime(); //one hour from now
		let saveData = localStorage.getItem('cats');
		saveData = saveData ? JSON.parse(saveData) : {};
		let expire = saveData?.expire || startTime;
		if (startTime < expire) {
			console.log('load cache');
			return saveData?.data;
		} else {
			const {data} = await axios.post(`/default/categories`, {}, {withCredentials: true});
			const expire = new Date(startTime + 30 * 60000).getTime(); // expire after 30 minutes
			const categories = data?.categories ? data?.categories : [];
			localStorage.setItem('cats', JSON.stringify({expire: expire, data: categories}));
			console.log('load server');
			return categories;
		}
	} catch (error) {
		throw Error(error.response.statusText);
	}
});


export const useSearchKeyword = (keyword, page = 1) => useMutation(["search", keyword, page], async ({...props}) => {
	try {
		const {data} = await axios.post(`/default/search`, props);
		return data?.products ? JSON.parse(data?.products) : {};
	} catch (error) {
		throw Error(error.response.statusText);
	}
});
















