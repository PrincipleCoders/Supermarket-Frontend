import { initializeApp } from "firebase/app";
import {GithubAuthProvider, FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export function startFirebaseAuthUI(containerId) {
    return new Promise((resolve, reject) => {
        const uiConfig = {
            callbacks: {
                signInSuccessWithAuthResult: function(authResult) {
                    // Resolve the promise with the authResult
                    resolve(authResult);
                    return false;
                },
                signInFailure(error) {
                    // Some unrecoverable error occurred during sign-in.
                    reject(error);
                    return false;
                },
                uiShown: function() {
                    document.getElementById('loader').style.display = 'none'
                },
            },
            signInFlow: 'popup',
            signInSuccessUrl: 'http://localhost:5173',
            signInOptions: [
                {provider: GoogleAuthProvider.PROVIDER_ID, fullLabel: 'Google', customParameters: {prompt: 'select_account'}},
                {provider: FacebookAuthProvider.PROVIDER_ID, fullLabel: 'Facebook', customParameters: {auth_type: 'reauthenticate'}},
                {provider: GithubAuthProvider.PROVIDER_ID, fullLabel: 'Github'},
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

export function signInWithEmail(email, password){
    return signInWithEmailAndPassword(auth, email, password)
}

export function createUserWithEmail(email,password){
    return createUserWithEmailAndPassword(auth, email, password);
}

export function updateAdditionalData(user, additionalData){
    return updateProfile(user, additionalData);
}

export function uploadFile(path, file){
    const storage = getStorage(firebaseApp);
    const storageRef = ref(storage, path);
    return uploadBytes(storageRef, file)
        .then((snapshot) => {
            return getDownloadURL(snapshot.ref)
        })
        .catch((error) => {
            console.error(error);
            throw error;
        });
}

