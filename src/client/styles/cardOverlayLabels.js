import { Entypo, FontAwesome } from "@expo/vector-icons";
import { Platform } from "react-native";

export default cardOverlayLabels = {
    left: {
        element: <Entypo name="cross" size={84} color="red" />,
        style: {
            wrapper: {
                flexDirection: "column",
                alignItems: "flex-end",
                justifyContent: "flex-start",
                marginTop: -80,
                marginLeft: 40,
            },
        },
    },
    right: {
        element: <Entypo name="check" size={72} color="green" />,
        style: {
            wrapper: {
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                marginTop: -80,
                marginLeft: -30,
            },
        },
    },
    top: {
        element: <FontAwesome name="thumbs-o-down" size={72} color="black" />,
        style: {
            wrapper: {
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 40,
            },
        },
    },
};
