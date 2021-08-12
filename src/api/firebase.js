import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

export const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_APP_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const signInWithEmailAndPassword = ({ email, password }) =>
    firebase.auth().signInWithEmailAndPassword(email, password);

export const createUserWithEmailAndPassword = (email, password) =>
    firebase.auth().createUserWithEmailAndPassword(email, password);

export const authUser = (callback) => {
    return firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            callback(user);
        }
    });
};

export const firebasePostData = () => {
    firebase.database().ref('/contacts').set({
        test: 'name1212',
    });
};
