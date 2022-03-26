import React, {useState} from 'react';
import {useAuthMutation} from "../../../../../api/Auth";
import SpinnerButtonLoader from "../../../../../loader/SpinnerButtonLoader";
import swal from "sweetalert";
import {withRouter} from "react-router-dom";

const OldUser = (props) => {
	const {response, setResponse} = props;
	const phone = response?.data?.phone;

	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState([]);


	const {loginSubmit: login} = useAuthMutation();

	const submitPassword = (event) => {
		event.preventDefault();
		login.mutateAsync({phone, password})
			.then(res => {
				if (res?.id > 0) {
					props.history.push("/dashboard");
				} else {
					let err = res.errors;
					const pwdError = err?.password ? err.password[0] : null;
					if (pwdError) {
						swal({
							text: pwdError,
							icon: "error",
							buttons: "Ok",
						});
					}
					setErrors(err);
				}
			});
	};

	const backToLoginForm = (event) => {
		event.preventDefault();
		setResponse({});
	};

	const passwordError = errors?.password ? errors.password[0] : null;

	return (
		<div>
			<h1 className="text-center font-weight-bold">Login</h1>
			<form onSubmit={(event) => submitPassword(event)}>
				<div className="form-group">
					<label htmlFor="password"> Password
						<span className="text-danger"> * </span>
					</label>
					<input
						type="password"
						className="form-control"
						id="password"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
						autoComplete="password"
						placeholder="Password"
						required={true}
					/>
					{passwordError && <p className="small m-0 text-danger">{passwordError}</p>}
				</div>
				<div className="border-0 form-footer m-0 p-0">
					{
						login.isLoading ?
							<SpinnerButtonLoader buttonClass={'btn-block btn-default'} textClass={'text-white'}/>
							:
							<button
								type="submit"
								className={`btn py-2 btn-block btn-default`}
							>
								Login
							</button>
					}
					<a
						href={`/login`}
						onClick={(event) => backToLoginForm(event)}
						className="d-block login_link my-3 text-center"
					>
						Back to login
					</a>
				</div>
			</form>
		</div>
	);
};

export default withRouter(OldUser);