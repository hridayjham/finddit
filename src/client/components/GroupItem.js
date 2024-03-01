import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "../styles/GroupItemStyles";
import { icons } from "../utils/constants";
import { useNavigation } from "@react-navigation/native";
import {
    checkIfUserFinishedVoting,
    checkUserCheckedIn,
    getCardDataFromGroup,
} from "../utils/api_function_calls/group_functions";
import { fetchImageUrl } from "../utils/functions";
import { Modal } from "react-native";
import LeaderBoard from "../screens/LeaderBoard";
const GroupItem = ({ group, loggedInUser }) => {
    const navigation = useNavigation();
    const {
        groupIconID,
        groupName,
        groupAdminEmail,
        votingDeadline,
        groupMembersEmails,
        timeStamp,
    } = group.groupMetadata;
    const groupID = group.groupID;
    const [remainingTime, setRemainingTime] = useState(null);
    const [isExpired, setIsExpired] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const SessionCreationtime = new Date(
            timeStamp.seconds * 1000 + timeStamp.nanoseconds / 1000000
        );
        const expirationTime = new Date(
            SessionCreationtime.getTime() + votingDeadline * 3600000
        );
        const currentTime = new Date();
        const timeDifference = expirationTime - currentTime;

        if (timeDifference > 0) {
            const hours = Math.floor(timeDifference / 3600000);
            const minutes = Math.floor((timeDifference / 60000) % 60);
            setRemainingTime(`${hours}h ${minutes}m`);
            setIsExpired(false);
        } else {
            // Session has expired
            setRemainingTime("Expired");
            setIsExpired(true);
        }
    }, []);

    const handleJoinSessionButton = async () => {
        if (isLoading) {
            // The button is already processing a request; prevent further clicks.
            return;
        }
        setIsLoading(true);
        try {
            const isCheckedIn = await checkUserCheckedIn(groupID, loggedInUser);
            if (isCheckedIn) {
                const hasVoted = await checkIfUserFinishedVoting(
                    groupID,
                    loggedInUser
                );
                if (hasVoted) {
                    navigation.navigate("LeaderBoard");
                } else {
                    const cardData = await getCardDataFromGroup(groupID);
                    let cards = await fetchImageUrl(cardData);
                    if (cards.length === 0) {
                        alert("No restaurants found");
                        return;
                    }
                    const group = {
                        groupName: groupName,
                        groupId: groupID,
                        cardData: cards,
                        groupIcon: groupIconID,
                        loggedInUser: loggedInUser,
                    };
                    navigation.navigate("GroupCreated", group);
                }
            } else {
                navigation.navigate("UserPreferences", {
                    groupID: groupID,
                    groupIconID: groupIconID,
                    groupName: groupName,
                    groupAdminEmail: groupAdminEmail,
                    votingDeadline: votingDeadline,
                    groupMembersEmails: groupMembersEmails,
                    timeStamp: timeStamp,
                });
            }
        } catch (err) {
            throw err;
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <View>
            <Modal visible={isLoading} transparent={false}>
                <Text
                    style={{
                        marginTop: 150,
                        textAlign: "center",
                        fontSize: 30,
                        fontWeight: "bold",
                        color: "gray",
                    }}
                >
                    Loading
                </Text>
            </Modal>
            <TouchableOpacity
                style={[
                    styles.container,
                    isExpired
                        ? styles.expiredContainer
                        : styles.activeContainer,
                ]}
                onPress={() => handleJoinSessionButton()}
            >
                <View style={styles.leftContainer}>
                    <Image
                        source={
                            icons.find((icon) => icon.id === groupIconID)
                                ? icons.find((icon) => icon.id === groupIconID)
                                      .source
                                : icons[0].source
                        }
                        style={styles.iconContainer}
                    ></Image>
                </View>
                <View>
                    <Text style={styles.groupName}>{groupName}</Text>
                    <Text style={styles.createdBy}>
                        Created by: {groupAdminEmail}
                    </Text>
                    <Text style={styles.expiresIn}>
                        Expires in: {remainingTime}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default GroupItem;
