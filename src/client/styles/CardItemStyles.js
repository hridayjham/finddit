import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: "white",
        borderRadius: 10,
        margin: 10,
    },
    image: {
        marginTop: 5,
        width: Dimensions.get("window").width - 70,
        height: Dimensions.get("window").height / 3.3,
        borderRadius: 10,
    },
    infoContainer: {
        padding: 10,
    },
    name: {
        fontSize: 32,
        fontWeight: "bold",
    },
    location: {
        marginTop: 5,
        fontSize: 22,
        color: "gray",
    },
    operationalHours: {
        fontSize: 16,
        color: "gray",
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
    },
    rating: {
        fontSize: 28,
        color: "orange",
        marginRight: 5,
    },
});

export default styles;
