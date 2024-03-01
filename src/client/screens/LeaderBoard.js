import { View, Text } from "react-native";
import React from "react";

const LeaderBoard = () => {
    return (
        <View>
            <Text
                style={{
                    marginTop: 100,
                    textAlign: "center",
                    fontSize: 30,
                    fontWeight: "bold",
                    color: "gray",
                }}
            >
                Leader board will be displayed here
            </Text>
        </View>
    );
};

export default LeaderBoard;
