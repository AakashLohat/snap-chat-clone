import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAJwDGhPAjzfV2GigXtYJ9TzDC-49L5rw0",
    authDomain: "snapchat-clone-a3f38.firebaseapp.com",
    projectId: "snapchat-clone-a3f38",
    storageBucket: "snapchat-clone-a3f38.appspot.com",
    messagingSenderId: "78962727359",
    appId: "1:78962727359:web:058b59799ea946eacc290a",
    measurementId: "G-3P2DW4E558"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()

const auth = firebase.auth()
const storage = firebase.storage()

const provider = new firebase.auth.GoogleAuthProvider()

export { db, auth, storage, provider }