import React, {useEffect} from "react";
import {BrowserRouter} from "react-router-dom";
import Routing from "./Routing";
import {useSettings} from "./api/GeneralApi";
import HeaderManage from "./header/HeaderManage";
import Footer from "./footer/Footer";
import ProfileUpdateDialogues from "./auth/ProfileUpdateDialogues";

function App() {

	const {data: settings} = useSettings();

	return (
		<BrowserRouter>
			<ProfileUpdateDialogues/>
			<HeaderManage settings={settings}/>
			<div className="page-wrapper">
				<Routing/>
			</div>
			<Footer/>
		</BrowserRouter>
	);
}

export default App;
