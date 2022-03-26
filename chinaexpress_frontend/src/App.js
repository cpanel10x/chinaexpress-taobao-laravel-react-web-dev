import React from "react";
import {BrowserRouter} from "react-router-dom";
import Routing from "./Routing";
import {useSettings} from "./api/GeneralApi";
import {useAuthMutation} from "./api/Auth";
import HeaderManage from "./header/HeaderManage";
import Footer from "./footer/Footer";

function App() {

	const {data: settings} = useSettings();
	const {customer: {data: customer}} = useAuthMutation();

	return (
		<BrowserRouter>
			<HeaderManage settings={settings} customer={customer}/>
			<div className="page-wrapper">
				<Routing settings={settings} customer={customer}/>
			</div>
			<Footer/>
		</BrowserRouter>
	);
}

export default App;
