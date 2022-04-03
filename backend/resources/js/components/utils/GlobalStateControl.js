import {isEmpty} from "lodash";

const store = {};
export const CheckAndSetErrors = (responseData, errorShow = true) => {
	const errors = !isEmpty(responseData) ? responseData.errors : {};
	if (errorShow) {
		if (!isEmpty(errors)) {
			configureStore.dispatch({
				type: Types.GQL_ERRORS,
				payload: {
					errors: errors,
				},
			});
		}
	}
	return isEmpty(errors);
};

export const setGlobalErrors = (errors) => {
	errors = errors ? errors : {};
	store.dispatch({
		type: Types.GLOBAL_ERROR,
		payload: {
			data: errors.data ? errors.data : {},
			status: errors.status ? errors.status : "",
			statustext: errors.statustext ? errors.statustext : "",
			request: errors.request ? errors.request : {},
		},
	});
};

export const clearGlobalErrors = () => {
	store.dispatch({
		type: Types.GLOBAL_ERROR,
		payload: {
			errors: [],
			data: {},
			status: "",
			statustext: "",
			request: {},
		},
	});
};


export const selectedActiveAttributes = (Attribute) => {
	store.dispatch({
		type: Types.SELECT_ATTRIBUTE,
		payload: {
			Attribute: Attribute,
		},
	});
};

export const selectedActiveConfiguredItems = (SelectConfiguredItems) => {
	store.dispatch({
		type: Types.SELECT_CONFIGURED_ITEMS,
		payload: {
			SelectConfiguredItems: SelectConfiguredItems,
		},
	});
};


