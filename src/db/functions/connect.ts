import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {firebaseConfig} from "../env/keys.ts";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);