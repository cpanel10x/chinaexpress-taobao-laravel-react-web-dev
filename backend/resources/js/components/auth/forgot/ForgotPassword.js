import React, {useEffect, useState} from "react";
import {Link, withRouter} from "react-router-dom";
import ForgotForm from "./include/ForgotForm";
import {useSettings} from "../../api/GeneralApi";
import {authMutation, isAuthenticated} from "../../api/Auth";
import {goPageTop} from "../../utils/Helpers";


const ForgotPassword = props => {

	const {data: settings} = useSettings();

	const isAuth = isAuthenticated();

	useEffect(() => {
		goPageTop();
		if (isAuth) {
			props.history.push("/dashboard");
		}
	}, [isAuth]);

	return (
		<main className="main">
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-md-4">
						<div className="card" style={{margin: '4rem 0'}}>
							<div className="card-body p-4 py-5">
								<img
									src={'/img/logo/chinaexpress.png'}
									style={{margin: ' 0 auto 1rem', height: '5rem'}}
									alt={settings?.site_name}
								/>

								<ForgotForm/>

								<Link
									to={`/login`}
									className="d-block login_link my-3 text-center"
								>
									Back to login
								</Link>

							</div>
						</div>

					</div>
				</div>

			</div>
		</main>
	);
};


export default withRouter(ForgotPassword);
