import React from 'react';
import {Link} from "react-router-dom";

const SuccessMessage = ({ref_no, tran_id, n_msg}) => {
	return (
		<div className="text-center order_complete">
			<img
				src="/assets/img/happy.png"
				className="mb-3 mx-auto"
				style={{width: "6rem"}}
				alt="success"/>
			<div className="heading_s1">
				<h3>Payment successful</h3>
			</div>
			<p>
				Thank you for your order! Your order is being processed and will be
				completed soon. You will receive an email confirmation when your
				order is on the way.
			</p>
			<div className="row">
				<div className="col">
					<Link to="/" className="btn btn-default btn-block">
						Shop More
					</Link>
				</div>
				<div className="col">
					<Link to="/dashboard/orders" className="btn btn-default btn-block">
						Goto My Orders
					</Link>
				</div>
			</div>
		</div>
	);
};

export default SuccessMessage;