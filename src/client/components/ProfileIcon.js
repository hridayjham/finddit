import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles from "../styles/ProfileIcon";
import { Icon } from "@rneui/base";
import { MaterialIcons } from "@expo/vector-icons";

const ProfileIcon = ({ user, removeUser }) => {
    function removeUserOnPress() {
        removeUser(user.email);
    }
    return (
        <View style={styles.profileContainer}>
            <TouchableOpacity onPress={removeUserOnPress}>
                <View style={styles.cancelIcon}>
                    <Icon name="cancel" size={36} color="gray" />
                </View>
            </TouchableOpacity>
            <View style={styles.iconContainer}>
                <MaterialIcons name="person-outline" size={72} color="gray" />
            </View>
            <Text style={styles.userName}>
                {user.firstName} {user.lastName}
            </Text>
        </View>
    );
};

export default ProfileIcon;
