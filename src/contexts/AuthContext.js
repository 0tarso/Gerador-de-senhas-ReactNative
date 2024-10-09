import React, { createContext, useState, useEffect } from 'react'
import useStorage from '../hooks/useStorage'


export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const { firstLaunch } = useStorage()

    const [user, setUser] = useState(null)

    const [loginID, setLoginID] = useState("")
    const [loginPassword, setLoginPassword] = useState("")

    const [isFirstLaunch, setIsFirstLaunch] = useState(null)

    useEffect(() => {
        const checkFirstLaunch = async () => {


            const first = await firstLaunch()

            if (first === false) {
                console.log("------------------------")
                console.log("User ainda não criado")
                setIsFirstLaunch(true)
            }
            else {
                console.log("---------------")
                console.log("Usuario já criado")
                setIsFirstLaunch(false)

            }
        }
        checkFirstLaunch()
    }, [])



    return (
        <AuthContext.Provider
            value={{

                user,
                setUser,
                isFirstLaunch,
                setIsFirstLaunch,
                loginID,
                setLoginID,
                loginPassword,
                setLoginPassword
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

