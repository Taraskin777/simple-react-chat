import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBjFqgey5X7pgr_xegxVVTAEFBmpBjnv0w",
  authDomain: "chat-528e5.firebaseapp.com",
  databaseURL:
    "https://chat-528e5-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chat-528e5",
  storageBucket: "chat-528e5.appspot.com",
  messagingSenderId: "244273836088",
  appId: "1:244273836088:web:df5880273c77d5f90f36cd",
};

const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
