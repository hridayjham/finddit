import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    searchBar: {
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        borderRadius: 30,
        paddingHorizontal: 15,
        marginHorizontal: 20,
        marginTop: 10,
        alignContent: "center",
        borderWidth: 1,
        borderColor: "transparent",
        backgroundColor: "#ECE6F6",
    },
    searchIcon: {
        marginTop: 3,
        marginRight: 4,
        alignSelf: "center",
    },
    input: {
        flex: 1,
        height: 45,
        color: "#333", // Text color
    },
});

export default styles;
