import { StackNavigationProp } from "@react-navigation/stack";

type ChangeFragment = (fragment: "CreateNewPassword" | "VerifyCode") => void;

export type UpdatePasswordCoreFragmentProps = {
    navigation: StackNavigationProp<any>;
    changeFragment: ChangeFragment;
};
