import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAU_cVSiqNEhniG5Hw2bjareHiiB-skRK4",
    authDomain: "spetsvik1-deepdive.firebaseapp.com",
    databaseURL: "https://spetsvik1-deepdive-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "spetsvik1-deepdive",
    storageBucket: "spetsvik1-deepdive.appspot.com",
    messagingSenderId: "669607923989",
    appId: "1:669607923989:web:4ee7c3f2bf16dae0dfd91c"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();