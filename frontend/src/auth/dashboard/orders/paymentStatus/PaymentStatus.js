import React from "react";
import {withRouter} from "react-router-dom";
import {useQuery} from "../../../../utils/customHooks";
import My404Component from "../../../../pages/404/My404Component";
import PaymentSuccess from "./includes/PaymentSuccess";
import PaymentFailure from "./includes/PaymentFailure";
import PaymentCancel from "./includes/PaymentCancel";
import {useAuthMutation} from "../../../../api/Auth";

const PaymentStatus = (props) => {
	const {match} = props;
	const {orderId} = match.params;
	let query = useQuery();
	let status = query.get("status");
	let msg = query.get("msg");
	let timestamp = query.get("timestamp");

	console.log("timestamp", timestamp);

	const allStatus = ["success", "failure", "cancel"];

	if (!allStatus.includes(status)) {
		return <My404Component/>;
	}

	return (
		<main className="main bg-gray">
			<div className="container">
				<div className="row justify-content-center  align-items-center" style={{minHeight: '80vh'}}>
					<div className="col-lg-5 col-md-8 col-sm-12">
						{status === "success" && <PaymentSuccess msg={msg} orderID={orderId}/>}
						{status === "failure" && <PaymentFailure msg={msg} orderID={orderId}/>}
						{status === "cancel" && <PaymentCancel msg={msg} orderID={orderId}/>}
					</div>
				</div>
			</div>
		</main>
	);
}

export default withRouter(PaymentStatus);
