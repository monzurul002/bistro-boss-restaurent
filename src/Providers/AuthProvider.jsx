import { useState } from "react";
import { createContext } from "react";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../firebase/firbaser.config";
import { useEffect } from "react";

export const AuthContext = createContext(null);
const auth = getAuth(app)
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createNewUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    //gogle sign in
    const provider = new GoogleAuthProvider();

    const googleSignIn = () => {
        return signInWithPopup(auth, provider)
    }


    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    const profileUpdate = (name, photoUrl) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoUrl
        })
    }

    const authInfo = {
        user,
        loading,
        createNewUser,
        loginUser,
        logOut,
        profileUpdate,
        googleSignIn
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currUser) => {
            setLoading(false)
            setUser(currUser)
        });
        return () => {
            return unsubscribe()
        }
    }, [])


    return (
        <AuthContext.Provider value={authInfo} >
            {children}
        </AuthContext.Provider >
    );
};

export default AuthProvider;