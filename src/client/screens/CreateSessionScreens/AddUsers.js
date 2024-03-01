import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Modal,
    SafeAreaView,
    ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import UserSearchBar from "../../components/UserSearchBar";
import ProfileIcon from "../../components/ProfileIcon";
import styles from "../../styles/AddUsersStyles";
import { findUserByEmailOrName } from "../../utils/api_function_calls/user_functions";
import SearchResultItem from "../../components/SearchResultItem";
import useAuth from "../../hooks/useAuth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const AddUsers = ({ route, navigation }) => {
    const { groupName, groupIcon } = route.params;
    const loggedInUser = useAuth();
    const loggedInUserEmail = loggedInUser?.user?.email;
    const [groupMembers, setGroupMembers] = useState([]);
    const [resultDropdownShown, setResultDropdownShown] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    function handleNextButtonPressed() {
        if (groupMembers.length !== 0) {
            navigation.navigate("GroupPreferences", {
                groupName,
                groupIcon,
                groupMembers,
            });
        } else {
            alert("Add at least 1 user");
        }
    }
    async function searchUser(input) {
        if (isLoading) {
            // The button is already processing a request; prevent further clicks.
            return;
        }
        setIsLoading(true);
        try {
            const response = await findUserByEmailOrName(
                input,
                loggedInUserEmail
            );
            setSearchResult(response);
            setResultDropdownShown(true);
        } catch (err) {
            throw err;
        } finally {
            setIsLoading(false);
        }
    }
    function addMember(user) {
        const index = groupMembers.findIndex(
            (existingUser) => existingUser.email === user.email
        );
        if (index === -1) {
            let temp = groupMembers;
            temp.push(user);
            setGroupMembers(temp);
            setResultDropdownShown(false);
        } else {
            alert("User already exists");
        }
    }
    function removeUser(email) {
        let temp = groupMembers.filter((user) => user.email !== email);
        setGroupMembers(temp);
    }

    // Render individual icons in the grid
    const renderIconItem = ({ item }) => (
        <ProfileIcon user={item} removeUser={removeUser} />
    );

    const renderResultItem = ({ item }) => (
        <TouchableOpacity onPress={() => addMember(item)}>
            <SearchResultItem item={item}></SearchResultItem>
        </TouchableOpacity>
    );

    function hideResults() {
        setResultDropdownShown(false);
        setSearchResult([]);
    }
    return (
        <View
            style={{
                display: "flex",
                flex: 1,
                alignContent: "center",
                alignItems: "center",
            }}
        >
            <Text>{groupName}</Text>
            <UserSearchBar
                searchUser={searchUser}
                hideResults={hideResults}
                searchResultsShown={resultDropdownShown}
            ></UserSearchBar>
            <KeyboardAwareScrollView
                style={{ flex: 1, display: "flex" }}
            ></KeyboardAwareScrollView>
            {resultDropdownShown ? (
                <View style={{ margin: 20 }}>
                    {isLoading ? (
                        <ActivityIndicator />
                    ) : (
                        <View>
                            <View>
                                {searchResult.length > 0 ? (
                                    <Text> Search Results </Text>
                                ) : (
                                    <Text> No user found</Text>
                                )}
                            </View>
                            <FlatList
                                data={searchResult}
                                renderItem={renderResultItem}
                            />
                        </View>
                    )}
                </View>
            ) : (
                <KeyboardAwareScrollView
                    style={{ flex: 1, display: "flex" }}
                ></KeyboardAwareScrollView>
            )}

            <FlatList
                columnWrapperStyle={{ margin: 15 }}
                horizontal={false}
                data={groupMembers}
                renderItem={renderIconItem}
                numColumns={2} // Adjust the number of columns as needed
                contentContainerStyle={styles.iconGrid}
            />

            <TouchableOpacity onPress={handleNextButtonPressed}>
                <MaterialCommunityIcons
                    name="arrow-right-circle"
                    size={80}
                    color="#F27575"
                    style={styles.nextButton}
                />
            </TouchableOpacity>
        </View>
    );
};

export default AddUsers;
