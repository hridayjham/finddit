import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    headingForProfileIcon: {
        color: "black",
        fontSize: 18,
        textAlign: "center",
        marginTop: 30,
        marginBottom: 30,
    },
    profileCircle: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 6,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
        borderColor: "rgba(242, 117, 117, 0.35)",
        position: "relative",
    },
    circleBorder: {
        top: 10,
        right: 10,
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: "lightgray", // Border color
        position: "absolute",
        borderColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
    },
    plusIcon: {
        position: "absolute",
        color: "black",
    },
    textInputView: {
        flex: 1,
        flexDirection: "column",
    },
    textInputView: {
        marginTop: 20,
        flex: 1,
        flexDirection: "column",
        width: Dimensions.get("window").width - 50, // Take up full width
    },
    textInput: {
        height: 40,
    },
    nextButton: {
        position: "relative",
        left: 110,
        bottom: 20,
    },
    headingForGroupName: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 20,
    },
    iconGrid: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    imageContainer: {
        margin: 5,
        borderWidth: 2,
        borderColor: "transparent",
        padding: 5,
        borderRadius: 20,
    },
    image: {
        width: 100,
        height: 100,
    },
    profileIcon: {
        width: 120,
        height: 120,
    },
    iconText: {
        fontSize: 16,
    },
    selectedIcon: {
        borderRadius: 20,
        borderColor: "#f27575",
        borderWidth: 2, // Customize the border width for the selected icon
    },
    buttonContainer: {
        flexDirection: "row",
        marginTop: 20,
    },
    selectButton: {
        backgroundColor: "#f27575",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginLeft: 20,
        marginBottom: 20,
    },
    cancelButton: {
        backgroundColor: "gray",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default styles;
