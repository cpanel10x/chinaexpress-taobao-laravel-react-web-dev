import React, {useEffect} from "react";
import {BrowserRouter} from "react-router-dom";
import Routing from "./Routing";
import ReactDOM from "react-dom";
import HeaderManage from "./header/HeaderManage";
import Footer from "./footer/Footer";
import 'react-toastify/dist/ReactToastify.css';

import {
	QueryClient,
	QueryClientProvider
} from 'react-query';
import {useSettings} from "./api/GeneralApi";
import {useAuthMutation} from "./api/Auth";
import {persistQueryClient} from 'react-query/persistQueryClient-experimental'
import {createWebStoragePersistor} from 'react-query/createWebStoragePersistor-experimental'


const Main = () => {

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnMount: false,
				refetchOnWindowFocus: false,
				// refetchInterval: 15,
			},
		},
	});

	const {data: settings} = useSettings();
	const {customer: {data: customer}} = useAuthMutation();

	// console.log('customer', customer);

	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<HeaderManage settings={settings} customer={customer}/>
				<div className="page-wrapper">
					<Routing/>
				</div>
				<Footer/>
			</BrowserRouter>
			{/*<ReactQueryDevtools initialIsOpen={true}/>*/}
		</QueryClientProvider>
	);
};


if (document.getElementById("app")) {
	ReactDOM.render(
		<Main/>,
		document.getElementById("app")
	);
}

