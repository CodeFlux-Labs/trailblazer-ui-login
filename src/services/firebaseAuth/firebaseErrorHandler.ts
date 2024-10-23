const firebaseErrorMessages: { [key: string]: string } = {
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/user-disabled": "This account has been disabled. Contact support for help.",
    "auth/user-not-found": "No account found with this email address.",
    "auth/wrong-password": "The password you entered is incorrect. Please try again.",
    "auth/email-already-in-use": "This email address is already associated with an account.",
    "auth/weak-password": "Your password is too weak. Please choose a stronger one.",
    "auth/network-request-failed": "Network error. Please check your connection.",
    "auth/too-many-requests": "Too many requests. Please try again later.",
    "auth/operation-not-allowed": "This sign-in method is not allowed.",
    "auth/requires-recent-login": "Please log in again to continue.",
    "auth/account-exists-with-different-credential":
        "An account with this email already exists using a different sign-in method.",
    "auth/invalid-credential": "Invalid email or password",
};

export const handleFirebaseError = (error: string): string => {
    console.log("firebaseErrorCode: ", error);
    console.log("firebaseErrorMessages: ", firebaseErrorMessages[error]);
    return firebaseErrorMessages[error] || "An unexpected error occurred. Please try again.";
};
