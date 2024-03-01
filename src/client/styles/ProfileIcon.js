import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    profileContainer: {
        alignItems: "center",
        marginTop: 20,
        marginBottom: 20,
        flexDirection: "row",
        flexWrap: "wrap",
        maxWidth: Dimensions.get("window").width - 200,
    },
    userName: {
        marginLeft: 25,
        fontSize: 18, // Adjust the font size as needed
    },
    iconContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#fbe1e5",
        marginBottom: 18,
        marginLeft: 22,
        alignItems: "center",
        justifyContent: "center",
    },
    cancelIcon: {
        top: -65,
        left: 110,
        borderRadius: 15,
        position: "absolute",
        borderColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default styles;
