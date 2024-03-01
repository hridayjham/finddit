import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Header = ({ backbuttonShown = true }) => {
  const navigation = useNavigation();
  const onBackPress = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
      <View style={styles.header}>
        {backbuttonShown ? (
          <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
            <Ionicons name="arrow-back" size={40} color="#F27575" />
          </TouchableOpacity>
        ) : null}
        <Text style={styles.title}>Finddit</Text>
      </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 60, // Header height
  },
  backButton: {
    position: "absolute",
    left: 10, // Adjust the left position as needed
  },
  backButtonText: {
    color: "#f27575",
    fontSize: 16, // Back button text font size
  },
  title: {
    color: "#f27575",
    fontSize: 40, // Title text font size
    fontWeight: "bold", // Title text font weight
  },
});

export default Header;
