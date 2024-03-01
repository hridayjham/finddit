import { View, Text, Image } from "react-native";
import React from "react";
import Swiper from "react-native-deck-swiper";
import cardOverlayLabels from "../../styles/cardOverlayLabels";
import styles from "../../styles/groupCreatedStyles";
import CardItem from "../../components/CardItem";
import { icons } from "../../utils/constants";
import {
    swipeOnRestaurant,
    userFinishedVoting,
} from "../../utils/api_function_calls/group_functions";

const GroupCreated = ({ route, navigation }) => {
    const { groupName, groupId, groupIcon, cardData, loggedInUser } =
        route.params;
    const renderCardItem = (item) => {
        return (
            <View style={styles.card}>
                <CardItem itemData={item}></CardItem>
            </View>
        );
    };

    const onRightSwipe = async (index) => {
        const card = cardData[index];
        const restaurantID = card["place_id"];
        await swipeOnRestaurant(groupId, restaurantID, "right");
    };
    const onLeftSwipe = async (index) => {
        const card = cardData[index];
        const restaurantID = card["place_id"];
        await swipeOnRestaurant(groupId, restaurantID, "left");
    };
    const onDownSwipe = async (index) => {
        const card = cardData[index];
        const restaurantID = card["place_id"];
        await swipeOnRestaurant(groupId, restaurantID, "down");
    };
    const onUPSwipe = () => {};

    const onSwipeAllCards = async () => {
        await userFinishedVoting(groupId, loggedInUser);
        navigation.navigate("LeaderBoard");
    };

    return (
        <View>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 20,
                }}
            >
                <Image
                    source={icons.find((icon) => icon.id === groupIcon).source}
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        borderWidth: 2,
                        borderColor: "#f27575",
                        alignSelf: "left",
                    }}
                ></Image>
                <Text
                    style={{
                        marginLeft: 5,
                        textAlign: "center",
                        alignSelf: "center",
                        fontSize: 30,
                        fontWeight: "bold",
                    }}
                >
                    {groupName}
                </Text>
            </View>
            <View>
                <Swiper
                    cards={cardData}
                    renderCard={renderCardItem}
                    onSwiped={(cardIndex) => {
                        console.log(cardIndex);
                    }}
                    cardIndex={0}
                    stackSeparation={15}
                    disableBottomSwipe={true}
                    onSwipedLeft={(cardIndex) => onLeftSwipe(cardIndex)}
                    onSwipedRight={(cardIndex) => onRightSwipe(cardIndex)}
                    onSwipedTop={(cardIndex) => onDownSwipe(cardIndex)}
                    onSwipedAll={() => onSwipeAllCards()}
                    stackSize={5}
                    animateCardOpacity={true}
                    overlayLabels={cardOverlayLabels}
                ></Swiper>
            </View>
        </View>
    );
};

export default GroupCreated;
