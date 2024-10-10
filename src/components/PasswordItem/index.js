import React, { useState } from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import * as Clipboard from "expo-clipboard"

const PasswordItem = ({ data, showAlertRemove }) => {
    const [showPassword, setShowPassword] = useState(true)

    const handleShowPassword = () => {
        if (showPassword) {
            setShowPassword(false)
        }
        else {
            setShowPassword(true)
        }
    }

    const handleCopy = async () => {
        await Clipboard.setStringAsync(data.password)
        Alert.alert('Senha copiada', `${data.password} copiada com sucesso`)
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.itemContainer}
                onLongPress={() => showAlertRemove(data.id)}
            >
                <View style={styles.titleContainer}>
                    <Text style={styles.itemTitle}>{data.id}</Text>
                    <Text style={styles.itemCreated}>Criado em {data.createdDay}</Text>

                </View>

                <TouchableOpacity style={styles.passwordContainer}
                    onPress={handleShowPassword}
                    onLongPress={handleCopy}
                >
                    <Text style={styles.passwordText}>{showPassword ? "********" : data.password}</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        </View >
    )
}

export default PasswordItem

const styles = StyleSheet.create({

    container: {
        alignItems: 'center',
        marginTop: 15
    },
    itemContainer: {
        backgroundColor: "#f0f0f0",
        borderWidth: 1,
        borderColor: "#cccccc",
        width: "95%",
        borderRadius: 15,
        padding: 10
    },

    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15
    },

    itemTitle: {
        fontSize: 15,
    },

    itemCreated: {
        fontSize: 13,
        fontWeight: '200'
    },

    passwordContainer: {
        backgroundColor: "#212121",
        borderRadius: 5,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    passwordText: {
        color: "#fff",
        fontSize: 18
    }
})