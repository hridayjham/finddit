import { View, Text, Image } from "react-native";
import React from "react";
import styles from "../styles/CardItemStyles";
import { Entypo } from "@expo/vector-icons";

const CardItem = ({ itemData }) => {
    // @kanwar need to add restuarnt id here so that we can add store swipes and shit directly to the restuartnat id
    const { name, rating, vicinity, place_opening_hours, price_level, image } =
        itemData;
    const costDict = {
        1: "$",
        2: "$$",
        3: "$$$",
        4: "$$$$",
    };
    return (
        <View style={styles.card}>
            <Image source={{ uri: image }} style={styles.image} />
            <View style={styles.infoContainer}>
                <Text numberOfLines={2} style={styles.name}>
                    {name}
                </Text>
                <Text style={styles.location}>{vicinity}</Text>
                <Text style={styles.operationalHours}>
                    {place_opening_hours.open_now}
                </Text>
                <View style={styles.ratingContainer}>
                    <Text style={styles.rating}>{rating}</Text>
                    <Entypo name="star" size={30} color="#fdd663" />
                </View>
                <View style={styles.ratingContainer}>
                    <Text style={styles.rating}>{costDict[price_level]}</Text>
                </View>
            </View>
        </View>
    );
};

export default CardItem;
