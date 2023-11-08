import { mScale, vScale } from '../../../Utilities'
import { createStackNavigator } from '@react-navigation/stack'
import { AllUsers } from './Screens/AllUsers'
import { SingleUser } from './Screens/SingleUser'


const Stack = createStackNavigator()

export const OtherUsers = () => {
    return (
        <Stack.Navigator
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
            <Stack.Screen
                name={'user-details'}
                component={AllUsers}
            />
            <Stack.Screen
                name={'single-user'}
                component={SingleUser}
            />
        </Stack.Navigator>
    )
}
