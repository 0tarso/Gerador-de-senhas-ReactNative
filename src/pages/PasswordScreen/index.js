import React, { useState, useContext, useEffect } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import { useNavigation } from '@react-navigation/native'

import { AuthContext } from '../../contexts/AuthContext'
import useStorage from '../../hooks/useStorage'

import Feather from '@expo/vector-icons/Feather';

const PasswordScreen = () => {
    const nav = useNavigation()

    const { loginID, setIsFirstLaunch, setUser } = useContext(AuthContext)
    const { createUser, disableFirstLaunch } = useStorage()

    const [passwordUser, setPasswordUser] = useState("")
    const [btnStyle, setBtnStyle] = useState("emptyInput")
    const [btnDisabled, setBtnDisable] = useState(true)

    const [showPassword, setShowPassword] = useState(true)
    const [passwordIcon, setPasswordIcon] = useState("eye")

    const [checkSixChar, setCheckSixChar] = useState(false)
    const [checkUpperChar, setCheckUpperChar] = useState(false)

    useEffect(() => {
        const regex = /[A-Z]/
        const regexPassword = regex.test(passwordUser)

        if (regexPassword ? setCheckUpperChar(true) : setCheckUpperChar(false));
        if (passwordUser.length > 6 ? setCheckSixChar(true) : setCheckSixChar(false));

        if (passwordUser.length > 6 && regexPassword === true) {
            setBtnStyle(styles.txtBtn)
            setBtnDisable(false)
        }
        else {
            setBtnStyle([styles.txtBtn, styles.txtBtnEmpty])
            setBtnDisable(true)
        }

    }, [passwordUser])

    const handleShowPassword = () => {
        if (showPassword) {
            setShowPassword(false)
            setPasswordIcon("eye-off")
        }
        else {
            setShowPassword(true)
            setPasswordIcon("eye")
        }
    }

    const handleRegister = async () => {
        try {
            const user = await createUser(loginID, passwordUser)

            setUser(user.id)
            setIsFirstLaunch(false)
            disableFirstLaunch()

        }
        catch (error) {
            console.error(error)
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView style={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>DestravaAí</Text>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionTitle}>Falta pouco</Text>
                    <Text style={styles.description}>Agora vamos criar a sua senha</Text>
                    <Text style={styles.description}>Mínimo 6 caracteres - {checkSixChar ? ">>> Ok" : ""}</Text>
                    <Text style={styles.description}>Ter uma letra maiúscula - {checkUpperChar ? ">>> Ok" : ""}</Text>

                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="******"
                        style={styles.input}
                        value={passwordUser}
                        onChangeText={(text) => setPasswordUser(text)}
                        secureTextEntry={showPassword}
                    />
                    <Feather style={styles.showPasswordBtn}
                        name={passwordIcon}
                        size={26}
                        color="black"
                        onPress={handleShowPassword}
                    />
                </View>

                <TouchableOpacity style={styles.areaBtn}
                    onPress={handleRegister}
                    disabled={btnDisabled}
                >
                    <Text style={btnStyle}>Finalizar</Text>
                </TouchableOpacity>
            </ScrollView>

        </KeyboardAvoidingView >
    )
}

export default PasswordScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        backgroundColor: "#351adb",
        // flexGrow: 1
    },
    titleContainer: {
        // backgroundColor: "#fff",
        height: 150,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 50
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: "#fff"
    },

    descriptionContainer: {
        // backgroundColor: "#f12"
        height: 150
    },
    descriptionTitle: {
        marginLeft: 20,
        fontSize: 35,
        fontWeight: '600',
        color: "#Fff"

    },
    description: {
        marginLeft: 20,
        fontSize: 20,
        color: "#fff"

    },

    inputContainer: {
        marginTop: 5,
        // backgroundColor: "#f12aaa"

    },
    labelInput: {
        marginLeft: 20,
        fontSize: 18,
        color: "#fff"
    },
    input: {
        backgroundColor: "#fff",
        width: "90%",
        height: 50,
        borderRadius: 10,
        alignSelf: 'center',
        fontSize: 20,
        paddingLeft: 10
    },
    emptyInput: {
        backgroundColor: "#f12"
    },

    showPasswordBtn: {
        position: 'absolute',
        right: 35,
        marginTop: 15
    },

    areaBtn: {
        backgroundColor: "#f5f5ff",
        width: "70%",
        height: 50,
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 10
    },
    areaBtnCriar: {
        backgroundColor: "transparent",
        marginTop: 0,

    },
    txtBtn: {
        fontSize: 18,
        fontWeight: '600',
        color: "#000"
    },
    txtBtnEmpty: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#a5a5a5"
    },
    txtBtnCriar: {
        color: "#fff"
    }
})