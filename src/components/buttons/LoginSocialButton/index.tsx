import React, { useEffect } from "react";
import { TouchableOpacityProps, GestureResponderEvent } from "react-native";
import { DefaultBtn, SocialButtonIcon } from "./styles";
import FacebookIcon from "@assets/images/facebook-icon.png";
import GoogleIcon from "@assets/images/google-icon.png";
import AppleIcon from "@assets/images/apple-icon.png";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { getAuth, signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import { CLIENT_ID, CLIENT_SECRET } from "@env";

WebBrowser.maybeCompleteAuthSession();

const redirectUri = AuthSession.makeRedirectUri({
    useProxy: true,
});

console.log(redirectUri);

//= ==============================================================================================
interface LoginSocialButtonProps extends TouchableOpacityProps {
    onPress: (event: GestureResponderEvent) => void;
    buttonIcon: "Facebook" | "Google" | "Apple";
}

//= ==============================================================================================
const LoginSocialButton: React.FC<LoginSocialButtonProps> = ({ onPress, buttonIcon, ...rest }) => {
    const src = { Facebook: FacebookIcon, Google: GoogleIcon, Apple: AppleIcon };

    const [request, response, promptAsync] = AuthSession.useAuthRequest(
        {
            clientId: CLIENT_ID,
            redirectUri: "https://trailblazer-ui-login.firebaseapp.com",
            scopes: ["profile", "email"], // Scopes you want to request
        },
        {
            // Use this for a web-based flow
            authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
            tokenEndpoint: "https://oauth2.googleapis.com/token",
            revocationEndpoint: "https://oauth2.googleapis.com/revoke",
        },
    );

    useEffect(() => {
        if (response?.type === "success") {
            const { code } = response.params;

            // Exchange the code for an access token
            fetch("https://oauth2.googleapis.com/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    client_id: CLIENT_ID,
                    client_secret: CLIENT_SECRET,
                    code,
                    grant_type: "authorization_code",
                    redirect_uri: "https://trailblazer-ui-login.firebaseapp.com",
                }),
            })
                .then(res => res.json())
                .then(data => {
                    const credential = GoogleAuthProvider.credential(data.id_token);

                    return signInWithCredential(getAuth(), credential);
                })
                .then(() => {
                    console.log("User signed in!");
                })
                .catch(error => {
                    console.error("Error signing in: ", error);
                });
        }
    }, [response]);

    // const useGoogleAuth = () => {
    //     const redirectUri = AuthSession.makeRedirectUri({
    //         useProxy: true, // For development
    //     });

    //     const startGoogleSignIn = async () => {
    //         const result = await AuthSession.({
    //             authUrl: `https://accounts.google.com/o/oauth2/auth?client_id=YOUR_GOOGLE_CLIENT_ID&redirect_uri=${redirectUri}&response_type=token&scope=profile email`,
    //         });

    //         // Handle the result here
    //         if (result.type === 'success') {
    //             const { access_token } = result.params;
    //             // Use the access_token as needed
    //         }
    //     };

    //     return { startGoogleSignIn };
    // };

    return (
        <DefaultBtn
            disabled={!request}
            onPress={() => {
                promptAsync();
            }}
            {...rest}>
            <SocialButtonIcon source={src[buttonIcon]} />
        </DefaultBtn>
    );
};

export default LoginSocialButton;
