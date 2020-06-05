import * as firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'YOUR_FIREBASE_API_KEY',
  authDomain: 'YOUR_FIREBASE_PROJECT_NAME.firebaseapp.com',
  databaseURL: 'https://YOUR_FIREBASE_PROJECT_NAME.firebaseio.com',
  projectId: 'YOUR_FIREBASE_PROJECT_NAME',
  storageBucket: 'YOUR_FIREBASE_PROJECT_NAME.appspot.com',
  messagingSenderId: 'YOUR_FIREBASE_MESSAGING_SENDER_ID',
  appId: 'YOUR_FIREBASE_APP_ID',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAuth = firebaseApp.auth();
export { firebaseAuth };
