import ReactGA from "react-ga";

const TRACKING_ID = "UA-188499439-1"; // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID);


export const analyticsPageView = () => {
	ReactGA.pageview(window.location.pathname + window.location.search);
	// console.log('activated');
};

export const analyticsEventTracker = (category = "ChineExpress Home", action = "Test click", label = "Test Lavel") => {
	ReactGA.event({category, action, label});
};