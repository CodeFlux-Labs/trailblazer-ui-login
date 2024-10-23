import React from "react";
import { BackgroundContainer, Container } from "@/src/styles-global";
import LottieView from "lottie-react-native";
import AuthCoreBackground from "../../assets/images/trailblazer-auth-core-background.png";
const SplashAnimation = require("../../assets/animations/splash-animation.json");

const Splash: React.FC = () => {
    return (
        <BackgroundContainer source={AuthCoreBackground} resizeMode="cover">
            <Container style={{ alignItems: "center", justifyContent: "center" }}>
                <LottieView
                    source={SplashAnimation}
                    autoPlay
                    loop
                    style={{ width: 300, height: 500 }}
                />
            </Container>
        </BackgroundContainer>
    );
};

export default Splash;
