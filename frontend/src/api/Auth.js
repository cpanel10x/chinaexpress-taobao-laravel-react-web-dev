import {instance, instanceSetToken} from "../utils/AxiosInstance";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {useHistory} from "react-router-dom";


export const isAuthenticated = () => {
	const isAuthenticated = window.localStorage.getItem('isAuthenticate');
	return isAuthenticated ? (JSON.parse(isAuthenticated)?.login || false) : false;
};


export const setAuthenticated = (customer) => {
	if (customer?.id) {
		localStorage.setItem('isAuthenticate', JSON.stringify({login: true}));
	} else {
		window.localStorage.removeItem("_token");
		localStorage.setItem('isAuthenticate', JSON.stringify({login: false}));
	}
};


export const useAuthMutation = () => {

	const cache = useQueryClient();
	const history = useHistory();
	const token = window.localStorage.getItem('_token');
	const isAuth = isAuthenticated();

	const revalidate = () => {
		cache.invalidateQueries(["customer"]);
	};

	const authUserValidate = (data) => {
		const token = data?.token ? data?.token : null;
		const user = data?.user ? data?.user : data;
		instanceSetToken(token);
		setAuthenticated(user);
		if (user?.id) {
			cache.setQueryData(["customer"], user);
		}
		return user;
	};

	const customer = useQuery(["customer"], async () => {
		instanceSetToken(token);
		try {
			const {data} = await instance.get(`/user`);
			return authUserValidate(data);
		} catch (error) {
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
			return authUserValidate(data);
		} catch (error) {
			console.log(error);
		}
	});

	const loginSubmit = useMutation(["loginSubmit"], async (props) => {
		try {
			const {data} = await instance.post(`/login`, props);
			return authUserValidate(data);
		} catch (error) {
			console.log(error);
		}
	});

	const updateProfile = useMutation(["updateProfile"], async (props) => {
		try {
			const {data} = await instance.post(`/update-profile`, props);
			return data;
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

	const authLogout = async () => {
		if (customer?.data?.id) {
			await instance.post('/logout');
			setAuthenticated({});
			instanceSetToken();
			revalidate()
		}
		window.location.pathname = '/login'
	};


	return {
		customer,
		checkExistsUser,
		registerSubmit,
		loginSubmit,
		updateProfile,
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

