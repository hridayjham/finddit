import { StyleSheet, Dimensions, Platform } from "react-native";

const screenHeight = Dimensions.get("window").height;
const bottomTabHeight = 50;

const styles = StyleSheet.create({
    card: {
        maxHeight:
            Platform.OS === "ios"
                ? screenHeight - bottomTabHeight - 280
                : screenHeight * 0.7,
        marginTop: -40,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 10,
        borderColor: "#f27575",
        borderWidth: 2,
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
    },
});

export default styles;
