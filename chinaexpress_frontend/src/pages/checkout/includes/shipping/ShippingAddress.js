import React, {useState} from "react";
import AddEditAddressForm from "../AddEditAddressForm";
import AddressLists from "./AddressLists";


const ShippingAddress = (props) => {
	const {cart, shipping, setManageShipping} = props;

	const [newAddress, setNewAddress] = useState(false);

	const addNewAddress = (e) => {
		e.preventDefault();
		setNewAddress(true);
	};

	return (
		<div
			className={`modal modal_custom fade show`}
			style={{display: "block"}}
			aria-labelledby="chooseAddressModalLabel"
			data-keyboard="true"
			aria-hidden="true"
		>
			<div className="modal-dialog modal-lg modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header p-4">
						<h5
							className="modal-title"
							id="chooseAddressModalLabel"
						>
							Manage your shipping
							<a
								href={`/add-new-address`}
								onClick={(e) => addNewAddress(e)}
								className="btn ml-3 text-danger"
							>
								<i className="icon-pencil"/> Add New Address
							</a>
						</h5>
						<button
							type="button"
							onClick={() => setManageShipping(false)}
							className="close"
							data-dismiss="modal"
							aria-label="Close"
						>
							<span aria-hidden="true">
								<i className="icon-cancel-1"/>
							</span>
						</button>
					</div>
					<div className="modal-body p-4 px-5">
						{newAddress ? (
							<AddEditAddressForm
								setNewAddress={setNewAddress}
								currentAddress={shipping}
								setManageShipping={setManageShipping}
							/>
						) : (
							<AddressLists cart={cart} setManageShipping={setManageShipping}/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShippingAddress;
