import React, {useLayoutEffect, useState} from "react";
import Header from "./Header";
import MobileHeader from "./MobileHeader";
import {useMediaQuery} from 'react-responsive'
import {useWishList} from "../api/GeneralApi";
import {useCart} from "../api/CartApi";
import {useAuthMutation} from "../api/Auth";


const HeaderManage = props => {
	const {settings} = props;

	const {customer} = useAuthMutation();

	const {data: wishList} = useWishList();
	const {data: cart} = useCart();

	const isMobile = useMediaQuery({query: '(max-width: 991px)'});


	if (isMobile) {
		console.log('mobile activated');
		return (
			<MobileHeader
				customer={customer}
				wishList={wishList}
				cart={cart}
				settings={settings}
			/>
		);
	}

	return (
		<Header
			customer={customer}
			wishList={wishList}
			cart={cart}
			settings={settings}
		/>
	);
};


export default HeaderManage;
