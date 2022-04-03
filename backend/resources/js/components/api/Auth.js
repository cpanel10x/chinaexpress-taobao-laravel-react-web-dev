import axios from "axios";
import {useMutation, useQuery, useQueryClient} from "react-query";
import swal from "sweetalert";


export const isAuthenticated = () => {
	const isAuthenticated = window.localStorage.getItem('isAuthenticate');
	return isAuthenticated ? JSON.parse(isAuthenticated)?.login : false;
};


export const setAuthenticated = (customer) => {
	if (customer?.id) {
		localStorage.setItem('isAuthenticate', JSON.stringify({login: true}));
	} else {
		localStorage.setItem('isAuthenticate', JSON.stringify({login: false}));
	}
};


export const authMutation = ({...props}) => {

	const cache = useQueryClient();
	const authenticated = isAuthenticated();

	const customer = useQuery(["customer"], async () => {
		try {
			const {data} = await axios.post(`/default/me`, process);
			const user = data?.user ? data?.user : {};
			setAuthenticated(user);
			return user;
		} catch (error) {
			setAuthenticated({});
			throw Error(error.response.statusText);
		}
	});

	const checkExistsUser = useMutation(["checkExistsUser"], async (props) => {
		try {
			const {data} = await axios.post(`/default/check-exists-customer`, props);
			return data;
		} catch (error) {
			throw Error(error.response.statusText);
		}
	});

	const registerSubmit = useMutation(["registerSubmit"], async (props) => {
		try {
			const {data} = await axios.post(`/default/register-customer`, props);
			return data;
		} catch (error) {
			throw Error(error.response.statusText);
		}
	});

	const loginSubmit = useMutation(["loginSubmit"], async (props) => {
		try {
			const {data} = await axios.post(`/default/login`, props);
			const user = data?.user ? data?.user : null;
			if (user) {
				setAuthenticated(user);
				cache.setQueryData(["customer"], user);
			}
			return data;
		} catch (error) {
			throw Error(error.response.statusText);
		}
	});

	const authLogout = useMutation(["authLogout"], async (props) => {
		try {
			const {data} = await axios.post(`/default/logout`, props);
			const user = data?.user ? data?.user : {};
			setAuthenticated(user);
			cache.setQueryData(["customer"], user);
			return user;
		} catch (error) {
			throw Error(error.response.statusText);
		}
	});


	const forgotRequest = useMutation(["forgotRequest"], async (props) => {
		try {
			const {data} = await axios.post(`/default/forgot-password`, props);
			return data;
		} catch (error) {
			throw Error(error.response.statusText);
		}
	});

	const resetRequest = useMutation(["resetRequest"], async (props) => {
		try {
			const {data} = await axios.post(`/default/reset-password`, props);
			return data;
		} catch (error) {
			throw Error(error.response.statusText);
		}
	});


	return {
		customer,
		checkExistsUser,
		registerSubmit,
		loginSubmit,
		authLogout,
		forgotRequest,
		resetRequest,
	}
};


export const submitForOtpForLogin = async (formData) => {
	try {
		const {data} = await axios.post(`/default/submit-otp`, formData);
		return data;
	} catch (error) {
		throw Error(error.response.statusText);
	}
};

export const submitForResendOtpForLogin = async (formData) => {
	try {
		const {data} = await axios.post(`/default/resend-otp`, formData);
		return data;
	} catch (error) {
		throw Error(error.response.statusText);
	}
};

