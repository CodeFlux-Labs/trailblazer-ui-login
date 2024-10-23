import React, { useState } from "react";
import DefaultButton from "@/src/components/buttons/DefaultButton";
import { Container, Hr, Label, Row, Subtitle, Title } from "@/src/styles-global";
import { Formik } from "formik";
import * as Yup from "yup";
import InputIcon from "@/src/components/InputIcon";
import { colors } from "@/src/assets/colors";
import LinkButton from "@/src/components/buttons/LinkButton";
import { AuthCoreFragmentProps } from "./types";
import LoginSocialButton from "@/src/components/buttons/LoginSocialButton";
import { useNotification } from "@/src/contexts/NotificationContext";
import { registerWithEmail } from "@/src/services/firebaseAuth/auth";
import { ScrollView } from "react-native-gesture-handler";
import { emailValidation, passwordValidation } from "./validationSchemas";
import { useBackButtonHandler } from "@/src/hooks";

const SignUpSchema = Yup.object().shape({
    fullName: Yup.string().required("Full name is required").max(60),
    email: emailValidation,
    password: passwordValidation,
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
});

const SignUp: React.FC<AuthCoreFragmentProps> = ({ navigation, changeFragment }) => {
    const [tooglePassword, setTooglePassword] = useState(false);
    const [toogleConfirmPassword, setToogleConfirmPassword] = useState(false);
    const { showNotification } = useNotification();
    const [loading, setLoading] = useState(false);

    useBackButtonHandler(() => changeFragment("SignIn"));

    return (
        <ScrollView>
            <Container>
                <Title>Register</Title>
                <Subtitle>
                    Ready to become part of the exclusive club? Fill in the details below, and let
                    the journey begin!
                </Subtitle>

                <Formik
                    enableReinitialize
                    initialValues={{
                        fullName: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                    }}
                    validationSchema={SignUpSchema}
                    onSubmit={async auth => {
                        try {
                            console.log("Form submitted successfully with values: ", auth);
                            setLoading(true);

                            await registerWithEmail(auth.email, auth.password, auth.fullName)
                                .then(() => {
                                    showNotification(
                                        "An email verification has been sent to your email address.",
                                    );
                                })
                                .catch(error => showNotification(error))
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
                                    placeholder="Full Name"
                                    placeholderTextColor={colors.blueGray}
                                    onChangeText={handleChange("fullName")}
                                    onBlur={handleBlur("fullName")}
                                    value={values.fullName}
                                    errors={
                                        touched.fullName && errors.fullName ? errors.fullName : null
                                    }
                                />

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
                                    onBlur={handleBlur("password")}
                                    onPressIcon={() => setTooglePassword(!tooglePassword)}
                                    value={values.password}
                                    secureTextEntry={!tooglePassword}
                                    errors={
                                        touched.password && errors.password ? errors.password : null
                                    }
                                />

                                <InputIcon
                                    iconName={toogleConfirmPassword ? "eye" : "eye-slash"}
                                    placeholder="Confirm Password"
                                    placeholderTextColor={colors.blueGray}
                                    onChangeText={handleChange("confirmPassword")}
                                    onBlur={handleBlur("confirmPassword")}
                                    onPressIcon={() =>
                                        setToogleConfirmPassword(!toogleConfirmPassword)
                                    }
                                    value={values.confirmPassword}
                                    secureTextEntry={!toogleConfirmPassword}
                                    errors={
                                        touched.confirmPassword && errors.confirmPassword
                                            ? errors.confirmPassword
                                            : null
                                    }
                                />

                                <DefaultButton
                                    label="Register"
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
                    <Label>Already have an account?</Label>
                    <LinkButton label="Login" onPress={() => changeFragment("SignIn")} />
                </Row>
            </Container>
        </ScrollView>
    );
};

export default SignUp;
