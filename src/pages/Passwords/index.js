import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useIsFocused } from '@react-navigation/native'
import useStorage from '../../hooks/useStorage'

const Passwords = () => {
    const focused = useIsFocused()

    const { getItem } = useStorage()

    const [listPasswords, setListPasswords] = useState([])


    useEffect(() => {

        const loadPasswords = async () => {
            const passwords = await getItem("@pass")

            setListPasswords(passwords)

            console.log("senhas", passwords)
        }
        console.log(new Date())
        loadPasswords()
    }, [focused])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.header}>

                <Text style={styles.headerText}>Minhas Senhas</Text>

            </View>

            <FlatList
                data={listPasswords}
                renderItem={({ item }) => <Text>{item.id}</Text>}
                keyExtractor={(item) => item.id}
            />


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