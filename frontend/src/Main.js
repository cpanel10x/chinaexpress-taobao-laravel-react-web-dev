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


const queryClient = new QueryClient();


const Main = () => {

	const {data: settings} = useSettings();
	const {customer: {data: customer}} = useAuthMutation();

	// console.log('customer', customer);

	return (
		<BrowserRouter>
			<HeaderManage settings={settings} customer={customer}/>
			<div className="page-wrapper">
				<Routing/>
			</div>
			<Footer/>
		</BrowserRouter>
	);
};


if (document.getElementById("app")) {
	ReactDOM.render(
		<QueryClientProvider client={queryClient}>
			<Main/>
			{/*<ReactQueryDevtools initialIsOpen={false}/>*/}
		</QueryClientProvider>,
		document.getElementById("app")
	);
}


export default Main;
