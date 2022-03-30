import React, {useState} from 'react';
import Breadcrumb from "../../../pages/breadcrumb/Breadcrumb";
import {useAddress, useDeleteAddress} from "../../../api/AddressApi";
import AddEditAddress from "./includes/AddEditAddress";
import swal from "sweetalert";
import {useQueryClient} from "react-query";

const ManageAddress = (props) => {

	const [edit, setEdit] = useState(false);
	const [addressItem, setAddressItem] = useState({});

	const cache = useQueryClient();
	const {data: address, isLoading} = useAddress();

	const {mutateAsync} = useDeleteAddress();


	const toggleAddEdit = (shipping = {}) => {
		setAddressItem(shipping);
		setEdit(true);
	};


	const deleteShippingAddress = (shipping = {}) => {
		swal({
			title: "Are you sure?",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
			.then((willDelete) => {
				if (willDelete) {
					mutateAsync({id: shipping.id}, {
						onSuccess: (res) => {
							if(res.status === true){
								swal("Address deleted successfully", {
									icon: "success",
								});
								cache.invalidateQueries("useAddress")
							}else{
								swal(res.msg, {
									icon: "error",
								});
							}
						}
					})
				}
			});

		setAddressItem(shipping);
	};


	return (
		<main className="main bg-gray">
			<div className="page-content">
				<Breadcrumb
					current={'Address'}
					collections={[
						{name: 'Dashboard', url: 'dashboard'}
					]}/>

				{edit && <AddEditAddress addressItem={addressItem} setEdit={setEdit}/>}

				<div className="container">
					<div className="row">
						<aside className="col-md-12">
							<div className="card my-3">
								<div className="card-body">
									<div className="cleafix">
										<h3 className="d-inline-block">My Address</h3>
										<button type="button"
										        onClick={() => toggleAddEdit()}
										        className="btn btn-light btn-sm ml-2">
											<i className="icon-plus"/> New Address
										</button>
									</div>

									<div className="table-responsive-md">
										<table className="table table-striped">
											<thead>
											<tr>
												<th className="text-left">#ID</th>
												<th className="text-nowrap">Name</th>
												<th className="text-nowrap">Phone</th>
												<th className="text-nowrap">City</th>
												<th className="text-nowrap">Full Address</th>
												<th>Actions</th>
											</tr>
											</thead>
											<tbody>
											{
												address?.length > 0 ?
													address.map((shipping, index) =>
														<tr key={index}>
															<td>{index + 1}</td>
															<td>{shipping.name}</td>
															<td>{shipping.phone}</td>
															<td>{shipping.city}</td>
															<td>{shipping.address}</td>
															<td>
																<div className="btn-toolbar">
																	<button type="button"
																	        onClick={() => toggleAddEdit(shipping)}
																	        className="btn btn-secondary btn-sm mr-1">
																		<i className="icon-edit"/>
																	</button>
																	<button type="button"
																	        onClick={() => deleteShippingAddress(shipping)}
																	        className="btn btn-sm btn-danger">
																		<i className=" icon-trash-empty"/>
																	</button>
																</div>
															</td>
														</tr>
													)
													:
													<tr>
														<td colSpan={6}>You have no saved address</td>
													</tr>
											}
											</tbody>
										</table>
									</div>

								</div>
							</div>
						</aside>
					</div>
				</div>
			</div>
		</main>
	);
};

export default ManageAddress;