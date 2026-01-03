import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBbvQBir5zviGBpxEotmhOzuqK53wy_gHU',
  authDomain: 'unimate-71f1c.firebaseapp.com',
  projectId: 'unimate-71f1c',
  storageBucket: 'unimate-71f1c.firebasestorage.app',
  messagingSenderId: '742858295670',
  appId: '1:742858295670:web:385223a2721976b5725257',
  measurementId: 'G-PTFZQ7DBD1',
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const googleProvider = new GoogleAuthProvider();
