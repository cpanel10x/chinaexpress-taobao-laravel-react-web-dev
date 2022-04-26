import React, {useEffect, useState} from 'react';
import {usePopupMessage} from "../../../../../api/CartApi";
import {loadAsset} from "../../../../../utils/Helpers";
import SpinnerButtonLoader from "../../../../../loader/SpinnerButtonLoader";

const AliPopupShown = (props) => {
	const {settings, cartItem, processAddToCart, product_id} = props;
	const {mutateAsync, isLoading} = usePopupMessage();

	let messages = settings?.cart_aliexpress_popup_message || null;
	messages = messages ? JSON.parse(messages) : {};
	let expressMessages = settings?.aliexpress_express_popup_message || null;
	expressMessages = expressMessages ? JSON.parse(expressMessages) : {};
	messages = cartItem?.shipping_type === 'express' ? expressMessages : messages;

	const closeModal = () => {
		mutateAsync(
			{item_id: product_id},
			{
				onSuccess: () => {
					processAddToCart();
				}
			}
		);
	};

	const only_text = messages?.popup_option === 'only_text';
	const only_image = messages?.popup_option === 'only_image';
	const both = messages?.popup_option === 'both';

	return (
		<>
			<div className="modal fade show"
			     id="staticBackdrop"
			     data-backdrop="static"
			     data-keyboard="false"
			     style={{display: 'block'}}>
				<div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="staticBackdropLabel">Must be Read</h5>
							<button type="button" className="close" onClick={() => closeModal()}>
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className={`modal-body ${only_image ? 'p-0' : ''}`}>
							{only_text && <p>{messages?.popup_message}</p>}
							{
								only_image &&
								<img src={loadAsset(messages?.popup_image)} className="img-fluid" alt="popup"/>
							}
							{
								both &&
								<>
									<img src={loadAsset(messages?.popup_image)} className="img-fluid mb-3" alt="popup"/>
									<p>{messages?.popup_message}</p>
								</>
							}

						</div>
						<div className="justify-content-center modal-footer">
							{
								isLoading ?
									<SpinnerButtonLoader buttonClass={'btn btn-default'}/>
									:
									<button type="button" className="btn btn-default" onClick={() => closeModal()}>Read & Agree</button>
							}
						</div>
					</div>
				</div>
			</div>
			<div className="modal-backdrop fade show"/>
		</>
	);
};

export default AliPopupShown;