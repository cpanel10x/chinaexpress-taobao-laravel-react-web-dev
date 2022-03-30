import {useMutation, useQuery} from "react-query";
import {
	addItemToWishList,
	removeItemFromWishList,
} from "./CartApi";


// cart mutation query
export const useAddToWishList = () => useMutation("addItemToWishList", addItemToWishList);
export const useRemoveFromWishList = () => useMutation("removeItemFromWishList", removeItemFromWishList);




