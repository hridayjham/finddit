import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    actionButton: {
        width: 200, // Button width
        height: 200, // Button height
        borderWidth: 3,
        borderColor: "#f27575",
        borderRadius: 15, // Button border radius
        marginBottom: 30, // Spacing between buttons
        justifyContent: "center",
        alignItems: "center",
        shadowOffset: { width: 3, height: 3 }, // Button shadow
        shadowOpacity: 0.5,
        shadowRadius: 3,
        backgroundColor: "white",
    },
    buttonText: {
        color: "black", // Text color
        fontSize: 18, // Text font size
        fontWeight: "bold", // Text font weight
    },

    createSessionIcon: {
        position: "relative",
        bottom: 0,
        top: 20,
    },

    joinSessionIcon: {
        // position: "relative",
        bottom: 0,
        top: 20,
        right: 5,
    },
});

export default styles;
