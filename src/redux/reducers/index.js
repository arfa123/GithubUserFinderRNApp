import { act } from "react-test-renderer";

const initialState = {
	loading: false,
	users: []
};

export default reducer = (state = initialState, action) => {
	switch (action.type) {
		case "LOADING":
			return { ...state, loading: action.payload };
		case "USERS":
			return { ...state, users: action.payload, loading: false };
		default:
			return state;
	}
};