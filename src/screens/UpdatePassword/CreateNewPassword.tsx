import React, { useState } from "react";
import DefaultButton from "@/src/components/buttons/DefaultButton";
import { Container, Subtitle, Title } from "@/src/styles-global";
import { Formik } from "formik";
import * as Yup from "yup";
import InputIcon from "@/src/components/InputIcon";
import { colors } from "@/src/assets/colors";
import { AuthCoreFragmentProps } from "../Auth/types";
import { useNotification } from "@/src/contexts/NotificationContext";
import { passwordValidation } from "../Auth/validationSchemas";
import { handleChangePassword } from "@/src/services/firebaseAuth/auth";

const PasswordRecoverSchema = Yup.object().shape({
    currentPassword: passwordValidation,
    newPassword: passwordValidation,
});

const CreateNewPassword: React.FC<AuthCoreFragmentProps> = ({ navigation, changeFragment }) => {
    const [tooglePassword, setTooglePassword] = useState(false);
    const { showNotification } = useNotification();
    const [loading, setLoading] = useState(false);

    const changePassword = async (currentPassword: string, newPassword: string) => {
        handleChangePassword(currentPassword, newPassword)
            .then(msg => {
                showNotification(msg);
                navigation.navigate("Profile");
            })
            .catch(err => {
                showNotification(err);
            });
    };

    return (
        <Container>
            <Title color="#000">Create New Password</Title>
            <Subtitle>
                Type your new strong password. Your password must include:{"\n"}- One capital letter
                & one small letter at least{"\n"}- One special character{"\n"}- Minimum 8 digits
                long{"\n"}
            </Subtitle>

            <Formik
                enableReinitialize
                initialValues={{
                    currentPassword: "",
                    newPassword: "",
                }}
                validationSchema={PasswordRecoverSchema}
                onSubmit={async value => {
                    try {
                        setLoading(true);

                        await changePassword(value.currentPassword, value.newPassword);
                    } catch (error) {
                        showNotification("Unable to change password");
                        console.error("Validation error: ", error);
                    } finally {
                        setLoading(false);
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
                                style={{ color: "#000" }}
                                iconName={tooglePassword ? "eye" : "eye-slash"}
                                placeholder="Current Password"
                                placeholderTextColor={colors.blueGray}
                                onChangeText={handleChange("currentPassword")}
                                onBlur={handleBlur("currentPassword")}
                                onPressIcon={() => setTooglePassword(!tooglePassword)}
                                value={values.currentPassword}
                                secureTextEntry={!tooglePassword}
                                errors={
                                    touched.currentPassword && errors.currentPassword
                                        ? errors.currentPassword
                                        : null
                                }
                            />
                            <InputIcon
                                style={{ color: "#000" }}
                                iconName={tooglePassword ? "eye" : "eye-slash"}
                                placeholder="Password"
                                placeholderTextColor={colors.blueGray}
                                onChangeText={handleChange("newPassword")}
                                onBlur={handleBlur("newPassword")}
                                onPressIcon={() => setTooglePassword(!tooglePassword)}
                                value={values.newPassword}
                                secureTextEntry={!tooglePassword}
                                errors={
                                    touched.newPassword && errors.newPassword
                                        ? errors.newPassword
                                        : null
                                }
                            />

                            <DefaultButton
                                label="Confirm Changes"
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

export default CreateNewPassword;
