import React, { useState } from "react";
import DefaultButton from "@/src/components/buttons/DefaultButton";
import { Container, Hr, Label, Row, Subtitle, Title } from "@/src/styles-global";
import { Formik } from "formik";
import * as Yup from "yup";
import InputIcon from "@/src/components/InputIcon";
import { colors } from "@/src/assets/colors";
import LinkButton from "@/src/components/buttons/LinkButton";
import { AuthCoreFragmentProps } from "./types";
import CheckBoxButton from "@/src/components/buttons/CheckBoxButton";
import LoginSocialButton from "@/src/components/buttons/LoginSocialButton";
import { loginWithEmail } from "@/src/services/firebaseAuth/auth";
import { useNotification } from "@/src/contexts/NotificationContext";
import { ScrollView } from "react-native-gesture-handler";
import { emailValidation } from "./validationSchemas";

const SignInSchema = Yup.object().shape({
    email: emailValidation,
    password: Yup.string().required("Password is required").max(30),
});

const SignIn: React.FC<AuthCoreFragmentProps> = ({ navigation, changeFragment }) => {
    const [tooglePassword, setTooglePassword] = useState(false);
    const [toogleRememberMe, setToogleRememberMe] = useState(false);
    const { showNotification } = useNotification();
    const [loading, setLoading] = useState(false);

    return (
        <ScrollView>
            <Container>
                <Title>Welcome Back, Trailblazer!</Title>
                <Subtitle>
                    We are excited to have your back. Log in now and access your account.
                </Subtitle>

                <Formik
                    enableReinitialize
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    validationSchema={SignInSchema}
                    onSubmit={async auth => {
                        try {
                            setLoading(true);

                            await loginWithEmail(auth.email, auth.password)
                                .then(user => {
                                    if (user.emailVerified) {
                                        console.log("Login Success: ", user);
                                    } else {
                                        showNotification(
                                            "Email not verified. Please check your inbox.",
                                        );
                                    }
                                })
                                .catch(error => {
                                    showNotification(error);
                                })
                                .finally(() => {
                                    setLoading(false);
                                });
                        } catch (error) {
                            console.error("Validation error: ", error);
                        }
                    }}>
                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                        touched,
                        setFieldValue,
                    }) => {
                        return (
                            <>
                                <InputIcon
                                    placeholder="Email"
                                    placeholderTextColor={colors.blueGray}
                                    onChangeText={handleChange("email")}
                                    onBlur={handleBlur("email")}
                                    value={values.email}
                                    keyboardType="email-address"
                                    errors={touched.email && errors.email ? errors.email : null}
                                />

                                <InputIcon
                                    iconName={tooglePassword ? "eye" : "eye-slash"}
                                    placeholder="Password"
                                    placeholderTextColor={colors.blueGray}
                                    onChangeText={handleChange("password")}
                                    onBlur={() => handleBlur("password")}
                                    onPressIcon={() => setTooglePassword(!tooglePassword)}
                                    value={values.password}
                                    secureTextEntry={tooglePassword}
                                    errors={
                                        touched.password && errors.password ? errors.password : null
                                    }
                                />

                                <Row spaceBetween marginVertical="8px">
                                    <CheckBoxButton
                                        label="Remember me"
                                        toggleCheckBox={toogleRememberMe}
                                        setToggleCheckBox={setToogleRememberMe}
                                    />

                                    <LinkButton
                                        label="Forgot your password?"
                                        onPress={() => changeFragment("PasswordRecover")}
                                    />
                                </Row>

                                <DefaultButton
                                    label="Login"
                                    onPress={handleSubmit as any}
                                    style={{ marginTop: 30 }}
                                    loading={loading}
                                />
                            </>
                        );
                    }}
                </Formik>

                <Row gap="10px" marginVertical="40px">
                    <Hr />
                    <Label>or</Label>
                    <Hr />
                </Row>

                <LoginSocialButton buttonIcon="Google" onPress={() => null} />

                <Row centered gap="5px" marginVertical="20px">
                    <Label>Don't have an account yet?</Label>
                    <LinkButton label="Register" onPress={() => changeFragment("SignUp")} />
                </Row>
            </Container>
        </ScrollView>
    );
};

export default SignIn;
