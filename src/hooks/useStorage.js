
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

    const firstLaunch = async () => {
        try {
            let first = await SecureStore.getItemAsync("_firstLaunch")

            console.log(first)
            if (first === null) {
                return false
            }
            else {
                return true
            }
        }
        catch (error) {
            console.error(error)
        }
    }

    const clearCache = async () => {
        await SecureStore.deleteItemAsync("_firstLaunch")
    }

    const disableFirstLaunch = async () => {
        try {
            await SecureStore.setItemAsync("_firstLaunch", "false")
            console.log("First Launch desligado")

        }
        catch (error) {
            console.error(error)
        }
    }

    const createUser = async (id, password) => {
        try {
            const user = { id: id, password: password }

            await SecureStore.setItemAsync("_user", JSON.stringify(user))

            console.log("Usuario criado")
            console.log(user)
            return user
        }
        catch (error) {
            console.error("Erro ao criar usuario: ", error)
        }
    }

    const signIn = async (id, password) => {
        try {
            const user = await SecureStore.getItemAsync("_user")
            const userCredential = JSON.parse(user)

            if (id === userCredential.id && password === userCredential.password) {
                console.log("Acesso liberado")
                return userCredential
            }
            else {
                console.log("Usuário inválido")
                return null
            }

        }
        catch (error) {
            console.error(error)
        }
    }

    return {
        getItem,
        saveItem,
        removeItem,
        firstLaunch,
        createUser,
        signIn,
        disableFirstLaunch,
        clearCache
    }
}

export default useStorage