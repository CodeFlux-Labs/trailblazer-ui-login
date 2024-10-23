import React, { useState } from "react";
import { Container, DefaultText, Hr, Row, Subtitle, Title } from "@/src/styles-global";
import { StackNavigationProp } from "@react-navigation/stack";
import { getAuth } from "firebase/auth";
import { ProfilePicture, SettingItem } from "./styles";
import ProfilePhoto from "@assets/images/profile-photo.png";
import { colors } from "@/src/assets/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Switch } from "react-native-switch";
import { handleSignOut } from "@/src/services/firebaseAuth/auth";

type ProfileProps = {
    navigation: StackNavigationProp<any>;
};

interface SettingType {
    label: string;
    actionComponent: React.FC;
    onPress: () => void;
}

const Profile: React.FC<ProfileProps> = ({ navigation }) => {
    const user = getAuth();
    const [darkModeEnabled, setDarkModeEnable] = useState(false);
    const [notificationEnabled, setNotificationEnabled] = useState(false);

    const renderSwitch = (settter, currentValue) => {
        return (
            <Switch
                onValueChange={value => settter(value)}
                value={currentValue}
                renderActiveText={false}
                renderInActiveText={false}
                circleSize={20}
                barHeight={22}
                circleBorderWidth={0}
                backgroundInactive={colors.primaryLight}
                innerCircleStyle={{
                    alignItems: "center",
                    justifyContent: "center",
                }}
            />
        );
    };

    const settings = [
        {
            label: "Edit Profile",
            actionComponent: () => <MaterialIcons name="arrow-right" size={18} color="#000" />,
            onPress: () => null,
        },
        {
            label: "Change Password",
            actionComponent: () => <MaterialIcons name="arrow-right" size={18} color="#000" />,
            onPress: () => navigation.navigate("UpdatePasswordCore"),
        },
        {
            label: "Push Notifications",
            actionComponent: () => renderSwitch(setNotificationEnabled, notificationEnabled),
            onPress: () => null,
        },
        {
            label: "Dark Mode",
            actionComponent: () => renderSwitch(setDarkModeEnable, darkModeEnabled),
            onPress: () => null,
        },
        {
            label: "Sign Out",
            actionComponent: () => <MaterialIcons name="arrow-right" size={18} color="#000" />,
            onPress: () => handleSignOut(),
        },
        {
            label: null,
            actionComponent: () => <Hr color={colors.primaryLight} />,
            onPress: () => null,
        },
        {
            label: "About Us",
            actionComponent: null,
            onPress: () => null,
        },
        {
            label: "Privacy Policy",
            actionComponent: null,
            onPress: () => null,
        },
    ];

    const renderSettingItem = (item: SettingType) => {
        return (
            <SettingItem onPress={item.onPress} key={item.label} disabled={!item.label}>
                <Row gap="20px" style={{ justifyContent: "space-between" }}>
                    {item.label && <DefaultText color={colors.primary}>{item.label}</DefaultText>}
                    {item.actionComponent && item.actionComponent()}
                </Row>
            </SettingItem>
        );
    };

    return (
        <Container>
            <Row gap="15px">
                <ProfilePicture source={ProfilePhoto} resizeMode="cover" />
                <Title color="#000">{user.currentUser?.displayName}</Title>
            </Row>
            <Hr noFlex color={colors.primaryLight} marginVertical="20px" />
            <Subtitle marginBottom="10px">Account Settings</Subtitle>

            {settings.map(settingItem => renderSettingItem(settingItem))}
        </Container>
    );
};

export default Profile;
