import React from 'react';
import {authMutation} from "../../api/Auth";
import {withRouter} from "react-router-dom";

const Logout = (props) => {

	const {authLogout: logout} = authMutation();

	const authLogoutProcess = async (e) => {
		e.preventDefault();
		logout.mutateAsync()
			.then(res => {
				props.history.push('/login');
			});
	};


	return (
		<a
			href={`/logout`}
			className="dropdown-item"
			onClick={(e) => authLogoutProcess(e)}>
			Logout
		</a>
	);
};

export default withRouter(Logout);