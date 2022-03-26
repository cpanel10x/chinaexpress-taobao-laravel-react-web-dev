import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const fetcherPost = url => axios.post(url).then(res => res.data);
// const fetcherPost = (...args) => fetch(...args, {method: 'POST',}).then((res) => res.json());

export const SwrGetRequest = (api_url) => {
	const {data, error} = useSWR(api_url, fetcher, {
		refreshInterval: 600000, // 10 minutes
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});
	return {
		resData: data,
		isLoading: !error && !data,
		isError: error,
	};
};

export const SwrPostRequest = (api_url) => {
	const {data, error} = useSWR(api_url, fetcherPost, {
		refreshInterval: 600000, // 10 minutes
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});
	return {
		resData: data,
		isLoading: !error && !data,
		isError: error,
	};
};

