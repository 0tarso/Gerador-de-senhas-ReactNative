
import * as SecureStore from "expo-secure-store"

const useStorage = () => {

    // func para buscar senhas no storage
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


    //func para salvar uma nova senha no storage
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

    //func para remoção de uma senha do storage
    const removeItem = async (key, item) => {
        try {
            let allPasswords = await getItem(key)

            let remainingPasswords = allPasswords.filter((password) => {
                return (password.id != item)
            })

            await SecureStore.setItemAsync(key, JSON.stringify(remainingPasswords))
            return remainingPasswords
        }
        catch (error) {
            console.error("Erro ao deletar: ", error)
        }
    }

    // func que verifica cache no dispositivo que será usada para
    // verificação da primeira abertura do app pelo usuário
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

    //func que cria o cache no dispositivo sinalizando que o app 
    //já foi aberto antes nesse celular
    const disableFirstLaunch = async () => {
        try {
            await SecureStore.setItemAsync("_firstLaunch", "false")
            console.log("First Launch desligado")

        }
        catch (error) {
            console.error(error)
        }
    }
    // func implementada para fins demonstrativos
    // um modo de dar um reset no app para demonstrar todas as rotas
    const clearCache = async () => {
        try {

            await SecureStore.deleteItemAsync("_firstLaunch")
            await SecureStore.deleteItemAsync("_user")
            await SecureStore.deleteItemAsync("_pass")
            console.log("Cache limpo")
        }
        catch (error) {
            console.error("Erro ao limpar cache: ", error)
        }
    }



    //func para criação de um novo usuário
    //criado localmente no storage do dispositivo
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

    //func que faz a autenticação de login do usuário
    //tudo localmente no storage do dispositivo
    const signIn = async (id, password) => {
        try {
            const user = await SecureStore.getItemAsync("_user")
            const userCredential = JSON.parse(user)

            if (id === userCredential.id && password === userCredential.password) {
                console.log("Acesso liberado")
                return userCredential
            }
            else {
                console.log("Usuário ou senha inválido")
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