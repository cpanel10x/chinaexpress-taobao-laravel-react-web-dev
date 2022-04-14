import {useQuery} from "react-query";
import {instance} from "../utils/AxiosInstance";
import axios from "axios";

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