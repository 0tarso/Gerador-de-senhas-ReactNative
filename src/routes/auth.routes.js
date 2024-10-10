import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Login from '../pages/Login'
import EmailScreen from '../pages/EmailScreen'
import PasswordScreen from '../pages/PasswordScreen'

const Stack = createNativeStackNavigator()

const AuthRoutes = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{
                    headerShown: false
                }}
                name="Login"
                component={Login}
            />

            <Stack.Screen
                options={{
                    headerShown: false
                }}
                name='Email'
                component={EmailScreen}
            />

            <Stack.Screen
                options={{
                    headerShown: false
                }}
                name='Password'
                component={PasswordScreen}
            />
        </Stack.Navigator>
    )
}

export default AuthRoutes