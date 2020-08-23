import React from "react";
import {
	View,
	FlatList
} from "react-native";
import { Provider } from "react-redux";
import store from "./src/redux";
import SearchBox from "./src/components/SearchBox";
import UsersList from "./src/components/UsersList";

const App = () => {

	return (
		<Provider store={store}>
			<View style={{ flex: 1 }}>
				<SearchBox />
				<UsersList />
			</View>
		</Provider>
	);
};

export default App;