import React from "react";
import { Container, Subtitle, Title } from "@/src/styles-global";
import { StackNavigationProp } from "@react-navigation/stack";

type HomeProps = {
    navigation: StackNavigationProp<any>;
};

const Home: React.FC<HomeProps> = ({ navigation }) => {
    return (
        <Container>
            <Title color="#000">Welcome to Trailblazer Home</Title>
            <Subtitle>Home</Subtitle>
        </Container>
    );
};

export default Home;
