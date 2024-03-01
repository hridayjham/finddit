// useFirebaseMessaging.js
import { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FIREBASE_APP } from "../FirebaseConfig";

// const useFirebaseMessaging = () => {
//     useEffect(() => {
//         const unsubscribe = messaging().setBackgroundMessageHandler(
//             async (remoteMessage) => {
//                 Alert.alert(
//                     "A new FCM message arrived!",
//                     JSON.stringify(remoteMessage)
//                 );
//                 console.log("Background Message:", remoteMessage);
//             }
//         );

//         return () => {
//             unsubscribe();
//         };
//     }, []);

//     useEffect(() => {
//         requestUserPermission();
//         notificationListener();
//     }, []);

//     // You can add more functions or state related to Firebase messaging here if needed

//     return {
//         sendNotification,
//     };
// };

export const notificationListener = () => {
    messaging().onNotificationOpenedApp((remoteMessage) => {
        console.log(
            "Notification caused app to open from background state:",
            remoteMessage.notification
        );
        NavigationPreloadManager.navigate(remoteMessage.data.type);
    });

    messaging()
        .getInitialNotification()
        .then((remoteMessage) => {
            if (remoteMessage) {
                console.log(
                    "Notification caused app to open from quit state",
                    remoteMessage.notification
                );
            }
        });

    messaging().onMessage(async (remoteMessage) => {
        console.log("Notification on foreground state......", remoteMessage);
    });
};

export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log("Authorization status:", authStatus);
    }
}

export const getToken = async () => {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    console.log(token);
};
