export const setLoading = (status) => {
	return {
		type: "LOADING",
		payload: status
	};
};

export const setUsers = (users) => {
	return {
		type: "USERS",
		payload: users
	};
};