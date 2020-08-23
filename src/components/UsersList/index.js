import React, { useState } from "react";
import {
	View,
	Text,
	FlatList,
	ActivityIndicator,
	StyleSheet
} from "react-native";
import { useSelector } from "react-redux";
import _ from "lodash";
import UserItem from "../UserItem";
import UserDetails from "../UserDetails";

const UsersList = () => {

	const [selectedUsername, setSelectedUsername] = useState("");
	const [userDetailsVisible, setUserDetails] = useState(false);
	const usersList = useSelector(state => state.users);
	const loading = useSelector(state => state.loading);

	const toggleUserDetailsModal = () => {
		if (userDetailsVisible) {
			setSelectedUsername("");
		}
		setUserDetails(!userDetailsVisible);
	};

	const onUserSelect = (username) => {
		toggleUserDetailsModal();
		setSelectedUsername(username);
	};

	const renderUser = ({ item }) => {
		return (
			<UserItem
				onUserSelect={onUserSelect}
				username={item.login}
				avatarUrl={item.avatar_url}
				githubUrl={item.html_url}
			/>
		);
	};

	const renderList = () => {
		if (_.isEmpty(usersList)) {
			return (
				<View style={styles.emptyTextCont}>
					<Text>No User Found</Text>
				</View>
			);
		} else {
			return (
				<FlatList
					contentContainerStyle={styles.listCont}
					data={usersList}
					renderItem={renderUser}
					keyExtractor={(item) => item.id + ""}
					ItemSeparatorComponent={() => <View style={styles.listItemSeparator}></View>}
				/>
			);
		}
	};

	return (
		<View style={styles.container}>
			{userDetailsVisible &&
				<UserDetails
					visible={userDetailsVisible}
					username={selectedUsername}
					closeModal={toggleUserDetailsModal}
				/>
			}
			{renderList()}
			{loading &&
				<View style={styles.loaderCont}>
					<ActivityIndicator color="red" size="large" />
				</View>
			}
		</View>
	);
};

export default UsersList;

const styles = StyleSheet.create({
	container: {
		flex: 0.9
	},
	loaderCont: {
		position: "absolute",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		width: "100%",
		height: "100%",
		justifyContent: "center",
		alignSelf: "center"
	},
	emptyTextCont: {
		flex: 1,
		justifyContent: "center",
		alignSelf: "center"
	},
	listCont: {
		paddingBottom: 20
	},
	listItemSeparator: {
		height: 15
	}
});