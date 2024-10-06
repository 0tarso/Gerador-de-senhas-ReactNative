import AsyncStorage from '@react-native-async-storage/async-storage'

import * as SecureStore from "expo-secure-store"

const useStorage = () => {

    const getItem = async (key) => {
        try {
            const passwords = await SecureStore.getItemAsync(key)
            return JSON.parse(passwords) || []
        }
        catch (error) {
            console.error("Erro ao buscar", error)
            return []
        }
    }


    const saveItem = async (key, value) => {
        try {
            let passwords = await getItem(key)

            passwords.push(value)

            await SecureStore.setItemAsync(key, JSON.stringify(passwords))

            console.log("Senha salvaaaa")
        }
        catch (error) {
            console.error("Erro ao salvar: ", error)
        }
    }


    const removeItem = async (key, item) => {
        try {
            let passwords = await getItem(key)

            let myPassowrds = passwords.filter((password) => {
                return (password.id != item)
            })

            await SecureStore.setItemAsync(key, JSON.stringify(myPassowrds))
            return myPassowrds
        }
        catch (error) {
            console.error("Erro ao deletar: ", error)
        }
    }

    return {
        getItem,
        saveItem,
        removeItem
    }
}

export default useStorage