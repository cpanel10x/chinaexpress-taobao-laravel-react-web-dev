import {useMutation, useQuery} from "react-query";
import {getSingleProducts} from "./GeneralApi";
import {
	addItemToWishList,
	removeItemFromWishList,
	saveShippingAddressToCart,
	shippingAddress,
	storeShippingAddress,
} from "./CartApi";


// cart query
export const useAddress = () => useQuery("address", shippingAddress);
// cart mutation query
export const useAddToWishList = () => useMutation("addItemToWishList", addItemToWishList);
export const useRemoveFromWishList = () => useMutation("removeItemFromWishList", removeItemFromWishList);




//  form submit queries
export const useSaveShippingAddress = () => useMutation("saveShippingAddressToCart", saveShippingAddressToCart);
export const useSaveAddress = () => useMutation("storeShippingAddress", storeShippingAddress);


//  manage otp login
// export const submitOtpForLogin = () => useMutation("submitForOtpForLogin", submitForOtpForLogin);
// export const useSubmitOtpResendForLogin = () => useMutation("submitForResendOtpForLogin", submitForResendOtpForLogin);