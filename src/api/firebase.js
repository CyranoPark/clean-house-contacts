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

export const getContacts = () => {
    const dbRef = firebase.database().ref();
    dbRef
        .child('contacts')
        .get()
        .then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
            } else {
                console.log('No data available');
            }
        })
        .catch((error) => {
            console.error(error);
        });
};

export const postContacts = () => {
    [].forEach((item) => {
        const postListRef = firebase.database().ref('contacts');
        const newPostRef = postListRef.push();
        newPostRef.set({ ...item, group: '' });
    });
};

export const postGroups = () => {
    const sample = {
        name: '대주아파트',
        active: false,
    };
    const postListRef = firebase.database().ref('groups');
    const newPostRef = postListRef.push();
    newPostRef.set(sample);
};

export const postMessageTemplate = () => {
    const sample = {
        content: '안녕하세요',
        active: false,
    };
    const postListRef = firebase.database().ref('templates');
    const newPostRef = postListRef.push();
    newPostRef.set(sample);
};

export const postMessageHistory = () => {
    const sample = {
        target: '',
        content: '',
        created_at: new Date().toISOString(),
    };
    const postListRef = firebase.database().ref('message_history');
    const newPostRef = postListRef.push();
    newPostRef.set(sample);
};
