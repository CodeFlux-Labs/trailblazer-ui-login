import React, { useEffect, useState } from "react";
import { Keyboard } from "react-native";
import { Container, Subtitle, Title } from "@/src/styles-global";
import { UpdatePasswordCoreFragmentProps } from "./types";
import InputVerifcationCode from "@/src/components/inputs/InputVerificationCode";
import { sendVerificationCode, verifyCode } from "@/src/services/functions";
import { useNotification } from "@/src/contexts/NotificationContext";
import { getAuth } from "firebase/auth";

const VerifyCode: React.FC<UpdatePasswordCoreFragmentProps> = ({ navigation, changeFragment }) => {
    const { showNotification } = useNotification();
    const [loading, setLoading] = useState(false);
    const auth = getAuth();
    const { email } = auth.currentUser;

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);

                await sendVerificationCode(email)
                    .then(() => {
                        changeFragment("VerifyCode");
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
        })();
    }, []);

    const onVerify = async (code: string) => {
        setLoading(true);
        Keyboard.dismiss();

        await verifyCode(email, code)
            .then(success => {
                if (success) {
                    changeFragment("CreateNewPassword");
                }
            })
            .catch(error => {
                showNotification(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Container>
            <Title color="#000">Verify Your Code</Title>
            <Subtitle>
                We have sent you a passcode to verify your identity. Please check your email{" "}
                {auth.currentUser?.email}
            </Subtitle>
            <InputVerifcationCode length={6} onComplete={onVerify} loading={loading} />
        </Container>
    );
};

export default VerifyCode;
