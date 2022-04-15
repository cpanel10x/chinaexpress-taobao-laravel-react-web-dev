import React, {useEffect, useState} from 'react';
import {loadAsset} from "../../../../../../utils/Helpers";
import {useExpressService} from "../../../../../../api/AliExpressProductApi";
import {useQueryClient} from "react-query";

const ExpressPopup = (props) => {
	const {cartItem, setShowModal, settings} = props;
	const cache = useQueryClient();

	const {mutateAsync, isLoading} = useExpressService();
	let messages = settings?.aliexpress_express_popup_message || null;
	messages = messages ? JSON.parse(messages) : {};


	const closeModal = () => {
		mutateAsync({
			item_id: cartItem?.ItemId
		}, {
			onSuccess: () => {
				cache.invalidateQueries("customer_cart");
			}
		});
		setShowModal(false);
	};


	return (
		<>
			<div className="modal fade show"
			     id="staticBackdrop"
			     data-backdrop="static"
			     data-keyboard="false"
			     style={{display: 'block'}}>
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="staticBackdropLabel">Must be Read</h5>
							<button type="button" className="close" onClick={() => closeModal()}>
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							{messages?.popup_option === 'only_text' && <p>{messages?.popup_message}</p>}
							{
								messages?.popup_option === 'only_image' &&
								<img src={loadAsset(messages?.popup_image)} className="img-fluid" alt="popup"/>
							}
							{
								messages?.popup_option === 'both' &&
								<>
									<img src={loadAsset(messages?.popup_image)} className="img-fluid mb-3" alt="popup"/>
									<p>{messages?.popup_message}</p>
								</>
							}

						</div>
						<div className="justify-content-center modal-footer">
							<button type="button" className="btn btn-default" onClick={() => closeModal()}>Read & Agree</button>
						</div>
					</div>
				</div>
			</div>
			<div className="modal-backdrop fade show" onClick={() => closeModal()}/>
		</>
	);
};

export default ExpressPopup;