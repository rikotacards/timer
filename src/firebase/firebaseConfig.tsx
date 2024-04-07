// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { addDoc, getFirestore, collection , serverTimestamp} from "firebase/firestore"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5Sw7cDBveBtze1tf_c2SdILISt2p3eh4",
  authDomain: "timeflix-app.firebaseapp.com",
  projectId: "timeflix-app",
  storageBucket: "timeflix-app.appspot.com",
  messagingSenderId: "777146788331",
  appId: "1:777146788331:web:30790120d43525dd4251ae",
  measurementId: "G-9M7MGGPLH0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-undef
export const db = getFirestore(app);

// example uid
export const UID = 'max'
