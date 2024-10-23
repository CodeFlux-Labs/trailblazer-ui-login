import React, { useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import PasswordRecover from "./PasswordRecover";
import AuthCoreBackground from "../../assets/images/trailblazer-auth-core-background.png";
import { BackgroundContainer } from "@/src/styles-global";

type AuthCoreProps = {
    navigation: StackNavigationProp<any>;
};

const AuthCore: React.FC<AuthCoreProps> = ({ navigation }) => {
    const [activeFragment, setActiveFragment] = useState("SignIn");

    const renderFragment = () => {
        switch (activeFragment) {
            case "SignIn":
                return <SignIn navigation={navigation} changeFragment={setActiveFragment} />;
            case "SignUp":
                return <SignUp navigation={navigation} changeFragment={setActiveFragment} />;
            case "PasswordRecover":
                return (
                    <PasswordRecover navigation={navigation} changeFragment={setActiveFragment} />
                );
            default:
                return <SignIn navigation={navigation} changeFragment={setActiveFragment} />;
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}>
            <BackgroundContainer
                source={AuthCoreBackground}
                resizeMode="cover"
                style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
            />
            <View style={{ flex: 1, justifyContent: "center" }}>{renderFragment()}</View>
        </KeyboardAvoidingView>
    );
};

export default AuthCore;
