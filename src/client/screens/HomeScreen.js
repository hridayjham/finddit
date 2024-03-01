import { View, Text, TouchableOpacity, TouchableHighlight } from "react-native";
import React from "react";
import styles from "../styles/homeScreenStyles";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import useAuth from "../hooks/useAuth";

const HomeScreen = () => {
  const navigation = useNavigation();
  const user = useAuth()
  const handleButton1Press = () => {
    navigation.navigate("GroupInnit");
  };

  const handleButton2Press = () => {
    navigation.navigate("ActiveSessions" , {email: user.user.email});
  };
    return (
        <>
            <View style={styles.container}>
                <TouchableHighlight
                    style={styles.actionButton}
                    underlayColor="#f8e7e9"
                    onPress={handleButton1Press}
                >
                    <>
                        <Text style={styles.buttonText}>CREATE A SESSION</Text>
                        <AntDesign
                            name="plus"
                            size={60}
                            color="black"
                            style={styles.createSessionIcon}
                        />
                    </>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.actionButton}
                    underlayColor="#f8e7e9"
                    onPress={handleButton2Press}
                >
                    <>
                        <Text style={styles.buttonText}>JOIN A SESSION</Text>
                        <Ionicons
                            name="enter-outline"
                            size={60}
                            color="black"
                            style={styles.joinSessionIcon}
                        />
                    </>
                </TouchableHighlight>
            </View>
        </>
    );
};

export default HomeScreen;
