import React, {useEffect} from "react";
import WishlistPage from "./wishlistPage/WishlistPage";
import {goPageTop} from "../../utils/Helpers";
import PageSkeleton from "../../skeleton/PageSkeleton";
import Breadcrumb from "../breadcrumb/Breadcrumb";
import {useWishList} from "../../api/WishListApi";

const Wishlist = () => {
	const {data: wishLists, isLoading} = useWishList();

	useEffect(() => {
		goPageTop();
	}, []);

	if (isLoading) {
		return <PageSkeleton/>;
	}


	return (
		<main className="main">
			<div className="page-content">
				<Breadcrumb
					current={'Wishlist'}
					collections={[
						{name: 'Dashboard', url: 'dashboard'}
					]}/>
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div className="card my-3">
								<div className="card-body">
									<h2 className="card-title">My Wishlist</h2>
									<table className="table table-wishlist table-mobile">
										<thead>
										<tr>
											<th>#ID</th>
											<th colSpan={2}>Product</th>
											<th style={{width: '100px'}}>Price</th>
											<th>Remove</th>
										</tr>
										</thead>
										<tbody>
										{
                       wishLists?.length > 0 ? (
                           wishLists.map((wishList, index) => <WishlistPage key={index} indexItem={index} wishList={wishList}/>)
												) :
												<tr>
													<td colSpan={4} className="text-center">
														No wishlist
													</td>
												</tr>
										}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};


export default Wishlist;
