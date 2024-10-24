import React, { useEffect } from "react";
import { TouchableOpacityProps, GestureResponderEvent, Platform } from "react-native";
import { DefaultBtn, SocialButtonIcon } from "./styles";
import FacebookIcon from "@assets/images/facebook-icon.png";
import GoogleIcon from "@assets/images/google-icon.png";
import AppleIcon from "@assets/images/apple-icon.png";
import * as WebBrowser from "expo-web-browser";
import { CLIENT_ANDROID_ID } from "@env";
import * as AuthSession from "expo-auth-session";
import { makeRedirectUri } from "expo-auth-session";
import { getAuth, GoogleAuthProvider } from "@firebase/auth";
import { signInWithCredential } from "firebase/auth";

WebBrowser.maybeCompleteAuthSession();

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
            clientId: CLIENT_ANDROID_ID,
            redirectUri: makeRedirectUri({
                useProxy: true,
            }),
            scopes: ["profile", "email"],
        },
        {
            authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
            tokenEndpoint: "https://oauth2.googleapis.com/token",
            revocationEndpoint: "https://oauth2.googleapis.com/revoke",
        },
    );

    const codeVerifier = request?.codeVerifier;

    useEffect(() => {
        if (response?.type === "success") {
            const { code } = response.params;

            fetch("https://oauth2.googleapis.com/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    client_id: CLIENT_ANDROID_ID,
                    code: code,
                    grant_type: "authorization_code",
                    redirect_uri: AuthSession.makeRedirectUri({ useProxy: true }),
                    code_verifier: codeVerifier,
                }).toString(),
            })
                .then(res => res.json())
                .then(async data => {
                    if (data.access_token) {
                        const credential = GoogleAuthProvider.credential(null, data.access_token);

                        try {
                            await signInWithCredential(getAuth(), credential);
                        } catch (error) {
                            console.error("Firebase sign-in error: ", error);
                        }
                    } else {
                        console.error("Error fetching access token:", data);
                    }
                })
                .catch(error => {
                    console.error("Error exchanging code for access token:", error);
                });
        }
    }, [response, codeVerifier]);

    return (
        <DefaultBtn disabled={!request} onPress={() => promptAsync()} {...rest}>
            <SocialButtonIcon source={src[buttonIcon]} />
        </DefaultBtn>
    );
};

export default LoginSocialButton;
