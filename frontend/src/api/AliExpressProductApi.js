import {useMutation, useQuery} from "react-query";
import {instance} from "../utils/AxiosInstance";
import axios from "axios";
import {setGetToken} from "./CartApi";

export const useAliProductDetails = (query_url) => useQuery(["useAliProductDetails", query_url], async () => {
	try {
		const {data} = await instance.get(`aliexpress/search?query_url=${query_url}`);
		return data?.result ? JSON.parse(data?.result) : {};
	} catch (error) {
		console.log(error);
	}
});


export const useAliProductShippingInfo = (productId) => useQuery(["useAliProductShippingInfo", productId], async () => {
	try {
		const {data} = await instance.get(`aliexpress/shipment/${productId}`);
		return data?.result ? JSON.parse(data?.result) : {};
	} catch (error) {
		console.log(error);
	}
});


export const useAliProductDescription = (descriptionUrl) => useQuery(["useAliProductDescription", descriptionUrl], async () => {
	try {
		const {data} = await axios.get(descriptionUrl);
		return data;
	} catch (error) {
		console.log(error);
	}
});


export const useChooseShipping = () => useMutation(["useChooseShipping"], async (props) => {
	const token = setGetToken();
	try {
		const {data} = await instance.post(`/cart/choose-shipping`, {token, ...props});
		setGetToken(data?.cart?.cart_uid);
		return data?.cart ? data.cart : {};
	} catch (error) {
		console.log(error);
	}
});

export const useExpressService = () => useMutation(["useExpressService"], async (props) => {
	const token = setGetToken();
	try {
		const {data} = await instance.post(`/cart/choose-shipping`, {token, ...props});
		setGetToken(data?.cart?.cart_uid);
		return data?.cart ? data.cart : {};
	} catch (error) {
		console.log(error);
	}
});



export const useAliRelatedProduct = (product_id) => useQuery(["useAliRelatedProduct", product_id], async () => {
	try {
		const {data} = await instance.get(`/aliexpress/related-products/${product_id}`);
		return data?.result ? JSON.parse(data?.result) : [];
	} catch (error) {
		console.log(error);
	}
});