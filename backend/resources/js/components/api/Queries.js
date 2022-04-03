import { useMutation, useQuery } from "react-query";
import { getCustomer, getCustomerWishList, getSettings, getSingleProducts } from "./GeneralApi";
import {
	addItemToWishList, addToCart,
	confirmOrder,
	getCustomerCart,
	removeCart, removeItemFromWishList,
	saveShippingAddressToCart,
	shippingAddress,
	storeShippingAddress,
	updateCart,
	updatePaymentMethod
} from "./CartApi";
import { submitForOtp, submitForOtpForLogin, submitForResendOtpForLogin } from "./Auth";



// cart query
export const useAddress = () => useQuery("address", shippingAddress);
// cart mutation query
export const addToWishList = () => useMutation("addItemToWishList", addItemToWishList);
export const removeFromWishList = () => useMutation("removeItemFromWishList", removeItemFromWishList);

export const addToCustomerCart = () => useMutation("addToCart", addToCart);
export const updateCustomerCart = () => useMutation("updateCart", updateCart);



// product query
export const useProduct = (itemId) => useQuery(['product', itemId], () => getSingleProducts(itemId));


//  form submit queries
export const saveShippingAddress = () => useMutation("saveShippingAddressToCart", saveShippingAddressToCart);
export const saveAddress = () => useMutation("storeShippingAddress", storeShippingAddress);


//  manage otp login
export const submitOtpForLogin = () => useMutation("submitForOtpForLogin", submitForOtpForLogin);
export const useSubmitOtpResendForLogin = () => useMutation("submitForResendOtpForLogin", submitForResendOtpForLogin);