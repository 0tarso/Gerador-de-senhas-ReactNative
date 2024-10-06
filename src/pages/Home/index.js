import Slider from '@react-native-community/slider';
import { StatusBar } from 'expo-status-bar';
import { useState, useContext } from 'react';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ModalPassword from '../../components/ModalPassword';
import * as SecureStore from "expo-secure-store"
import { AuthContext } from '../../contexts/AuthContext';
let charset = "abcdefghijklmnopqrstuvxwyzABCDEFGHIJKLMNOPQRSTUVXWYZ123456789"

export default function Home() {

    const { handleSignOut } = useContext(AuthContext)
    const [passwordSize, setPasswordSize] = useState(6)

    const [passwordValue, setPasswordValue] = useState("")

    const [modalVisible, setModalVisible] = useState(false)

    const generatePassword = () => {
        let password = ""

        for (let i = 0, n = charset.length; i < passwordSize; i++) {
            password += charset.charAt(Math.floor(Math.random() * n))
        }

        console.log(password)
        setPasswordValue(password)
        setModalVisible(true)
    }

    const handleClearStorage = async () => {
        try {
            await SecureStore.deleteItemAsync("_pass")
            alert("certoo")
        }
        catch (error) {
            console.error("Ops, erro ao apagar: ", error)
        }
    }

    const handleLogout = async () => {
        await handleSignOut()
    }
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#fff' style='dark' />
            <Image
                source={require("../../../assets/logo.png")}
                style={styles.logo}
            />

            <View style={styles.sliderContainer}>
                <View style={styles.sliderTitleContainer}>
                    <Text style={styles.sliderTitle}>N° de Caracteres: {passwordSize}</Text>
                </View>
                <Slider value={passwordSize} onValueChange={(v) => setPasswordSize(v.toFixed(0))}
                    style={styles.slider}
                    minimumValue={6}
                    maximumValue={20}
                    thumbTintColor='#351adb'
                    minimumTrackTintColor='#a0a0a0'
                />
            </View>

            <TouchableOpacity style={styles.areaBtn}
                onPress={generatePassword}
            >
                <Text style={styles.txtBtn}>Gerar Senha</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.areaBtn}
                onPress={handleLogout}
            >
                <Text style={styles.txtBtn}>Sair</Text>
            </TouchableOpacity>

            <Modal
                style={styles.modalArea}
                visible={modalVisible}
                animationType='fade'
                transparent={true}
            >
                <ModalPassword
                    password={passwordValue}
                    handleClose={() => setModalVisible(false)}
                />
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
    },

    logo: {
        marginBottom: 15
    },

    sliderTitleContainer: {
        backgroundColor: "#351adb",
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15

    },
    sliderTitle: {
        // marginTop: 20,
        fontSize: 18,
        color: "#fff",
        fontWeight: '600'

    },

    sliderContainer: {
        width: "80%",
        // alignItems: 'center',
        backgroundColor: "#351adb",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        elevation: 4
    },
    slider: {
        height: 50,
        backgroundColor: "#fff",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5

    },

    areaBtn: {
        backgroundColor: "#351adb",
        width: "80%",
        height: 50,
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    txtBtn: {
        fontSize: 18,
        fontWeight: '600',
        color: "#FFF"
    },

});
