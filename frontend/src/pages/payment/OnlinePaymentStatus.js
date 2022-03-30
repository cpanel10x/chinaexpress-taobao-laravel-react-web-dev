import React from 'react';
import {useHistory, useParams} from "react-router-dom";
import {useQuery} from "../../utils/customHooks";
import SuccessMessage from "./includes/SuccessMessage";
import FailedMessage from "./includes/FailedMessage";
import CancelMessage from "./includes/CancelMessage";
import My404Component from "../404/My404Component";

const OnlinePaymentStatus = () => {
	const history = useHistory();
	let {status} = useParams();
	const query = useQuery();
	const ref_no = query.get('ref_no');
	const tran_id = query.get('tran_id');
	const n_msg = query.get('n_msg');
	const paymentID = query.get('paymentID');
	const trxID = query.get('trxID');

	const allStatus = ['success', 'failed', 'cancel'];

	if (!allStatus.includes(status)) {
		return <My404Component/>;
	}

	return (
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-lg-5 col-md-7 col-sm-10 col-12">
					<div className="card my-4 my-md-5">
						<div className="card-body px-5">
							{status === 'success' && <SuccessMessage
								ref_no={ref_no}
								tran_id={tran_id}
								trxID={trxID}
								n_msg={n_msg}
								paymentID={paymentID}/>}
							{status === 'failed' && <FailedMessage ref_no={ref_no} tran_id={tran_id} n_msg={n_msg}/>}
							{status === 'cancel' && <CancelMessage ref_no={ref_no} tran_id={tran_id} n_msg={n_msg}/>}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OnlinePaymentStatus;