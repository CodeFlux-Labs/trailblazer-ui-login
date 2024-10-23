import React from "react";
import DefaultButton from "@/src/components/buttons/DefaultButton";
import { Container, Subtitle, Title } from "@/src/styles-global";
import { StackNavigationProp } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ONBOARDING_COMPLETE } from "@/src/utils/storage-consts";

type OnboardingProps = {
    navigation: StackNavigationProp<any>;
};

const Onboarding: React.FC<OnboardingProps> = ({ navigation }) => {
    const onFinishOnboarding = async () => {
        await AsyncStorage.setItem(ONBOARDING_COMPLETE, "true");
        navigation.navigate("AuthCore");
    };

    return (
        <Container>
            <Title>Welcome to the Codeflux Labs template</Title>
            <Subtitle>Onboarding</Subtitle>
            <DefaultButton
                label="Go To SignIn Screen"
                onPress={onFinishOnboarding}
                style={{ marginTop: 20 }}
            />
        </Container>
    );
};

export default Onboarding;
