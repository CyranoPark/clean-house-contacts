import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';

const SIZE = 20;

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

export const getContactByMobile = (mobile) => {
    const dbRef = firebase.database().ref('contacts');
    dbRef.orderByChild('mobile').equalTo(mobile).limitToFirst(10);
    // .startAt(mobile).endAt(mobile).limitToFirst(10);
    return new Promise((resolve, reject) => {
        dbRef
            .get()
            .then((snapshot) => {
                if (snapshot.exists()) {
                    console.log(snapshot.val());
                    resolve(snapshot.val());
                } else {
                    console.log('No data available');
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const getContacts = (page) => {
    const db = firebase.firestore();
    const start = page * SIZE;

    const ref = db
        .collection('contacts')
        .orderBy('created_at')
        .startAt(start)
        .limit(SIZE);

    return ref.get().then((documentSnapshots) => {
        return documentSnapshots.docs.map((doc) => doc.data());
    });
};

export const getContactsByMobile = (page, mobile = '') => {
    const db = firebase.firestore();
    const start = page * SIZE;

    let ref;

    // .startAt(mobile)
    // .endAt(mobile + '\uf8ff')
    if (mobile) {
        ref = db
            .collection('contacts')
            .where('mobile', '==', mobile)
            .limit(SIZE);
    } else {
        ref = db.collection('contacts').orderBy('created_at').limit(SIZE);
    }

    return ref.get().then((documentSnapshots) => {
        return documentSnapshots.docs.map((doc) => doc.data());
    });
};
