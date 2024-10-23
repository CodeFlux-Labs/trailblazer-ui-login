import React, { useCallback, useEffect, useState } from "react";
import { BackHandler } from "react-native";
import DefaultButton from "@/src/components/buttons/DefaultButton";
import { Container, Subtitle, Title } from "@/src/styles-global";
import { Formik } from "formik";
import * as Yup from "yup";
import InputIcon from "@/src/components/InputIcon";
import { colors } from "@/src/assets/colors";
import { AuthCoreFragmentProps } from "./types";
import { useNotification } from "@/src/contexts/NotificationContext";
import { emailValidation } from "./validationSchemas";
import { handlePasswordReset } from "@/src/services/firebaseAuth/auth";
import { useFocusEffect } from "@react-navigation/native";
import { useBackButtonHandler } from "@/src/hooks";

const PasswordRecoverSchema = Yup.object().shape({
    email: emailValidation,
});

const PasswordRecover: React.FC<AuthCoreFragmentProps> = ({ navigation, changeFragment }) => {
    const [loading, setLoading] = useState(false);
    const { showNotification } = useNotification();

    useBackButtonHandler(() => changeFragment("SignIn"));

    return (
        <Container>
            <Title>Password Recover</Title>
            <Subtitle>Type your authorised email address to receive reset password link.</Subtitle>

            <Formik
                enableReinitialize
                initialValues={{
                    email: "",
                }}
                validationSchema={PasswordRecoverSchema}
                onSubmit={async user => {
                    setLoading(true);

                    await handlePasswordReset(user.email)
                        .then(message => {
                            changeFragment("SignIn");
                            showNotification(message);
                        })
                        .catch(error => {
                            showNotification(error);
                        })
                        .finally(() => {
                            setLoading(false);
                        });
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

                            <DefaultButton
                                label="Send Reset Link"
                                onPress={handleSubmit as any}
                                style={{ marginTop: 30 }}
                                loading={loading}
                            />
                        </>
                    );
                }}
            </Formik>
        </Container>
    );
};

export default PasswordRecover;
