import { FirebaseError } from "firebase/app";
import { httpsCallable } from "firebase/functions";
import { functions } from "../firebaseConfig";

export const sendVerificationCode = async (email: string) => {
    try {
        const response = await httpsCallable(functions, "sendVerificationCode")({ email });
        return response.data;
    } catch (error: FirebaseError) {
        console.log("Error sending verification code:", error.message);
        throw error.message;
    }
};

export const verifyCode = async (email: string, code: string) => {
    try {
        const response = await httpsCallable(functions, "verifyVerificationCode")({ email, code });
        return response.data.success;
    } catch (error: FirebaseError) {
        console.log("Error verifying code:", error.message);
        throw error.message;
    }
};
