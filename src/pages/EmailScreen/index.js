import React, { useState, useContext, useEffect } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { AuthContext } from '../../contexts/AuthContext'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebaseConnection'
import { useEvent } from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'

const EmailScreen = () => {
    const nav = useNavigation()

    const { setLoginID } = useContext(AuthContext)

    const [idUser, setIdUser] = useState("")
    const [btnStyle, setBtnStyle] = useState("emptyInput")
    const [btnDisabled, setBtnDisable] = useState(true)

    const [checkSixChar, setCheckSixChar] = useState(false)
    const [checkUpperChar, setCheckUpperChar] = useState(false)

    const nextStep = () => {
        setLoginID(idUser)
        console.log("------------------------")
        console.log("Login Criado: ", idUser)

        nav.navigate("Password")

    }

    useEffect(() => {
        const regex = /[A-Z]/
        const regexUser = regex.test(idUser)

        if (regexUser ? setCheckUpperChar(true) : setCheckUpperChar(false));
        if (idUser.length > 6 ? setCheckSixChar(true) : setCheckSixChar(false));

        if (idUser.length > 6 && regexUser === true) {
            setBtnStyle(styles.txtBtn)
            setBtnDisable(false)
        }
        else {
            setBtnStyle([styles.txtBtn, styles.txtBtnEmpty])
            setBtnDisable(true)
        }

    }, [idUser])

    return (
        <KeyboardAvoidingView style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>DestravaAí</Text>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionTitle}>Vamos Começar!</Text>
                    <Text style={styles.description}>Primeiro vamos criar um ID para você:</Text>
                    <Text style={styles.description}>Mínimo 6 caracteres - {checkSixChar ? "Feito" : ""}</Text>
                    <Text style={styles.description}>Ter uma letra maiúscula - {checkUpperChar ? "Feito" : ""}</Text>

                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.labelInput}>ID para você acessar o aplicativo:</Text>
                    <TextInput
                        placeholder="Ex: John Doe"
                        style={styles.input}
                        value={idUser}
                        onChangeText={(text) => setIdUser(text)}
                    />
                </View>

                <TouchableOpacity style={styles.areaBtn}
                    onPress={nextStep}
                    disabled={btnDisabled}
                >
                    <Text style={btnStyle}>Próximo</Text>
                </TouchableOpacity>
            </ScrollView>

        </KeyboardAvoidingView >
    )
}

export default EmailScreen

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