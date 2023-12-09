import { useState } from "react";
import { createContext } from "react";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../firebase/firbaser.config";
import { useEffect } from "react";
import axios from "axios";

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
            setUser(currUser)
            //get and setToken
            // fetch("http://localhost:5000/jwt", {
            //    method:"POST",
            //    headers:{
            //     "Content-Type":"application/json"
            //    } ,
            //    body:JSON.stringify(currUser)
            // })

            if (currUser) {
                axios.post("http://localhost:5000/jwt", { email: currUser?.email })
                    .then(data => {

                        localStorage.setItem("token", data.data.token);
                        setLoading(false)
                    })
            }
            else {
                localStorage.removeItem("token")
            }



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