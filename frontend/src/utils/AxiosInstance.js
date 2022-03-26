import axios from 'axios';


export const instance = axios.create({
	baseURL: process.env.REACT_APP_API_ENDPOINT,
	headers: {
		'X-Requested-With': 'XMLHttpRequest',
		'Content-Type': 'application/json',
	},
	withCredentials: true,
});


export const instanceSetToken = (token = "") => {
	if (token) {
		instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	} else {
		instance.defaults.headers.common["Authorization"] = "";
	}
	window.localStorage.setItem('_token', token);
};