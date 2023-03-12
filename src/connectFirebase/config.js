import { initializeApp } from 'firebase/app';
import { FacebookAuthProvider, getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyA5miAV3tDWagJ4hwUvKDzj-WMSmP1c9m0',
    authDomain: 'musiconline-b4222.firebaseapp.com',
    projectId: 'musiconline-b4222',
    storageBucket: 'musiconline-b4222.appspot.com',
    messagingSenderId: '461752220344',
    appId: '1:461752220344:web:6675b771f55659f0a6124d',
    measurementId: 'G-VZ4LWQZG1X',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const db = getFirestore(app);
auth.languageCode = 'it';

const googleAuthProvider = new GoogleAuthProvider();
const facebookAuthProvider = new FacebookAuthProvider();

export { auth, db, googleAuthProvider, facebookAuthProvider };
