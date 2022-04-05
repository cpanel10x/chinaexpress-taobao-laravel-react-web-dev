import React, {useEffect} from "react";
import {useLocation} from "react-router-dom";


export const useQuery = () => {
	const {search} = useLocation();
	return React.useMemo(() => new URLSearchParams(search), [search]);
};
