
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { useSelector } from 'react-redux'
import { LoginScreen, OnBoardingScreen, SignupScreen } from '../../Screens'
import { mScale } from '../../Utilities'
import { useState, useEffect } from 'react';

const Stack = createStackNavigator()

export const AuthNavigation = () => {
    const user = useSelector((state) => state.user.details)
    console.log(user, "userr")
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
                (user.payload.onboard && user.payload.token === null) &&
                <Stack.Screen
                    name='onboard'
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
