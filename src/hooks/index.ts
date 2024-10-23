import { useEffect } from "react";
import { BackHandler } from "react-native";

export const useBackButtonHandler = (onBackPress: () => void) => {
    useEffect(() => {
        const handleBackPress = () => {
            onBackPress();
            return true;
        };

        const backHandler = BackHandler.addEventListener("hardwareBackPress", handleBackPress);

        return () => backHandler.remove();
    }, [onBackPress]);
};
