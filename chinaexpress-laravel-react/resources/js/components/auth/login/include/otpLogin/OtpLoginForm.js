import React, {useState} from 'react';
import {isValidPhoneNumber, parsePhoneNumber} from "react-phone-number-input";
import Input from 'react-phone-number-input/input'
import SpinnerButtonLoader from '../../../../loader/SpinnerButtonLoader';
import {authMutation} from "../../../../api/Auth";
import OldUser from "./includes/OldUser";
import NewUser from "./includes/NewUser";

const OtpLoginForm = (props) => {
	const [phone, setPhone] = useState("");
	const [isValidPhone, setIsValidPhone] = useState(true);
	const [response, setResponse] = useState({});

	const {checkExistsUser: exists} = authMutation();

	const formSubmitForOtpSubmit = (event) => {
		event.preventDefault();
		if (isValidPhoneNumber(phone)) {
			const intPhone = parsePhoneNumber(phone)?.number;
			exists.mutateAsync({phone: intPhone})
				.then(response => {
					setResponse(response);
				});
		} else {
			swal({
				text: "Phone number is not valid.!",
				icon: "warning",
				buttons: "Dismiss",
			});
		}
	};


	const handleValidPhone = () => {
		setIsValidPhone(isValidPhoneNumber(phone))
	};

	if (response?.new === false) {
		return <OldUser response={response} setResponse={setResponse}/>;
	}

	if (response?.new === true) {
		return <NewUser response={response} setResponse={setResponse}/>;
	}


	return (
		<div>
			<h1 className="text-center font-weight-bold">Login/Signup</h1>
			<form onSubmit={e => formSubmitForOtpSubmit(e)}>
				<div className="form-group">
					<label htmlFor="phone"> Phone Number
						<span className="text-danger"> * </span>
					</label>
					<div className="countryPhoneInput">
            <span className="country_logo"
                  style={{backgroundImage: "url('/img/bangladesh.svg')"}}/>
						<Input
							name="phone"
							id="phone"
							className="form-control"
							international
							country="BD"
							withCountryCallingCode
							placeholder="Enter phone number"
							value={phone}
							onBlur={() => handleValidPhone()}
							onChange={(phone) => setPhone(phone)}/>
					</div>
					{
						!isValidPhone &&
						<p className="small m-0 text-danger">Type your valid phone number </p>
					}
				</div>

				<div className="form-group">
					{
						exists.isLoading ?
							<SpinnerButtonLoader buttonClass={'btn-block btn-default'} textClass={'text-white'}/>
							:
							<button
								type="submit"
								className="btn py-2 btn-block btn-default"
							>
								<span className="mr-1">Login / Signup</span>
								<i className="icon-long-arrow-right"/>
							</button>
					}
				</div>
			</form>
		</div>
	)
}

export default OtpLoginForm
