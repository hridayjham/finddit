import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    map: {
      width: '100%',
      height: '100%',
    },
    groupName: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    locationContainer: {
        marginTop: 20,
        marginBottom: 10,
    },
    locationLabel: {
        fontSize: 18,
        marginBottom: 8,
    },
    radiusContainer: {
        marginTop: 20,
        marginBottom: 15,
    },
    radiusLabel: {
        fontSize: 18,
        marginBottom: 8,
    },
    input: {
        fontSize: 16,
        borderWidth: 1,
        width: Dimensions.get("window").width - 50, // Take up full width
        borderColor: "transparent",
    },
    slider: {
        width: "100%",
    },
    priceRangeContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    priceLabel: {
        fontSize: 18,
        marginBottom: 8,
        marginTop: 20,
    },
    priceRangeButton: {
        flex: 1,
        borderColor: "#rgba(242, 117, 117, 0.35)",
        padding: 10,
        borderWidth: 4,
        borderRadius: 100,
        alignItems: "center",
        margin: 2,
    },
    selectedPriceRange: {
        backgroundColor: "#f27575",
    },
    priceRangeText: {
        fontSize: 16,
    },
    nextButton: {
        position: "absolute",
        bottom: 20,
        right: 40,
        backgroundColor: "#f27575",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    nextButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    toggleButtonContainer: {
        flexDirection: "column",
    },
    openNowSwitchLabel: {
        fontSize: 18,
        marginTop: 16,
    },
    openNowSwitch: {
        marginTop: 16,
    },
});

export default styles;
