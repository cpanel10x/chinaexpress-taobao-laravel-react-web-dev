import React, {useEffect, useState} from 'react';
import {usePopupMessage} from "../../../../../api/CartApi";
import {loadAsset} from "../../../../../utils/Helpers";

const AliPopupShown = (props) => {
	const {settings, cartItem, product_id} = props;

	const [showModal, setShowModal] = useState(false);

	const {mutateAsync, isLoading} = usePopupMessage();

	let messages = settings?.cart_aliexpress_popup_message || null;
	messages = messages ? JSON.parse(messages) : {};

	useEffect(() => {
		if (cartItem?.is_popup_shown === null && cartItem?.IsCart === 1) {
			setShowModal(true);
		} else {
			setShowModal(false);
		}
	}, [cartItem]);

	if (!showModal) {
		return '';
	}

	const closeModal = () => {
		mutateAsync({item_id: product_id});
		setShowModal(false);
	};


	return (
		<>
			<div className="modal fade show"
			     id="staticBackdrop"
			     data-backdrop="static"
			     data-keyboard="false"
			     onClick={() => closeModal()}
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
			<div className="modal-backdrop fade show"/>
		</>
	);
};

export default AliPopupShown;