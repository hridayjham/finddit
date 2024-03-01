import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    signOutButton: {
        width: "50%",
        padding: 15,
        borderRadius: 30,
        backgroundColor: "#f27575",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    signOutButtonText: {
        color: "white",
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
    },
});

export default styles;
