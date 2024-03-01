import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Switch,
    SafeAreaView,
    Modal,
} from "react-native";
import React, { useState, useRef } from "react";
import styles from "../../styles/GroupPreferencesStyles";
import Slider from "@react-native-community/slider";
import useAuth from "../../hooks/useAuth";
import {
    createNewGroup,
    getCardDataFromGroup,
    userCheckIn,
} from "../../utils/api_function_calls/group_functions";
import { useNavigation } from "@react-navigation/native";
import { Divider } from "@rneui/themed";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import MapView, { Circle, Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { getEmbedUrlFromPhotoRef } from "../../utils/api_function_calls/photo_functions";
import { ActivityIndicator } from "react-native";

const GroupPreferences = ({ route, navigation }) => {
    const { groupName, groupIcon, groupMembers } = route.params;
    const admin = useAuth();
    const [radius, setRadius] = useState(1); // Default radius value
    const [selectedPriceRange, setSelectedPriceRange] = useState(null);
    const [openNow, setOpenNow] = useState(true);
    const [groupDeadLine, setGroupDeadLine] = useState(24);
    const [isActive, setIsActive] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [locationSelected, setLocationSelected] = useState(false);
    const mapRef = useRef(null);

    const handleRadiusChange = (value) => {
        setRadius(value);
    };
    const fetchImageUrl = async (cardData) => {
        const cards = [];

        const promises = cardData.data.map(async (item) => {
            try {
                let ref = item.photos[0].photo_reference;
                let imageUrl = await getEmbedUrlFromPhotoRef(ref, 1000);
                let card = {
                    ...item,
                    image: imageUrl,
                };
                cards.push(card);
            } catch (error) {
                // Handle errors if necessary
                console.error(`Error processing item: ${error.message}`);
            }
        });

        await Promise.all(promises);

        return cards;
    };

    const handlePriceRangeSelect = (priceRange) => {
        setSelectedPriceRange(priceRange);
    };

    const [region, setRegion] = React.useState({
        latitude: 43.260838906356824,
        longitude: -79.91288781166078,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const handleLocationSelect = (data, details) => {
        if (mapRef.current && details) {
            const newLocation = {
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
            };
            setRegion(newLocation);
            setLocationSelected(true);
            mapRef.current.animateToRegion({
                latitude: newLocation.latitude,
                longitude: newLocation.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        }
    };

    const handleGenerateButtonPressed = async () => {
        if (!radius || !selectedPriceRange || !locationSelected) {
            alert("please enter valid fields");
            return;
        }
        const adminPreferences = {
            latitude: region.latitude,
            longitude: region.longitude,
            radius: radius * 10000,
            keyword: "restaurant",
            maxPrice: selectedPriceRange,
            minPrice: 1,
            openNow: openNow,
        };
        const groupMembersEmails = groupMembers.map((user) => user.email);
        if (isLoading) {
            // The button is already processing a request; prevent further clicks.
            return;
        }
        setIsLoading(true);
        try {
            const res = await createNewGroup(
                groupName,
                groupIcon,
                admin.user.email,
                groupMembersEmails,
                groupDeadLine,
                isActive,
                adminPreferences
            );
            if (res.data) {
                const groupId = res.data;
                const cardData = await getCardDataFromGroup(groupId);
                let cards = await fetchImageUrl(cardData);
                if (cards.length === 0) {
                    alert("No restaurants found");
                    return;
                }
                await userCheckIn(groupId, admin.user.email, {
                    radius: radius * 10000,
                    maxPrice: selectedPriceRange,
                    minPrice: 1,
                });
                const group = {
                    groupName: groupName,
                    groupId: groupId,
                    cardData: cards,
                    groupIcon: groupIcon,
                    loggedInUser: admin.user.email,
                };
                navigation.navigate("GroupCreated", group);
            } else {
                alert("Something went wrong");
            }
        } catch (err) {
            throw err;
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator></ActivityIndicator>
            ) : (
                <View style={styles.container}>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={isModalVisible}
                        onRequestClose={() => {
                            setModalVisible(!isModalVisible);
                        }}
                    >
                        <SafeAreaView>
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                            >
                                <Ionicons
                                    name="arrow-back"
                                    size={40}
                                    color="#F27575"
                                />
                            </TouchableOpacity>
                        </SafeAreaView>
                        <View style={{ marginTop: 1, flex: 1 }}>
                            {
                                <GooglePlacesAutocomplete
                                    placeholder="Search"
                                    fetchDetails={true}
                                    GooglePlacesSearchQuery={{
                                        rankby: "distance",
                                    }}
                                    onPress={handleLocationSelect}
                                    query={{
                                        key: "AIzaSyBMOzCOjtadPdMW9AwGVpVvftaNLufPB1c",
                                        language: "en",
                                        components: "country:ca",
                                        types: "establishment",
                                        radius: 30000,
                                        location: `${region.latitude}, ${region.longitude}`,
                                    }}
                                    styles={{
                                        container: {
                                            flex: 0,
                                            position: "absolute",
                                            width: "100%",
                                            zIndex: 1,
                                        },
                                        listView: { backgroundColor: "white" },
                                    }}
                                />
                            }
                            <MapView
                                ref={mapRef}
                                style={styles.map}
                                initialRegion={{
                                    latitude: region.latitude,
                                    longitude: region.longitude,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}
                                provider="google"
                            >
                                <Marker
                                    coordinate={{
                                        latitude: region.latitude,
                                        longitude: region.longitude,
                                    }}
                                    draggable={true}
                                    onDragStart={(e) => {
                                        console.log(
                                            "Drag start",
                                            e.nativeEvent.coordinates
                                        );
                                    }}
                                    onDragEnd={(e) => {
                                        setRegion({
                                            latitude:
                                                e.nativeEvent.coordinate
                                                    .latitude,
                                            longitude:
                                                e.nativeEvent.coordinate
                                                    .longitude,
                                        });
                                        setLocationSelected(true);
                                    }}
                                />
                                <Circle
                                    center={{
                                        latitude: region.latitude,
                                        longitude: region.longitude,
                                    }}
                                    strokeColor="#f27575"
                                    radius={radius * 1000}
                                    strokeWidth={2}
                                />
                            </MapView>
                        </View>
                    </Modal>
                    <Text style={styles.groupName}>{groupName}</Text>

                    <View style={styles.locationContainer}>
                        <Text style={styles.locationLabel}>LOCATION</Text>
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            {locationSelected ? (
                                <Text style={{ color: "grey" }}>
                                    {" "}
                                    Location selected{" "}
                                </Text>
                            ) : (
                                <Text style={{ color: "blue" }}>
                                    {" "}
                                    Select location{" "}
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>

                    <Divider width={1} />

                    <View style={styles.radiusContainer}>
                        <Text style={styles.radiusLabel}>
                            RADIUS (KM): {radius}
                        </Text>
                        <Slider
                            style={styles.slider}
                            minimumValue={1}
                            maximumValue={20}
                            thumbTintColor={"#f27575"}
                            minimumTrackTintColor={"#f27575"}
                            step={1}
                            value={radius}
                            onValueChange={handleRadiusChange}
                        />
                    </View>

                    <Divider width={1} />

                    <View>
                        <Text style={styles.priceLabel}>PRICE RANGE</Text>
                        <View style={styles.priceRangeContainer}>
                            <TouchableOpacity
                                style={[
                                    styles.priceRangeButton,
                                    selectedPriceRange === 1 &&
                                        styles.selectedPriceRange,
                                ]}
                                onPress={() => handlePriceRangeSelect(1)}
                            >
                                <FontAwesome
                                    name="dollar"
                                    size={16}
                                    color="black"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.priceRangeButton,
                                    selectedPriceRange === 2 &&
                                        styles.selectedPriceRange,
                                ]}
                                onPress={() => handlePriceRangeSelect(2)}
                            >
                                <View style={{ flexDirection: "row" }}>
                                    <FontAwesome
                                        name="dollar"
                                        size={16}
                                        color="black"
                                    />
                                    <FontAwesome
                                        name="dollar"
                                        size={16}
                                        color="black"
                                    />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.priceRangeButton,
                                    selectedPriceRange === 3 &&
                                        styles.selectedPriceRange,
                                ]}
                                onPress={() => handlePriceRangeSelect(3)}
                            >
                                <View style={{ flexDirection: "row" }}>
                                    <FontAwesome
                                        name="dollar"
                                        size={16}
                                        color="black"
                                    />
                                    <FontAwesome
                                        name="dollar"
                                        size={16}
                                        color="black"
                                    />
                                    <FontAwesome
                                        name="dollar"
                                        size={16}
                                        color="black"
                                    />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.priceRangeButton,
                                    selectedPriceRange === 4 &&
                                        styles.selectedPriceRange,
                                ]}
                                onPress={() => handlePriceRangeSelect(4)}
                            >
                                <View style={{ flexDirection: "row" }}>
                                    <FontAwesome
                                        name="dollar"
                                        size={16}
                                        color="black"
                                    />
                                    <FontAwesome
                                        name="dollar"
                                        size={16}
                                        color="black"
                                    />
                                    <FontAwesome
                                        name="dollar"
                                        size={16}
                                        color="black"
                                    />
                                    <FontAwesome
                                        name="dollar"
                                        size={16}
                                        color="black"
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Divider width={1} />

                    <View style={styles.toggleButtonContainer}>
                        <Text style={styles.openNowSwitchLabel}>OPEN NOW</Text>
                        <Switch
                            style={styles.openNowSwitch}
                            trackColor={{ false: "", true: "#f27575" }}
                            value={openNow}
                            onValueChange={() => setOpenNow(!openNow)}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.nextButton}
                        onPress={handleGenerateButtonPressed}
                    >
                        <Text style={styles.nextButtonText}>Generate</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

export default GroupPreferences;
