import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View, Alert } from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'
import { useIsFocused } from '@react-navigation/native'

import useStorage from '../../hooks/useStorage'

import PasswordItem from '../../components/PasswordItem'

const Passwords = () => {
    const focused = useIsFocused()

    const { getItem, removeItem } = useStorage()

    const [listPasswords, setListPasswords] = useState([])

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadPasswords = async () => {
            const passwords = await getItem("_pass")

            setListPasswords(passwords)

            console.log("senhas", passwords)
        }

        if (focused) {
            loadPasswords()
            setLoading(false)
        }

    }, [focused])

    const showAlertRemove = async (data) => {
        Alert.alert(
            "Você tem certeza?",
            `Confirme a exclusão da senha: \n${data}`,
            [
                { text: "Cancelar" },
                { text: "Excluir", onPress: () => handleDeleteItem(data) }
            ],
            { cancelable: true }
        )
    }

    const handleDeleteItem = async (id) => {
        try {
            const resultPasswords = await removeItem("_pass", id)
            setListPasswords(resultPasswords)
            console.log("removido")

        }
        catch (error) {
            console.log(error)
        }

        console.log(listPasswords)
    }


    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator color="#004aad" size="large" />
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <View style={styles.header}>

                <Text style={styles.headerText}>Minhas Senhas</Text>

            </View>

            {listPasswords.length > 0 ? (

                <FlatList
                    data={listPasswords}
                    renderItem={({ item }) => <PasswordItem data={item} showAlertRemove={showAlertRemove} />}
                    keyExtractor={(item) => item.uniqueId}
                />

            ) : (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#ffff" }}>
                    <Image
                        source={require("../../../assets/emptyFolder.gif")}
                        style={{ width: 150, height: 150 }}
                    />
                    <Text style={{ fontSize: 20 }}>Você ainda não tem senhas salvas</Text>
                </View>
            )}


        </SafeAreaView>
    )
}

export default Passwords

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#351ade",
        height: 80,
        justifyContent: 'flex-end'
    },
    headerText: {
        fontSize: 25,
        color: "#FFF",
        margin: 10,
        fontWeight: '600'
    }
})