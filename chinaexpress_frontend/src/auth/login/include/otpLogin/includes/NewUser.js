import React, {useState} from 'react';
import SpinnerButtonLoader from "../../../../../loader/SpinnerButtonLoader";
import swal from "sweetalert";
import {useAuthMutation} from "../../../../../api/Auth";

const NewUser = (props) => {
	const {response, setResponse} = props;
	const phone = response?.data?.phone;

	const [otp, setOtp] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);

	const {registerSubmit: register} = useAuthMutation();

	const registerCustomer = (e) => {
		e.preventDefault();
		register.mutateAsync({phone, otp, name, email, password, password_confirmation: confirmPassword})
			.then(res => {
				if (res?.registration === true) {
					swal({
						text: res?.message,
						icon: "success",
						buttons: "Ok",
					});
					setResponse(res);
				} else {
					setErrors(res.errors);
				}
			});
	};

	const backToLoginForm = (event) => {
		event.preventDefault();
		setResponse({});
	};


	const nameError = errors?.name ? errors.name[0] : null;
	const emailError = errors?.email ? errors.email[0] : null;
	const passwordError = errors?.password ? errors.password[0] : null;
	const otpError = errors?.otp_code ? errors.otp_code[0] : null;


	return (
		<div>
			<h1 className="text-center font-weight-bold">Register</h1>
			<form onSubmit={(e) => registerCustomer(e)}>
				<div className="form-group">
					<label htmlFor="name"> Name <span className="text-danger"> * </span> </label>
					<input
						type="text"
						className="form-control"
						id="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						autoComplete="name"
						placeholder="Name"
						required={true}
					/>
					{nameError && <p className="small m-0 text-danger">{nameError}</p>}
				</div>
				<div className="form-group">
					<label htmlFor="email"> Email </label>
					<input
						type="email"
						className="form-control"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						autoComplete="email"
						placeholder="Email"
					/>
					{emailError && <p className="small m-0 text-danger">{emailError}</p>}
				</div>

				<div className="form-group">
					<label htmlFor="password"> Password <span className="text-danger"> * </span></label>
					<input
						type="password"
						className="form-control"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						autoComplete="password"
						placeholder="Password"
						required={true}
					/>
					{passwordError && <p className="small m-0 text-danger">{passwordError}</p>}
				</div>

				<div className="form-group">
					<label htmlFor="password_confirmation"> Confirm Password <span className="text-danger"> * </span></label>
					<input
						type="password"
						className="form-control"
						id="password_confirmation"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						autoComplete="password_confirmation"
						placeholder="Confirm Password"
						required={true}
					/>
				</div>

				<div className="form-group">
					<label htmlFor="otp_code"> OTP <span className="text-danger"> * </span> </label>
					<input
						type="text"
						className="form-control"
						id="otp_code"
						value={otp}
						onChange={(e) => setOtp(e.target.value)}
						minLength={4}
						maxLength={4}
						size="4"
						autoComplete="off"
						placeholder="OTP"
						required={true}
					/>
					{
						otpError ?
							<p className="small m-0 text-danger">{otpError}</p>
							:
							<p className="small m-0">We just sent you a SMS with an OTP.</p>
					}
				</div>


				<div className="border-0 form-footer m-0 p-0">
					{
						register.isLoading ?
							<SpinnerButtonLoader buttonClass={'btn-block btn-default'} textClass={'text-white'}/>
							:
							<button type="submit" className={`btn py-2 btn-block btn-default`}>
								Register
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

export default NewUser;