import React from "react";
import {
	View,
	TextInput,
	StyleSheet,
	Alert
} from "react-native";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { setLoading, setUsers } from "./../../redux/actions";

const SearchBox = () => {

	const dispatch = useDispatch();

	const searchInputText = async (value) => {
		if (value) {
			dispatch(setLoading(true));
			const res = await fetch(`https://api.github.com/search/users?q=${value}`);
			const response = await res.json();
			console.log("users: ", response);
			if (!_.isEmpty(response.items)) {
				dispatch(setUsers(response.items));
			} else if (response.message) {
				Alert.alert("", response.message);
				dispatch(setUsers([]));
			} else dispatch(setUsers([]));
		} else dispatch(setUsers([]));
	};
	const handleInputChange = _.throttle(searchInputText, 1000);


	return (
		<View style={styles.container}>
			<TextInput
				onChangeText={handleInputChange}
				placeholder="Enter Github username"
				style={styles.searchBox}
			/>
		</View>
	);
};

export default SearchBox;

const styles = StyleSheet.create({
	container: {
		flex: 0.1,
		justifyContent: "center",
		alignItems: "center"
	},
	searchBox: {
		fontSize: 15,
		height: "80%",
		width: "90%",
		borderWidth: 1,
		borderRadius: 20,
		paddingHorizontal: 20
	}
});