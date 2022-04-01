import React from "react";
import {Link} from "react-router-dom";
import swal from "sweetalert";
import {useQueryClient} from "react-query";
import SpinnerButtonLoader from "../../../loader/SpinnerButtonLoader";
import {useRemoveFromWishList} from "../../../api/WishListApi";

const WishlistPage = (props) => {
	const {wishList, indexItem} = props;
	const currency = "৳";

	const cache = useQueryClient();
	const {isLoading, mutateAsync} = useRemoveFromWishList();


	const removeItemFromWishlist = (ItemId) => {
		swal({
			icon: "warning",
			text: "Are sure to remove from wishList!",
			buttons: true
		}).then(willDelete => {
			if (willDelete) {
				mutateAsync({ItemId: ItemId}, {
					onSuccess: (responseData) => {
						if (responseData?.status) {
							cache.setQueryData('wishlist', (responseData?.wishlists || {}));
						}
					}
				});
			}
		});
	};

	return (
		<tr>
			<td>{indexItem + 1}</td>
			<td style={{width: "15%"}}>
				<Link
					to={`/product/${wishList.ItemId}`}
				>
					<img
						className="w-100"
						src={wishList.img}
						alt="Product image"
					/>
				</Link>
			</td>
			<td className="product-col">
				<Link
					to={`/product/${wishList.ItemId}`}
				>
					{wishList.name}
				</Link>
			</td>
			<td className="text-center">{`${currency + " " + wishList.sale_price}`}</td>
			<td className="text-center">
				{
					isLoading ?
						<SpinnerButtonLoader buttonClass="btn-default"/>
						:
						<button
							type="button"
							className="btn btn-default px-3"
							onClick={() => removeItemFromWishlist(wishList.ItemId)}
						>
							<i className="icon-cancel"/>
						</button>
				}
			</td>
		</tr>
	);
};


export default WishlistPage;
