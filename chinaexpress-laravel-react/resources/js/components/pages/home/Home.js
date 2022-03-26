import React from "react";
import Intro from "./includes/intro/Intro";
import ProductsLoving from "./includes/Products/productsLoving/ProductsLoving";
import AliExpressSearchBar from './includes/searchBar/AliExpressSearchBar'
// import PopularCategory from './includes/popularCategory/PopularCategory'
// import BrandProduct from './includes/brand/brandProduct/BrandProduct'
// import Blog from './includes/blog/Blog'
// import LandingPopup from './includes/Products/TodayProducts/TodayProducts'

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import SectionsOne from "./sections/SectionsOne";
import SectionsTwo from "./sections/SectionsTwo";
import SectionsThree from "./sections/SectionsThree";
import SectionsFour from "./sections/SectionsFour";
import SectionsFive from "./sections/SectionsFive";
import {useSettings} from "../../api/GeneralApi";

const Home = (props) => {

	const {data: settings} = useSettings();

	const section_one_active = settings?.section_one_active;
	const section_two_active = settings?.section_two_active;
	const section_three_active = settings?.section_three_active;
	const section_four_active = settings?.section_four_active;
	const section_five_active = settings?.section_five_active;

	const general = {};

	return (
		<main className="main" style={{backgroundColor: "#fafafa"}}>
			<Intro/>
			<AliExpressSearchBar/>
			{/* <IconBoxes/> */}
			{/*<PopularCategory/>*/}

			{section_one_active === "enable" && (
				<SectionsOne settings={settings}/>
			)}
			{section_two_active === "enable" && (
				<SectionsTwo settings={settings}/>
			)}
			{section_three_active === "enable" && (
				<SectionsThree settings={settings}/>
			)}
			{section_four_active === "enable" && (
				<SectionsFour  settings={settings}/>
			)}
			{section_five_active === "enable" && (
				<SectionsFive settings={settings}/>
			)}

			<ProductsLoving/>
			{/* <RecentProduct/> */}
			{/*<BrandProduct/>*/}
			{/*<Blog/>*/}
		</main>
	);
};


export default Home;
