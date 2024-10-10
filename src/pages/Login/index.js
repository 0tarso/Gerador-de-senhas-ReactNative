import React, { useState, useContext } from 'react'
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native'

import Feather from '@expo/vector-icons/Feather';

//contexto para autenticação
import { AuthContext } from '../../contexts/AuthContext'

//componente para realização de cadastro
import EmailScreen from '../EmailScreen'

//hook para funcionalidades de login
import useStorage from '../../hooks/useStorage'

const Login = () => {

    const { signIn, clearCache } = useStorage()
    const { isFirstLaunch, setUser, setIsFirstLaunch } = useContext(AuthContext)

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const [showPassword, setShowPassword] = useState(true)
    const [passwordIcon, setPasswordIcon] = useState("eye")

    //função implementada para demonstração
    const clearStorage = async () => {
        await clearCache()
        setIsFirstLaunch(true)
        console.log(isFirstLaunch)
    }


    //função para autenticação de login
    const handleLogin = async () => {
        const user = await signIn(email, password)
        setUser(user)

        if (user === null) {
            Alert.alert(
                "Ops, erro no login",
                "Usuário ou senha inválida"
            )
        }
    }

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

    if (isFirstLaunch) {
        return (
            <EmailScreen />
        );
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

                <View style={styles.inputContainer}>
                    <Text style={styles.labelInput}>Seu ID</Text>
                    <TextInput
                        placeholder="John Doe"
                        style={styles.input}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.labelInput}>Senha</Text>

                    <View style={styles.containerInput}>

                        <Feather style={styles.showPasswordBtn}
                            name={passwordIcon}
                            size={26}
                            color="#a0a0a0"
                            onPress={handleShowPassword}
                        />
                        <TextInput
                            placeholder="*******"
                            style={styles.input}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={showPassword}
                        />
                    </View>
                </View>

                <TouchableOpacity style={styles.areaBtn}
                    onPress={handleLogin}
                >
                    <Text style={styles.txtBtn}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.areaBtn, styles.areaBtnCriar]}
                    onPress={clearStorage}
                >
                    <Text style={[styles.txtBtn, styles.txtBtnCriar]}>Limpar dados</Text>
                </TouchableOpacity>
            </ScrollView>

        </KeyboardAvoidingView >
    )
}

export default Login

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
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
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
    showPasswordBtn: {
        position: 'absolute',
        zIndex: 999,
        right: 35,
        top: 15
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
        color: "#656565"
    },
    txtBtnCriar: {
        color: "#fff"
    }
})