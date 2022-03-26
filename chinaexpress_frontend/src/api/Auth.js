import {instance} from "../utils/AxiosInstance";
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


export const useAuthMutation = (props) => {

	const cache = useQueryClient();
	const authenticated = isAuthenticated();

	const customer = useQuery(["customer"], async () => {
		try {
			const {data} = await instance.post(`/me`);
			const user = data?.user ? data?.user : {};
			setAuthenticated(user);
			return user;
		} catch (error) {
			setAuthenticated({});
			console.log(error);
		}
	});

	const checkExistsUser = useMutation(["checkExistsUser"], async (props) => {
		try {
			const {data} = await instance.post(`/check-exists-customer`, props);
			return data;
		} catch (error) {
			console.log(error);
		}
	});

	const registerSubmit = useMutation(["registerSubmit"], async (props) => {
		try {
			const {data} = await instance.post(`/register-customer`, props);
			return data;
		} catch (error) {
			console.log(error);
		}
	});

	const loginSubmit = useMutation(["loginSubmit"], async (props) => {
		try {
			const {data} = await instance.post(`/login`, props);
			const user = data?.user ? data?.user : null;
			if (user) {
				setAuthenticated(user);
				cache.setQueryData(["customer"], user);
			}
			return data;
		} catch (error) {
			console.log(error);
		}
	});

	const authLogout = useMutation(["authLogout"], async (props) => {
		try {
			const {data} = await instance.post(`/logout`, props);
			const user = data?.user ? data?.user : {};
			setAuthenticated(user);
			cache.setQueryData(["customer"], user);
			return user;
		} catch (error) {
			console.log(error);
		}
	});


	const forgotRequest = useMutation(["forgotRequest"], async (props) => {
		try {
			const {data} = await instance.post(`/forgot-password`, props);
			return data;
		} catch (error) {
			console.log(error);
		}
	});

	const resetRequest = useMutation(["resetRequest"], async (props) => {
		try {
			const {data} = await instance.post(`/reset-password`, props);
			return data;
		} catch (error) {
			console.log(error);
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
		const {data} = await instance.post(`/submit-otp`, formData);
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const submitForResendOtpForLogin = async (formData) => {
	try {
		const {data} = await instance.post(`/resend-otp`, formData);
		return data;
	} catch (error) {
		console.log(error);
	}
};

