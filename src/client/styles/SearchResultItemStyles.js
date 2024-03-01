import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "stretch",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    rowContainer: {
        width: 300,
        flexDirection: "row",
        alignItems: "center",
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25, // For a circular profile image
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
    },
    firstName: {
        fontSize: 20,
        fontWeight: "bold",
    },
    lastName: {
        fontSize: 20,
        fontWeight: "bold",
    },
    email: {
        fontSize: 14,
        color: "rgba(0, 0, 0, 0.5)", // Slightly faded text
    },
});
export default styles;
