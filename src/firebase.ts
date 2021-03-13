import firebase from 'firebase/app';
import "firebase/app";
// DBに必要なインポート
import "firebase/firestore";
// 認証に必要なデータ
import "firebase/auth";

firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseUrl: process.env.REACT_APP_FIREBASE_DATABSE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
})

export const db = firebase.firestore();
export const auth = firebase.auth();
