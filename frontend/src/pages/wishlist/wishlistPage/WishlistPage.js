import React from "react";
import {Link} from "react-router-dom";
import swal from "sweetalert";
import {useQueryClient} from "react-query";
import SpinnerButtonLoader from "../../../loader/SpinnerButtonLoader";
import {useRemoveFromWishList} from "../../../api/WishListApi";
import {useMediaQuery} from "react-responsive";
import {characterLimiter} from "../../../utils/Helpers";

const WishlistPage = (props) => {
	const {wishList, indexItem} = props;
	const currency = "৳";

	const cache = useQueryClient();
	const {isLoading, mutateAsync} = useRemoveFromWishList();


	const isMobile = useMediaQuery({query: '(max-width: 991px)'});


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
		<>
			<div className="row align-items-center">
				<div className="col-md-2 text-center d-none d-md-block">{indexItem + 1}</div>
				<div className="col-md-2 col-3">
					<Link
						to={`/product/${wishList.ItemId}`}
					>
						<img
							className="w-100"
							src={wishList.img}
							alt="Product image"
						/>
					</Link>
				</div>
				<div className="col-md-6 col-7 align-self-start">
					<Link
						to={`/product/${wishList.ItemId}`}
					>
						{
							isMobile ?
								characterLimiter(wishList.name, 55)
								:
								wishList.name
						}
					</Link>
					<br/>
					<b>{`${currency + " " + wishList.sale_price}`}</b>
				</div>
				<div className="col-md-2 col-2 text-center">
					{
						isLoading ?
							<SpinnerButtonLoader buttonClass="btn-default"/>
							:
							<button
								type="button"
								className="btn btn-default"
								onClick={() => removeItemFromWishlist(wishList.ItemId)}
							>
								<i className="icon-cancel"/>
							</button>
					}
				</div>
			</div>
			<hr className="my-2"/>
		</>
	);
};


export default WishlistPage;
