
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { CreateAccountScreen, Home, OtherUsers, UserDetails } from '../../Screens';
import { COLORS, mScale, vScale } from '../../Utilities';
import { styled } from 'styled-components';
import { BlurView } from 'expo-blur';
import { StyleSheet } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator()


const screens = [
    {
        route: "CreateAccount",
        component: CreateAccountScreen
    },
    {
        route: "Home",
        component: Home
    },
    {
        route: "OtherUsers",
        component: OtherUsers
    },

]

export const PrivateNavigation = () => {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    let icon
                    switch (route.name) {
                        case "CreateAccount":
                            icon = focused ? "account-plus" : "account-plus-outline";
                            return <MaterialCommunityIcons name={icon} size={mScale(35)} color={COLORS.primary} />;
                        case "Home":
                            icon = focused ? "home-circle" : "home-circle-outline";
                            return <MaterialCommunityIcons name={icon} size={mScale(35)} color={COLORS.primary} />;
                        case "OtherUsers":
                            icon = focused ? "account-details" : "account-details-outline";
                            return <MaterialCommunityIcons name={icon} size={mScale(35)} color={COLORS.primary} />;

                        default:
                            return null;
                    }

                },
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: "absolute",
                    bottom: mScale(25),
                    left: mScale(25),
                    right: mScale(25),
                    borderRadius: mScale(15),
                    elevation: 10,
                    height: vScale(60),
                    alignItems: "center",
                    justifyContent: "center",
                    shadowOpacity: 0.1,
                    // zIndex: 1,
                    backgroundColor: `transparent`,
                },
                tabBarHideOnKeyboard:true,
                tabBarBackground: () => (
                    <TabBarBackground>
                        <BlurView intensity={100} style={StyleSheet.absoluteFill} />
                    </TabBarBackground>
                ),
                tabBarIconStyle: {
                    justifySelf: "center"
                },
                tabBarVisibilityAnimationConfig: {
                    duration: 200,
                }
            })
            }
        >
            {
                screens.map(({ route, component }, index) =>
                    <Tab.Screen
                        key={index}
                        name={route}
                        component={component}
                    />
                )
            }
        </Tab.Navigator>
    )
}

const TabBarBackground = styled.View`
    flex: 1;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: ${mScale(15)}px;
    overflow: hidden;
    z-index: -1;
`