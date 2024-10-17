import React from "react";
import DefaultButton from "@/src/components/buttons/DefaultButton";
import { Container, Subtitle, Title } from "@/src/styles-global";
import { StackNavigationProp } from "@react-navigation/stack";

type OnboardingProps = {
    navigation: StackNavigationProp<any>;
};

const Onboarding: React.FC<OnboardingProps> = ({ navigation }) => {
    return (
        <Container>
            <Title centered>Welcome to the Codeflux Labs template</Title>
            <Subtitle>Onboarding</Subtitle>
            <DefaultButton label="Go To Home Screen" onPress={() => navigation.navigate("Home")} style={{marginTop: 20}} />
        </Container>
    );
};

export default Onboarding;
