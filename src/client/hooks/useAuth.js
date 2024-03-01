import { View, Text } from 'react-native'
import  { createContext, useContext, useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { FIREBASE_AUTH } from "../FirebaseConfig"; // Import the Firebase configuration

const auth = FIREBASE_AUTH;
const AuthContext = createContext({});
export const AuthProvider = ({children}) => {
    const [user , setUser] = useState(null)
    const signInUser = async(email , password) => {
        try{
        const response = await signInWithEmailAndPassword(auth, email, password);
        setUser(response.user)
        return response
        }catch(error){
            throw error
        }
    }

    const signUpUser = async(email , password) => {
        try{
        const response = await createUserWithEmailAndPassword(auth, email, password);
        setUser(response.user)
        return response
        }catch(error){
            throw error
        }
    }

    const signOutUser = async() => {
        try{
        signOut(auth).then(() => {
            setUser(null)
        })
        }catch(error){
            throw error
        }
    }
  return (
    <AuthContext.Provider 
    value={{
        user : user ,
        signInUser,
        signUpUser,
        signOutUser
    }}>
        {children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
    return useContext(AuthContext)
}