import React, { useState, useContext } from 'react'
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthContext } from '../../contexts/AuthContext'

const Login = () => {
    const { handleLogin, loginWithGoogle } = useContext(AuthContext)

    const handleSubmitLogin = () => {
        if (email === "" || password === "") {
            Alert.alert(
                "Preencha todos os campos",
                "Email e senha são obrigatórios!"
            )
            return
        }
        handleLogin(email, password)
    }

    const handleSubmitGoogle = async () => {

        await loginWithGoogle()
    }

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

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
                    onPress={handleSubmitLogin}
                >
                    <Text style={styles.txtBtn}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.areaBtn}
                    onPress={handleSubmitGoogle}
                >
                    <Text style={styles.txtBtn}>Usar Conta Google</Text>
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
    txtBtn: {
        fontSize: 18,
        fontWeight: '600',
        color: "#656565"
    },
})