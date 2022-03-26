import axios from "axios";
import {useMutation, useQuery, useQueryClient} from "react-query";
import swal from "sweetalert";


const setGetToken = (token = null) => {
	let token_key = token;
	if (token) {
		window.localStorage.setItem('cart_token', token)
	} else {
		token_key = window.localStorage.getItem('cart_token');
	}
	return token_key;
};


export const cartMutation = () => {

	const cache = useQueryClient();
	const token = setGetToken();

	const checkedUnchecked = useMutation(["cartAllCheckedUnchecked"], async (props) => {
		try {
			const {data} = await axios.post(`/default/cart/checkbox`, {token: token, ...props});
			const cart = data?.cart ? data.cart : {};
			cache.setQueryData('customer_cart', cart);
		} catch (error) {
			console.log(error);
		}
	});

	const removeCart = useMutation(["removeCart"], async (props) => {
		try {
			const {data} = await axios.post(`/default/cart/remove`, {token: token, ...props});
			return data?.cart ? data.cart : {};
		} catch (error) {
			console.log(error);
		}
	}, {
		onSuccess: (cart) => {
			cache.setQueryData('customer_cart', cart);
		}
	});

	const PaymentMethod = useMutation(["updatePaymentMethod"], async (props) => {
		try {
			const {data} = await axios.post(`/default/cart/payment-method`, {token: token, ...props});
			const cart = data?.cart ? data.cart : {};
			cache.setQueryData('customer_cart', cart);
			return cart;
		} catch (error) {
			console.log(error);
		}
	});

	const confirmOrder = useMutation("confirmOrder", async (props) => {
		try {
			const {data} = await axios.post(`/default/cart/place-order`, {token: token, ...props});
			const cart = data?.cart ? data.cart : {};
			cache.setQueryData('customer_cart', cart);
		} catch (error) {
			console.log(error);
		}
	});

	return {
		checkedUnchecked,
		removeCart,
		PaymentMethod,
		confirmOrder
	}
};

export const useCart = () => useQuery("customer_cart", async () => {
	const token = setGetToken();
	try {
		const {data} = await axios.post(`/default/cart`, {token}, {withCredentials: true});
		setGetToken(data?.cart_token);
		return data?.cart ? data?.cart : {};
	} catch (error) {
		throw Error(error.response.statusText);
	}
});


export const addItemToWishList = async (processData) => {
	try {
		const {data} = await axios.post(`/default/add-to-wishlist`, processData, {withCredentials: true});
		return data;
	} catch (error) {
		throw Error(error.response.statusText);
	}
};

export const removeItemFromWishList = async (processData) => {
	try {
		const {data} = await axios.post(`/default/remove-wishlist`, processData, {withCredentials: true});
		return data;
	} catch (error) {
		throw Error(error.response.statusText);
	}
};

export const addToCart = async (processData) => {
	const token = setGetToken();
	try {
		const {data} = await axios.post(`/default/cart/add`, {token: token, ...processData}, {withCredentials: true});
		return data;
	} catch (error) {
		throw Error(error.response.statusText);
	}
};

export const updateCart = async (processData) => {
	const token = setGetToken();
	try {
		const {data} = await axios.post(`/default/cart/update`, {token: token, ...processData}, {withCredentials: true});
		return data;
	} catch (error) {
		throw Error(error.response.statusText);
	}
};


// manage shipping address
export const shippingAddress = async () => {
	const token = setGetToken();
	try {
		const {data} = await axios.post(`/default/address`, {token: token}, {withCredentials: true});
		return data?.addresses ? data?.addresses : [];
	} catch (error) {
		throw Error(error.response.statusText);
	}
};


export const saveShippingAddressToCart = async (processData) => {
	const token = setGetToken();
	try {
		const {data} = await axios.post(`/default/cart/shipping`, {token: token, ...processData}, {withCredentials: true});
		return data;
	} catch (error) {
		throw Error(error.response.statusText);
	}
};


export const storeShippingAddress = async (processData) => {
	const token = setGetToken();
	try {
		const {data} = await axios.post(`/default/store-new-address`, {token: token, ...processData}, {withCredentials: true});
		return data;
	} catch (error) {
		throw Error(error.response.statusText);
	}
};


export const useProductDetails = (product_id) => useQuery(["ProductDetails", product_id], async () => {
	try {
		const {data} = await axios.get(`/default/product-description/${product_id}`);
		return data?.data?.description ? data?.data?.description : '';
	} catch (error) {
		console.log(error);
	}
});


export const useDeleteShippingAddress = () => useMutation(["deleteShippingAddress"], async ({...props}) => {
	try {
		const {data} = await axios.post(`/default/delete-address`, props);
		if (data.status) {
			swal({
				title: data.msg,
				icon: "success",
				buttons: "Ok, Understood",
			});
		} else {
			swal({
				title: data.msg,
				icon: "warning",
				buttons: "Ok, Understood",
			});
		}
		return data?.addresses ? data?.addresses : [];
	} catch (error) {
		console.log(error);
	}
});











