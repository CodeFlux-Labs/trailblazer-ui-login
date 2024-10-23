import { StackNavigationProp } from "@react-navigation/stack";

type ChangeFragment = (fragment: "SignIn" | "SignUp" | "PasswordRecover") => void;

export type AuthCoreFragmentProps = {
    navigation: StackNavigationProp<any>;
    changeFragment: ChangeFragment;
};
