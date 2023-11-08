
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { useSelector } from 'react-redux'
import { LoginScreen, OnBoardingScreen, SignupScreen } from '../../Screens'
import { mScale } from '../../Utilities'


const Stack = createStackNavigator()


export const AuthNavigation = () => {
    const user = useSelector((state) => state.user.details)
    const { payload } = user
    return (
        <Stack.Navigator
            // initialRouteName={'Login'}
            screenOptions={{
                headerBackTitleVisible: false,
                headerTransparent: true,
                headerTitleAlign: "left",
                headerLeftContainerStyle: {
                    paddingLeft: mScale(20)
                },
                headerStyle: {
                    backgroundColor: '#ffff',
                },
                headerShown: false,
                // headerTintColor: colors.textColor,
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: mScale(20),
                    display: "none"
                },
            }}
        >
            {
                !payload.onboard && <Stack.Screen
                    name='Onboard'
                    component={OnBoardingScreen}
                />
            }

            <Stack.Screen
                name='Login'
                component={LoginScreen}
            />
        </Stack.Navigator>
    )
}
