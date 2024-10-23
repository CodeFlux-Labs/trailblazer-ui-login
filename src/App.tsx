import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { ModalPortal } from "react-native-modals";
import Onboarding from "@screens/Onboarding";
import AuthCore from "./screens/Auth";
import UpdatePasswordCore from "./screens/UpdatePassword";
import Home from "@screens/Home";
import Profile from "@screens/Profile";
import Splash from "@screens/Splash";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { ONBOARDING_COMPLETE } from "./utils/storage-consts";
import { NotificationProvider } from "./contexts/NotificationContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { colors } from "./assets/colors";
import { MaterialIcons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
    const [isFirstTime, setIsFirstTime] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const auth = getAuth();

    let [fontsLoaded] = useFonts({
        "SFUIText-Bold": require("./assets/fonts/SFUIText-Bold.ttf"),
        "SFUIText-Heavy": require("./assets/fonts/SFUIText-Heavy.ttf"),
        "SFUIText-Light": require("./assets/fonts/SFUIText-Light.ttf"),
        "SFUIText-Medium": require("./assets/fonts/SFUIText-Medium.ttf"),
        "SFUIText-Regular": require("./assets/fonts/SFUIText-Regular.ttf"),
        "SFUIText-Semibold": require("./assets/fonts/SFUIText-Semibold.ttf"),
    });

    //= ==============================================================================================
    useEffect(() => {
        (async () => {
            try {
                const hasSeenOnboarding = await AsyncStorage.getItem(ONBOARDING_COMPLETE);

                setIsFirstTime(hasSeenOnboarding === null);
            } catch (error) {
                console.error("Error reading onboarding status: ", error);
            }
        })();
    }, []);

    //= ==============================================================================================
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [auth]);

    //= ==============================================================================================
    function ProfileStack() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
                <Stack.Screen
                    name="UpdatePasswordCore"
                    component={UpdatePasswordCore}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        );
    }

    //= ==============================================================================================
    function AuthenticatedTabs() {
        return (
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: colors.purple,
                }}>
                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="home" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileStack}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="person" color={color} size={size} />
                        ),
                    }}
                />
            </Tab.Navigator>
        );
    }

    //= ==============================================================================================
    function UnauthenticatedStack() {
        return (
            <Stack.Navigator initialRouteName={isFirstTime ? "Onboarding" : "AuthCore"}>
                <Stack.Screen
                    name="Onboarding"
                    component={Onboarding}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="AuthCore"
                    component={AuthCore}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        );
    }

    //= ==============================================================================================
    if (!fontsLoaded || isLoading || isFirstTime === null) return <Splash />;

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                <NavigationContainer>
                    <NotificationProvider>
                        {isAuthenticated ? <AuthenticatedTabs /> : <UnauthenticatedStack />}
                    </NotificationProvider>
                    <ModalPortal />
                </NavigationContainer>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}
