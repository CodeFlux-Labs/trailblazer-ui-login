import React, { useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import CreateNewPassword from "./CreateNewPassword";
import VerifyCode from "./VerifyCode";

type AuthCoreProps = {
    navigation: StackNavigationProp<any>;
};

const UpdatePasswordCore: React.FC<AuthCoreProps> = ({ navigation }) => {
    const [activeFragment, setActiveFragment] = useState("VerifyCode");

    const renderFragment = () => {
        switch (activeFragment) {
            case "VerifyCode":
                return <VerifyCode navigation={navigation} changeFragment={setActiveFragment} />;
            case "CreateNewPassword":
                return (
                    <CreateNewPassword navigation={navigation} changeFragment={setActiveFragment} />
                );
            default:
                return <VerifyCode navigation={navigation} changeFragment={setActiveFragment} />;
        }
    };

    return <>{renderFragment()}</>;
};

export default UpdatePasswordCore;
