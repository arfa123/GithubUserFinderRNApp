import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	Modal,
	Image,
	TouchableOpacity,
	ActivityIndicator,
	StyleSheet
} from "react-native";

const UserDetails = ({ visible, username, closeModal }) => {

	const [loading, setLoading] = useState(false);
	const [userDetails, setUserDetails] = useState({});

	useEffect(() => {
		const getUserDetails = async () => {
			setLoading(true);
			const res = await fetch(`https://api.github.com/users/${username}`);
			const response = await res.json();

			const { avatar_url, followers, following, location, name } = response;
			setUserDetails({ avatar_url, followers, following, location, name });
			setLoading(false);
		};

		getUserDetails();

	}, [])

	return (
		<Modal
			visible={visible}
			animationType="fade"
			transparent={true}
		>
			<View style={styles.container}>
				<View style={styles.innerCont}>
					<TouchableOpacity onPress={closeModal} activeOpacity={0.7} style={styles.closeBtn}>
						<Text style={styles.close}>Close</Text>
					</TouchableOpacity>
					<View style={styles.avatarCont}>
						<Image
							source={{ uri: userDetails.avatar_url }}
							style={styles.avatar}
						/>
					</View>
					<View style={styles.detailsCont}>
						<Text style={styles.detailHeading}>Name: <Text style={styles.detailText}>{userDetails.name}</Text></Text>
						<Text style={styles.detailHeading}>Followers: <Text style={styles.detailText}>{userDetails.followers}</Text></Text>
						<Text style={styles.detailHeading}>Following: <Text style={styles.detailText}>{userDetails.following}</Text></Text>
						<Text style={styles.detailHeading}>Location: <Text style={styles.detailText}>{userDetails.location}</Text></Text>
					</View>
				</View>
				{loading &&
					<View style={styles.loaderCont}>
						<ActivityIndicator color="red" size="large" />
					</View>
				}
			</View>
		</Modal>
	);
};

export default UserDetails;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "center",
		alignItems: "center"
	},
	innerCont: {
		backgroundColor: "#fff",
		minHeight: 400,
		width: "80%",
		borderRadius: 20
	},
	closeBtn: {
		alignSelf: "flex-end"
	},
	close: {
		padding: 10,
		color: "red"
	},
	avatarCont: {
		width: 200,
		height: 200,
		borderRadius: 100,
		backgroundColor: "#d3d3d3",
		alignSelf: "center",
		overflow: "hidden"
	},
	avatar: {
		height: "100%",
		width: "100%",
		resizeMode: "contain"
	},
	detailsCont: {
		flexGrow: 1,
		marginBottom: 10,
		justifyContent: "space-around",
		alignItems: "center"
	},
	detailHeading: {
		fontWeight: "bold",
		fontSize: 15
	},
	detailText: {
		fontWeight: "normal"
	},
	loaderCont: {
		position: "absolute",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		width: "100%",
		height: "100%",
		justifyContent: "center",
		alignSelf: "center"
	}
});