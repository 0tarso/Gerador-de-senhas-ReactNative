import React, { useState } from 'react'
import { Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import * as Clipboard from "expo-clipboard"

import useStorage from '../../hooks/useStorage'

const ModalPassword = ({ password, handleClose }) => {

    const { saveItem } = useStorage()
    const [idPassword, setIdPassword] = useState("")
    const [placeholderID, setPlaceholderID] = useState("Onde será usada?")

    const [inputStyle, setInputStyle] = useState(styles.txtInput)

    const [checkModal, setCheckModal] = useState(false)

    const handleCopyPassword = async () => {
        await Clipboard.setStringAsync(password)
        console.log("senhaCopiada")

    }

    const handleSavePassword = async () => {
        if (idPassword === "") {
            setPlaceholderID("Você deve inserir o lugar de uso")
            setInputStyle(styles.txtInputWrong)

            setTimeout(() => {
                setInputStyle(styles.txtInput)
                setPlaceholderID("Onde será usada?")
            }, 3000)
            return
        }

        try {

            const date = new Date()

            const datestamp = `${date.getDate()}/${date.getUTCMonth() + 1}/${date.getFullYear()}`
            const timestamp = `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`

            const uniqueId = `${datestamp}${timestamp}`

            const finalPassword = {
                id: idPassword,
                password: password,
                createdDay: datestamp,
                createdTime: timestamp,
                uniqueId: uniqueId
            }

            await saveItem("_pass", finalPassword)

            setCheckModal(true)

            setTimeout(() => {
                setCheckModal(false)
                handleClose()
            }, 2000)
        }
        catch (error) {
            console.log("Ops, erro ao salvar: ", error)
        }
    }

    if (checkModal) {
        return (
            <View style={styles.modalArea}>
                <View style={[styles.modal, styles.modalSavePassword]}>
                    <Text style={styles.modalTitle}>Sucesso!!</Text>
                    <Image
                        source={require("../../../assets/done.gif")}
                        style={styles.checkIcon}
                    />

                    <View>
                        <Text>Sua senha foi salva com sucesso.</Text>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.modalArea}>


            <View style={styles.modal}>
                <Text style={styles.modalTitle}>Senha Gerada</Text>

                <Pressable style={styles.areaPassword} onLongPress={handleCopyPassword}>
                    <Text style={styles.textPassword}>{password}</Text>
                </Pressable>

                <TextInput
                    placeholder={placeholderID}
                    style={inputStyle}
                    value={idPassword}
                    onChangeText={(txt) => setIdPassword(txt)}
                />


                <View style={styles.areaBtns}>

                    <TouchableOpacity style={styles.btn}
                        onPress={handleClose}
                    >
                        <Text style={styles.btnText}>Voltar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.btn, styles.btnSalvar]}
                        onPress={handleSavePassword}
                    >
                        <Text style={[styles.btnText, styles.btnTextSalvar]}>Salvar Senha</Text>
                    </TouchableOpacity>
                </View>
                {/* <Button title='fechar' onPress={handleClose} /> */}
            </View>
        </View>
    )
}

export default ModalPassword

const styles = StyleSheet.create({
    modalArea: {
        backgroundColor: "rgba(24,24,24,0.8)",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    modal: {
        width: "90%",
        height: 270,
        backgroundColor: "#fff",
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        rowGap: 20,

    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700'
    },
    txtInput: {
        borderWidth: 1,
        borderColor: "#515151",
        width: "90%",
        borderRadius: 15,
        height: 50,
        paddingLeft: 15,
        paddingRight: 15,


    },
    txtInputWrong: {
        borderWidth: 2,
        borderColor: "#f12",
        width: "90%",
        borderRadius: 15,
        height: 50,
        paddingLeft: 15,
        paddingRight: 15,


    },
    areaPassword: {
        backgroundColor: "#212121",
        width: "90%",
        borderRadius: 12,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textPassword: {
        color: "#FFF",
        fontSize: 18
    },
    areaBtns: {
        flexDirection: 'row',
        // backgroundColor: "#f12",
        width: "90%",
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    btn: {
        backgroundColor: "#e0e0e0",
        width: "48%",
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderRadius: 8
    },
    btnSalvar: {
        backgroundColor: "#351adb"
    },

    btnText: {
        fontWeight: '600',
        color: "#575757"
    },
    btnTextSalvar: {
        color: "#fff"
    },

    modalSavePassword: {
        rowGap: 0
    },

    checkIcon: {
        width: 200,
        height: 200,
        // backgroundColor: "#f12"
    }


})