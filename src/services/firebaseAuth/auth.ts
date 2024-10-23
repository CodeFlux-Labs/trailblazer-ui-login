import { auth } from "../firebaseConfig";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    sendEmailVerification,
    sendPasswordResetEmail,
    getAuth,
    signOut,
    reauthenticateWithCredential,
    EmailAuthProvider,
    updatePassword,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { handleFirebaseError } from "./firebaseErrorHandler";

export const registerWithEmail = async (email: string, password: string, fullName: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await updateProfile(user, { displayName: fullName });
        await sendEmailVerification(user);

        return userCredential.user;
    } catch (error: FirebaseError) {
        throw handleFirebaseError(error?.code);
    }
};

export const loginWithEmail = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error: FirebaseError) {
        throw handleFirebaseError(error?.code);
    }
};

export const handlePasswordReset = async (email: string) => {
    try {
        await sendPasswordResetEmail(getAuth(), email);
        return "A password reset email has been sent to your email address.";
    } catch (error) {
        console.error("Error sending password reset email:", error);
        throw "Failed to send password reset email. Please check the email address.";
    }
};

export const handleSignOut = async () => {
    try {
        await signOut(getAuth());
    } catch (error) {
        throw "Error signing out: " + error;
    }
};

export const handleChangePassword = async (currentPassword: string, newPassword: string) => {
    const user = auth.currentUser;

    if (user) {
        const credential = EmailAuthProvider.credential(user?.email!, currentPassword);

        return reauthenticateWithCredential(user, credential)
            .then(() => {
                return updatePassword(user, newPassword);
            })
            .then(() => {
                return "Password updated successfully!";
            })
            .catch(error => {
                throw handleFirebaseError(error?.code);
            });
    }
};
