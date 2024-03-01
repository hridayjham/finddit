import React, { useState } from "react";
import axios from 'axios'
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Pressable,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import styles from "../styles/signupStyles";
import { Divider } from "@rneui/themed";
import { AntDesign } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import useAuth from "../hooks/useAuth";
import { sendSignUpRequest } from '../utils/api_function_calls/user_functions';

function SignupScreen() {
  const [email, setEmail] = useState(""); //useState<string>('') when changing to ts
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState(""); //useState<string>('') when changing to ts
  const [loading, setLoading] = useState(false);
  const iconID = Math.floor(Math.random() * 4);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [inUseEmail, setEmailInUse] = useState(false);
  const [weakPassword, setWeakPassword] = useState(false);

  // const auth = FIREBASE_AUTH;
  const navigation = useNavigation();
  const {signUpUser} = useAuth()

  const signUp = async () => {
    if(loading){
      return
    }
    setLoading(true);
    try {
      const response = await signUpUser(
        email,
        password
      );
      console.log("User logged in:", response);
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/invalid-email") {
        setIsValidEmail(false);
        console.log(error);
      } else if (error.code === "auth/email-already-in-use") {
        setEmailInUse(true);
        console.log(error);
      } else if (error.code === "auth/weak-password") {
        setWeakPassword(true);
        console.log(error);
      }
    } finally {
      setLoading(false);
      // await axios.post(`${NGROKLINK}/users`, {email, firstName, lastName, iconID});
      const resp =  await sendSignUpRequest(firstName, lastName, email.toLocaleLowerCase(), iconID);
      if (resp){
        console.log("User created in database" , resp);
      }else{
        console.log("failed")
      }
    }
  };

  // ... rest of the component ...

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
    <View style={styles.container}>
      <View style={styles.topHeadingContainer}>
        <Text style={styles.titleText}>Sign up</Text>
      </View>
      <View style={styles.middleContainer}>
        <TextInput
          placeholder="First Name"
          onChangeText={(firstName) => setFirstName(firstName)}
          value={firstName}
          style={styles.input}
        />
        <TextInput
          placeholder="Last Name"
          onChangeText={(lastName) => setLastName(lastName)}
          value={lastName}
          style={styles.input}
        />
        {!isValidEmail && (
          <Text style={{ color: "red" }}>Email not valid </Text>
        )}
        {inUseEmail && (
          <Text style={{ color: "red" }}>Email already in use </Text>
        )}
        <TextInput
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
          value={email}
          style={[styles.input, !isValidEmail && styles.inputError]}
        />
        {weakPassword && (
          <Text style={{ color: "red" }}>Password is weak </Text>
        )}
        <TextInput
          placeholder="Password"
          onChangeText={(password) => setPassword(password)}
          value={password}
          secureTextEntry
          style={styles.input}
        />
        <TouchableOpacity style={styles.signUpButton} onPress={signUp}>
          <Text style={styles.signUpButtonText}>Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signInGoogleButton} onPress={null}>
          <Image
            style={styles.googleIcon}
            source={require("../assets/google-icon.png")}
          />
          <Text style={styles.signInGoogleText}>Sign in with Google</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.alreadyAccountText}>Already have an account?</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.logInButtonText}>Log In</Text>
      </TouchableOpacity>
    </View>
    </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

// ... rest of the component ...

export default SignupScreen;
