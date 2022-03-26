import React from "react";
import {Link} from "react-router-dom";
import swal from "sweetalert";
import {useQueryClient} from "react-query";
import {removeFromWishList} from "../../../api/Queries";
import SpinnerButtonLoader from "../../../loader/SpinnerButtonLoader";

const WishlistPage = props => {
	const {wishList} = props;
	const currency = "৳";

	const cache = useQueryClient();
	const {isLoading, mutateAsync} = removeFromWishList();


	const removeItemFromWishlist = (ItemId) => {
		swal({
			icon: "warning",
			text: "Are sure to remove from wishlist!",
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
		<div className="card my-3">
			<div className="card-body">
				<h2 className="card-title">Wishlist</h2>

				<table className="table table-wishlist table-mobile">
					<thead>
					<tr>
						<th>#ID</th>
						<th colSpan={2}>Product</th>
						<th style={{width:'100px'}}>Price</th>
						<th>Remove</th>
					</tr>
					</thead>
					<tbody>
					{wishList?.length > 0 ? (
						wishList.map((wishlist, index) => (
							<tr key={index}>
								<td>{index + 1}</td>
								<td style={{width: "15%"}}>
									<Link
										to={`/product/${wishlist.ItemId}`}
									>
										<img
											className="w-100"
											src={wishlist.img}
											alt="Product image"
										/>
									</Link>
								</td>
								<td className="product-col">
									<Link
										to={`/product/${wishlist.ItemId}`}
									>
										{wishlist.name}
									</Link>
								</td>
								<td className="text-center">{`${currency + " " + wishlist.sale_price}`}</td>
								<td className="text-center">
									{
										isLoading ?
											<SpinnerButtonLoader buttonClass="btn-default"/>
											:
											<button
												type="button"
												className="btn btn-default px-3"
												onClick={() => removeItemFromWishlist(wishlist.ItemId)}
											>
												<i className="icon-cancel"/>
											</button>
									}
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan={4} className="text-center">
								No wishlist
							</td>
						</tr>
					)}
					</tbody>
				</table>
			</div>
		</div>
	);
};


export default WishlistPage;
