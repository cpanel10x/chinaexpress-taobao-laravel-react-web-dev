import React, {useLayoutEffect, useState} from "react";
import CopyRight from "./CopyRight";
import StickyFooter from "./StickyFooter";
import MobileMenu from "./MobileMenu";

const useWindowSize = () => {
	const [size, setSize] = useState([0, 0]);
	useLayoutEffect(() => {
		function updateSize() {
			setSize([window.innerWidth, window.innerHeight]);
		}

		window.addEventListener("resize", updateSize);
		updateSize();
		return () => window.removeEventListener("resize", updateSize);
	}, []);
	return size;
};

const StickyFooterManage = (props) => {
	const {settings} = props;
	let [width, height] = useWindowSize();

	width = width ? width : window.innerWidth;
	height = height ? height : window.innerHeight;

	if (width <= 751 && height > 0) {
		return (
			<>
				<CopyRight width={width} settings={settings}/>
				<MobileMenu/>
				<div className="container">
					<StickyFooter settings={settings}/>
				</div>
			</>
		);
	}

	return <CopyRight width={width} settings={settings}/>;
};

export default StickyFooterManage;
