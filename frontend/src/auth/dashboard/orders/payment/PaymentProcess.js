import React from "react";
import {useParams, withRouter} from "react-router-dom";
import {useQuery} from "../../../../utils/customHooks";
import My404Component from "../../../../pages/404/My404Component";

const PaymentProcess = (props) => {
	const {match} = props;
	let {tran_id} = useParams();

	const {orderId} = match.params;
	let query = useQuery();


	return (
		<main className="main bg-gray">
			<div className="container">
				<div className="row justify-content-center  align-items-center" style={{minHeight: '80vh'}}>
					<div className="col-lg-5 col-md-8 col-sm-12">
						<h2>Failed order payment process</h2>
					</div>
				</div>
			</div>
		</main>
	);
}

export default withRouter(PaymentProcess);
