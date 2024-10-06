import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import Home from '../pages/Home'
import Passwords from '../pages/Passwords'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

const AppRoutes = () => {

    const Tab = createBottomTabNavigator()

    return (

        <Tab.Navigator
            screenOptions={() => ({
                tabBarStyle: {
                    backgroundColor: "#351adb",
                    height: 65,
                    borderTopWidth: 1,
                    borderColor: "#f5f5f5",
                    paddingBottom: 5
                },
                tabBarActiveTintColor: "#fff",
                tabBarInactiveTintColor: "#d0d0d0",

            })}
        >
            <Tab.Screen name='Gerador de Senhas' component={Home}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, size, color }) => {
                        if (focused) {
                            return <SimpleLineIcons name="energy" size={34} color="#fff" />
                        }
                        return <SimpleLineIcons name="energy" size={26} color="#d0d0d0" />
                    }
                }}
            />
            <Tab.Screen name='Salvas' component={Passwords}
                options={{

                    headerShown: false,
                    tabBarIcon: ({ focused, size, color }) => {
                        if (focused) {
                            return <AntDesign name="save" size={34} color="#fff" />
                        }
                        return <AntDesign name="save" size={26} color="#d0d0d0" />
                    }
                }}

            />
        </Tab.Navigator>

    )
}

export default AppRoutes