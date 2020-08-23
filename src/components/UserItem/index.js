import React from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	StyleSheet
} from "react-native";

const UserItem = ({ username, githubUrl, avatarUrl, onUserSelect }) => {
	return (
		<TouchableOpacity onPress={() => onUserSelect(username)} activeOpacity={0.7} style={styles.container}>
			<View style={styles.imageCont}>
				<Image
					source={{ uri: avatarUrl }}
					style={styles.image}
				/>
			</View>
			<View style={styles.detailsCont}>
				<Text allowFontScaling={false} style={styles.username}>Name: {username}</Text>
				<Text allowFontScaling={false}>
					{"Github URL: "}
					<Text
						allowFontScaling={false}
						onPress={() => Linking.openURL(githubUrl)}
						style={styles.githubUrl}>{githubUrl}</Text>
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default UserItem;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		width: "95%",
		alignSelf: "center",
		height: 100,
		flexDirection: "row",
		justifyContent: "space-between"
	},
	imageCont: {
		width: 100,
		height: 100,
		overflow: "hidden",
		borderRadius: 50,
		backgroundColor: "#d3d3d3"
	},
	image: {
		width: "100%",
		height: "100%",
		resizeMode: "contain"
	},
	detailsCont: {
		flex: 1,
		marginLeft: 10,
		justifyContent: "center"
	},
	username: {
		fontSize: 20
	},
	githubUrl: {
		textDecorationLine: "underline",
		color: "blue"
	}
});