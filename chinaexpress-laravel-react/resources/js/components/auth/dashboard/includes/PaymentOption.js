import React from 'react';
import {SwrGetRequest} from "../../../utils/SwrRequests";
import {isEmpty} from "lodash";
import swal from "sweetalert";

const PaymentOption = () => {

	const {resData, isLoading} = SwrGetRequest(`/default/bkash/payment-options`);


	if (isLoading) {
		return <p>loading..</p>
	}

	const agreements = resData.agreements;
	const removeAgreement = (id) => {
		swal({
			title: "Are you sure to remove this?",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
			.then((willDelete) => {
				if (willDelete) {
					removeBkashWallet(id);
				}
			});
	};

	return (
		<div className="card">
			<div className="card-header border border-bottom-0 p-4">
				<h4 className="card-title  d-inline">My Payment Option</h4>
			</div>
			<div className="card-body border p-4">
				{
					isEmpty(agreements) ?
						(
							<p>You have no payment options</p>
						)
						:
						(
							<table className="table table-striped" style={{maxWidth: '400px'}}>
								<tr>
									<th>Bkash Account</th>
									<th className="text-center" style={{width: '120px'}}>Remove</th>
								</tr>
								{
									agreements.map((agreement, key) =>
										<tr key={key}>
											<td>{agreement.customerMsisdn}</td>
											<td className="text-center">
												<button type="button"
												        onClick={e => removeAgreement(agreement.id)}
												        className="btn btn-link btn-sm">
													Remove
												</button>
											</td>
										</tr>
									)
								}
							</table>
						)
				}


			</div>
		</div>
	);
};


export default PaymentOption;