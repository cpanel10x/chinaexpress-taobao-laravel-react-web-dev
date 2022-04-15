import React from 'react';

const ShippingModal = (props) => {
	const {currency, freightResult, shippingRate, selectShipping, setSelectShipping, setOptionEnable} = props;


	const selectShippingOptions = (event, option) => {
		event.preventDefault();
		setOptionEnable(false);
		setSelectShipping(option);
	};

	const closeModal = () => {
		setOptionEnable(false);
	};

	return (
		<>
			<div className="modal fade show"
			     id="staticBackdrop"
			     data-backdrop="static"
			     data-keyboard="false"
				// onClick={() => closeModal()}
				   style={{display: 'block'}}>
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="staticBackdropLabel">Choose Your Shipping Option</h5>
							<button type="button" className="close" onClick={() => closeModal()}>
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<div className="list-group">
								{
									freightResult?.map((freight, key) =>
										<a href="#" key={key} onClick={event=>selectShippingOptions(event, freight)} className="list-group-item list-group-item-action">
											<h5 className="mb-1">{`${freight.company}`}</h5>
											<div className="d-flex w-100 justify-content-between">
												<div>
													<p className="mb-1">Shipping Rate: {`${currency} ` + shippingRate(freight?.freightAmount?.value)}</p>
													<small>{`Estimated duration: ${freight?.time} Days`}</small>
												</div>
												<div>
													<div className=" m-0 pretty p-default p-round">
														<input type="checkbox" id={freight.company}/>
														<div className="state">
															<label htmlFor={freight.company}/>
														</div>
													</div>
												</div>
											</div>
										</a>
									)
								}
								<a href="#" className="list-group-item list-group-item-action btn-express">
										<h4 className="mb-1 text-white">Get Express Service</h4>

									<div className="d-flex w-100 justify-content-between">
										<div>
											<p className="mb-1">Shipping Rate: {`${currency} 650 per kg`}</p>
											<small>{`Estimated duration: 15-40 Days`}</small>
										</div>
										<div>
											<div className=" m-0 pretty p-default p-round">
												<input type="checkbox" id="express_service"/>
												<div className="state">
													<label htmlFor="express_service"/>
												</div>
											</div>
										</div>
									</div>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="modal-backdrop fade show"/>
		</>
	);
};

export default ShippingModal;