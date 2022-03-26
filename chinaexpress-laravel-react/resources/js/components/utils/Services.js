import {axiosFileUpload, axiosInstance} from "./AxiosDefault";
import _ from "lodash";
import axios from "axios";
import {setGlobalErrors} from "./GlobalStateControl";

export const getProductDescription = async (product_id) => {
	return await axiosInstance
		.get(`/api/v1/product-description/${product_id}`)
		.then((res) => {
			const resData = res.data;
			if (!_.isEmpty(resData)) {
				return resData.data;
			}
			return {};
		});
};

export const getProductSellerInfo = async (VendorId) => {
	return await axiosInstance
		.get(`/api/v1/product-seller-information/${VendorId}`)
		.then((res) => {
			const resData = res.data;
			if (!_.isEmpty(resData)) {
				return resData.data;
			}
			return {};
		});
};

export const loadRecentProducts = async () => {
	return await axiosInstance
		.get("/api/v1/recent-products")
		.then((res) => {
			const resData = res.data;
			if (!_.isEmpty(resData)) {
				return resData.data;
			}
			return {};
		})
		.catch((error) => {
			setGlobalErrors(error.response);
		});
};

export const loadLovingProducts = async () => {
	return await axiosInstance
		.get("/api/v1/loving-products")
		.then((res) => {
			const resData = res.data;
			if (!_.isEmpty(resData)) {
				return resData.data;
			}
			return {};
		})
		.catch((error) => {
			setGlobalErrors(error.response);
		});
};



export const loadRelatedProducts = async (item_id) => {
	return await axiosInstance
		.get(`/api/v1/related-products/${item_id}`)
		.then((res) => {
			const resData = res.data;
			if (!_.isEmpty(resData)) {
				return resData.data;
			}
			return {};
		})
		.catch((error) => {
			setGlobalErrors(error.response);
		});
};

export const storeNewAddress = async (storeData) => {
	return await axios
		.post("/default/store-new-address", storeData)
		.then((res) => {
			const resData = res.data;
			if (!_.isEmpty(resData)) {
				return resData.data;
			}
			return {};
		})
		.catch((error) => {
			setGlobalErrors(error.response);
		});
};

export const deleteCustomerAddress = async (deleteData) => {
	return await axios
		.post("/api/delete-address", deleteData)
		.then((res) => {
			const resData = res.data;
			if (!_.isEmpty(resData)) {
				return resData.data;
			}
			return {};
		})
		.catch((error) => {
			setGlobalErrors(error.response);
		});
};


export const getCustomerAllOrders = async () => {
	return await axiosInstance
		.get("/default/orders")
		.then((res) => {
			const resData = res.data;
			if (!_.isEmpty(resData)) {
				return resData.data;
			}
			return {};
		})
		.catch((error) => {
			setGlobalErrors(error.response);
		});
};

export const loadCategoryProducts = async (slug, offset, limit) => {
	return await axiosInstance
		.post(`/api/v1/category-products/${slug}`, {
			offset: offset,
			limit: limit,
		})
		.then((response) => {
			const responseData = response.data;
			if (!_.isEmpty(responseData)) {
				return responseData.data;
			}
			return [];
		})
		.catch((error) => {
			setGlobalErrors(error.response);
		});
};

export const loadTextSearchProducts = async (searchKey, offset, limit) => {
	return await axiosInstance
		.post(`/api/v1/get-search-result/${searchKey}`, {
			offset: offset,
			limit: limit,
		})
		.then((response) => {
			const responseData = response.data;
			if (!_.isEmpty(responseData)) {
				return responseData.data;
			}
			return [];
		})
		.catch((error) => {
			setGlobalErrors(error.response);
		});
};

export const loadPictureSearchProducts = async (data) => {
	return await axiosFileUpload
		.post(`/default/search-picture`, data)
		.then((response) => {
			return response?.data?.data;
		});
};




