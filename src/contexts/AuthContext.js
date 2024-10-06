import { GoogleAuthProvider, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import React, { createContext, useState } from 'react'
import { auth } from '../firebaseConnection'


export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)

    const handleLogin = async (email, password) => {

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)

            const user = userCredential.user
            console.log(user.email)

            setUser({
                email: user.email,
                uid: user.uid
            })
            console.log("Login bem sucedido!")


        }
        catch (error) {
            console.error("Ops, erro ao logar: ", error)
        }
    }

    const loginWithGoogle = async () => {
        try {

            console.log("Login google")
        }
        catch (error) {
            console.error("Erro ao logar com google: \n", error)
        }
    }

    const handleSignOut = async () => {
        try {
            await signOut(auth)
            console.log("SignOut bem sucedido!")
            setUser(null)
        }
        catch (error) {

            console.error("Ops, erro ao sair: \n", error)

        }
    }

    return (
        <AuthContext.Provider
            value={{ handleLogin, handleSignOut, loginWithGoogle, user }}
        >
            {children}
        </AuthContext.Provider>
    )
}

