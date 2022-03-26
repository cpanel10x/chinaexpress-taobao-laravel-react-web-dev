import React from 'react';
import swal from "sweetalert";
import {deleteCustomerAddress} from "../../../../utils/Services";
import {useSaveShippingAddress} from "../../../../api/Queries";
import {useQueryClient} from "react-query";
import {useDeleteShippingAddress} from "../../../../api/CartApi";

const AddressItem = (props) => {
	const {cart, address, setEdit, setEditAddress, setManageShipping} = props;
	const cache = useQueryClient();
	const {isLoading, isSuccess, mutateAsync} = useSaveShippingAddress();

	const {mutateAsync: deleteShippingAddress} = useDeleteShippingAddress();

	const selectShippingAddress = async (e) => {
		e.preventDefault();
		await mutateAsync(address, {
			onSuccess: () => {
				cache.invalidateQueries("customer_cart");
				cache.invalidateQueries("address");
				setManageShipping(false);
			}
		});
	};

	const shipping = cart?.shipping ? JSON.parse(cart?.shipping) : {};

	const alreadyShipping = parseInt(shipping?.id) === parseInt(address.id);


	const selectEditAddress = (e, address) => {
		e.preventDefault();
		setEdit(true);
		setEditAddress(address);
	};

	const deleteAddress = (e, address) => {
		e.preventDefault();
		swal({
			text: "Are you want to delete?",
			icon: "warning",
			buttons: true,
		}).then((willDelete) => {
			if (willDelete) {
				deleteShippingAddress(address, {
					onSuccess: () => {
						cache.invalidateQueries("address");
					}
				});
			}
		});
	};


	return (
		<div className="col-md-6">
			<div className="card-body address_card">
				<div className="clearfix py-2">
					<div className="float-left">
						{
							isLoading ?
								<div className="spinner-border spinner-border-sm" role="status">
									<span className="sr-only">Loading...</span>
								</div>
								: (
									<div className="pretty p-default p-round">
										<input type="checkbox"
										       checked={alreadyShipping}
										       onChange={(e) => selectShippingAddress(e)}/>
										<div className="state">
											<label>{alreadyShipping ? `Default Shipping` : `Ship here`}</label>
										</div>
									</div>
								)
						}
					</div>
					<div className="btn-toolbar float-right">
						<a
							href={`/edit`}
							onClick={(e) => selectEditAddress(e, address)}
							className="btn btn-secondary mr-2"
							title="Edit Address"
						>
							<i className="icon-pencil"/>
						</a>
						<a
							href={`/delete`}
							onClick={(e) => deleteAddress(e, address)}
							className="btn btn-danger mr-2"
							title="Delete Address"
						>
							<i className="icon-trash-empty"/>
						</a>
					</div>
				</div>
				<p className="text-left">
					<b>Name:</b> {address.name} <br/>
					<b>Phone:</b> {address.phone} <br/>
					<b>District:</b> {address.city} <br/>
					<b>Address:</b> {address.address}
				</p>
			</div>
		</div>
	);
};

export default AddressItem;