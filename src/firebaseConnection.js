import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
    apiKey: "AIzaSyBJkR6iAhsl35MLMMA8YWg0a0zyoduWOO8",
    authDomain: "destravaai-cd09e.firebaseapp.com",
    projectId: "destravaai-cd09e",
    storageBucket: "destravaai-cd09e.appspot.com",
    messagingSenderId: "398826583116",
    appId: "1:398826583116:web:8c264275bbea3c47d1f0e9"
};

export const app = initializeApp(firebaseConfig);


export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)

});

