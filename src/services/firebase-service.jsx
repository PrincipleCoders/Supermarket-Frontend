import { initializeApp } from "firebase/app";
import {EmailAuthProvider, FacebookAuthProvider, getAuth, GoogleAuthProvider} from "firebase/auth";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export default function startFirebaseAuthUI(containerId, loaderId) {
    return new Promise((resolve, reject) => {
        const uiConfig = {
            callbacks: {
                signInSuccessWithAuthResult: function(authResult) {
                    // Resolve the promise with the authResult
                    resolve(authResult.user.getIdToken());
                    return false;
                },
                signInFailure(error) {
                    // Some unrecoverable error occurred during sign-in.
                    reject(error);
                    return false;
                },
                uiShown: function() {
                    document.getElementById(loaderId).style.display = 'none';
                },
            },
            signInFlow: 'popup',
            signInSuccessUrl: 'http://localhost:5173/login',
            signInOptions: [
                EmailAuthProvider.PROVIDER_ID,
                GoogleAuthProvider.PROVIDER_ID,
                FacebookAuthProvider.PROVIDER_ID,
            ],
            // Terms of service url.
            tosUrl: '<your-tos-url>',
            // Privacy policy url.
            privacyPolicyUrl: '<your-privacy-policy-url>',
        };

        if (firebaseui.auth.AuthUI.getInstance()) {
            firebaseui.auth.AuthUI.getInstance().start(containerId, uiConfig);
        } else {
            new firebaseui.auth.AuthUI(auth).start(containerId, uiConfig);
        }
    });
}
