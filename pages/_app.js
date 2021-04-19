import 'tailwindcss/tailwind.css'

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDEJnmLzj5iVbzXpooRYLDJmlWw_HuPDi4",
    authDomain: "covhelp-6b4a9.firebaseapp.com",
    projectId: "covhelp-6b4a9",
    storageBucket: "covhelp-6b4a9.appspot.com",
    messagingSenderId: "1065658283507",
    appId: "1:1065658283507:web:accf8754134365735cce86",
    measurementId: "G-C8KNPMB8TJ"
};

if (firebase.apps.length == 0) firebase.initializeApp(firebaseConfig)

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
