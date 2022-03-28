import {useMutation, useQuery, useQueryClient} from "react-query";
import swal from "sweetalert";
import {instance} from "../utils/AxiosInstance";


const setGetToken = (token = null) => {
	let token_key = token;
	if (token) {
		window.localStorage.setItem('cart_token', token)
	} else {
		token_key = window.localStorage.getItem('cart_token');
	}
	return token_key;
};


export const useCartMutation = () => {

	const cache = useQueryClient();
	const token = setGetToken();

	const mainCart = useQuery("customer_cart", async () => {
		try {
			const {data} = await instance.get(`cart?token=${token}`,);
			setGetToken(data?.cart_token);
			return data?.cart ? data?.cart : {};
		} catch (error) {
			console.log(error);
		}
	});

	const addToCart = useMutation(["addToCart"], async (props) => {
		try {
			const {data} = await instance.post(`/cart/add`, {token: token, ...props});
			return data?.cart ? data.cart : {};
		} catch (error) {
			console.log(error);
		}
	}, {
		onSuccess: () => {
			cache.invalidateQueries("customer_cart");
		}
	});

	const updateCart = useMutation(["updateCart"], async (props) => {
		try {
			const {data} = await instance.post(`/cart/update`, {token: token, ...props});
			return data?.cart ? data.cart : {};
		} catch (error) {
			console.log(error);
		}
	}, {
		onMutate: async newData => {
			const {item_id, variation_id, qty} = newData;
			await cache.cancelQueries('customer_cart');
			const previousCart = cache.getQueryData('customer_cart');
			cache.setQueryData('customer_cart', oldCart => {
				let items = oldCart?.cart_items || [];
				items = items.map(item => {
					let variations = item.variations.map(variation => {
						if (variation.id === variation_id) {
							variation.qty = qty;
						}
						return variation;
					});
					variations = variations?.filter(filter => filter.qty > 0);
					return {...item, variations: variations}
				});
				return {...oldCart, cart_items: items}
			});
			return {previousCart}
		},
		onError: (err, newTodo, context) => {
			cache.setQueryData('customer_cart', context.previousCart)
		},
		onSettled: () => {
			// cache.invalidateQueries('customer_cart')
		},
	});

	const checkedUnchecked = useMutation(["cartAllCheckedUnchecked"], async (props) => {
		try {
			const {data} = await instance.post(`/cart/checkbox`, {token: token, ...props});
			return data?.cart ? data.cart : {};
		} catch (error) {
			console.log(error);
		}
	}, {
		onSuccess: (cart) => {
			cache.setQueryData("customer_cart", cart);
		}
	});

	const removeCart = useMutation(["removeCart"], async (props) => {
		try {
			const {data} = await instance.post(`/cart/remove`, {token: token, ...props});
			return data?.cart ? data.cart : {};
		} catch (error) {
			console.log(error);
		}
	}, {
		onSuccess: (cart) => {
			cache.setQueryData("customer_cart", cart);
		}
	});

	const PaymentMethod = useMutation(["updatePaymentMethod"], async (props) => {
		try {
			const {data} = await instance.post(`/cart/payment-method`, {token: token, ...props});
			return data?.cart ? data.cart : {};
		} catch (error) {
			console.log(error);
		}
	}, {
		onSuccess: (cart) => {
			cache.setQueryData("customer_cart", cart);
		}
	});

	const confirmOrder = useMutation("confirmOrder", async (props) => {
		try {
			const {data} = await instance.post(`/cart/place-order`, {token: token, ...props});
			return data;
		} catch (error) {
			console.log(error);
		}
	}, {
		onSuccess: (cart) => {
			cache.setQueryData("customer_cart", cart);
		}
	});

	return {
		mainCart,
		addToCart,
		updateCart,
		checkedUnchecked,
		removeCart,
		PaymentMethod,
		confirmOrder
	}
};

export const useCart = () => useQuery("customer_cart", async () => {
	const token = setGetToken();
	try {
		const {data} = await instance.get(`cart?token=${token}`);
		setGetToken(data?.cart_token);
		return data?.cart ? data?.cart : {};
	} catch (error) {
		throw Error(error.response.statusText);
	}
});



export const addItemToWishList = async (processData) => {
	try {
		const {data} = await instance.post(`/add-to-wishlist`, processData);
		return data;
	} catch (error) {
		throw Error(error.response.statusText);
	}
};

export const removeItemFromWishList = async (processData) => {
	try {
		const {data} = await instance.post(`/remove-wishlist`, processData);
		return data;
	} catch (error) {
		throw Error(error.response.statusText);
	}
};


// manage shipping address
export const shippingAddress = async () => {
	const token = setGetToken();
	try {
		const {data} = await instance.post(`/address`, {token: token});
		return data?.addresses ? data?.addresses : [];
	} catch (error) {
		throw Error(error.response.statusText);
	}
};


export const saveShippingAddressToCart = async (processData) => {
	const token = setGetToken();
	try {
		const {data} = await instance.post(`/cart/shipping`, {token: token, ...processData});
		return data;
	} catch (error) {
		throw Error(error.response.statusText);
	}
};


export const storeShippingAddress = async (processData) => {
	const token = setGetToken();
	try {
		const {data} = await instance.post(`/store-new-address`, {token: token, ...processData});
		return data;
	} catch (error) {
		throw Error(error.response.statusText);
	}
};


export const useDeleteShippingAddress = () => useMutation(["deleteShippingAddress"], async ({...props}) => {
	try {
		const {data} = await instance.post(`/delete-address`, props);
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











