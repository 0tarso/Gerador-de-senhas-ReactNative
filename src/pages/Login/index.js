import React, { useState, useContext } from 'react'
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native'
import { AuthContext } from '../../contexts/AuthContext'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import EmailScreen from '../EmailScreen'
import useStorage from '../../hooks/useStorage'
import * as SecureStore from "expo-secure-store"

const Login = () => {
    const nav = useNavigation()


    const { signIn, clearCache } = useStorage()
    const { isFirstLaunch, setUser } = useContext(AuthContext)

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const clearStorage = async () => {
        await SecureStore.deleteItemAsync("_user")
        await clearCache()
        console.log("cache limpo")

        console.log(isFirstLaunch)
    }



    const handleLogin = async () => {
        const user = await signIn(email, password)
        setUser(user)
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
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>DestravaAí</Text>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.labelInput}>Email</Text>
                    <TextInput
                        placeholder="Email aqui"
                        style={styles.input}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.labelInput}>Password</Text>
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
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