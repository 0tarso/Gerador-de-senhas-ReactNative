import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import Home from './pages/Home'
import Passwords from './pages/Passwords'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

const Routes = () => {

    const Tab = createBottomTabNavigator()

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,

                }}
            >
                <Tab.Screen name='Gerarador' component={Home}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused, size, color }) => {
                            if (focused) {
                                return <SimpleLineIcons name="energy" size={30} color="#351adb" />
                            }
                            return <SimpleLineIcons name="energy" size={26} color="#a0a0a0" />
                        }
                    }}
                />
                <Tab.Screen name='Salvas' component={Passwords}
                    options={{

                        headerShown: false,
                        tabBarIcon: ({ focused, size, color }) => {
                            if (focused) {
                                return <AntDesign name="save" size={30} color="#351adb" />
                            }
                            return <AntDesign name="save" size={26} color="#a0a0a0" />
                        }
                    }}

                />
            </Tab.Navigator>
        </NavigationContainer >
    )
}

export default Routes