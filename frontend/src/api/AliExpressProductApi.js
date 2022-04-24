import {useMutation, useQuery} from "react-query";
import {instance} from "../utils/AxiosInstance";
import axios from "axios";
import {setGetToken} from "./CartApi";

export const useAliSearchProduct = () => useMutation("useAliSearchProduct", async (props) => {
	try {
		const {data} = await instance.post(`aliexpress/search`, props);
		return data;
	} catch (error) {
		console.log(error);
	}
});

export const useAliProductDetails = (product_id) => useQuery(["useAliProductDetails", product_id], async () => {
	try {
		const {data} = await instance.get(`aliexpress/product/${product_id}`);
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

export const useAliProductWeight = () => useMutation("useAliProductWeight", async (props) => {
	try {
		const {data} = await instance.post(`/aliexpress/shipping-weight`, props);
		return data?.result ? JSON.parse(data?.result) : [];
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



export const useAliSellerProducts = (seller_id) => useQuery(["useAliSellerProducts", seller_id], async () => {
	try {
		const {data} = await instance.get(`/aliexpress/seller-products?seller_id=${seller_id}`);
		return data?.result ? JSON.parse(data?.result) : [];
	} catch (error) {
		console.log(error);
	}
});