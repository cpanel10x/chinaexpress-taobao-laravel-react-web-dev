import {useQuery} from "react-query";
import {instance} from "../utils/AxiosInstance";

export const useAliProductDetails = (productId) => useQuery(["useAliProductDetails", productId], async () => {
	try {
		const {data} = await instance.get(`aliexpress/product/${productId}`);
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