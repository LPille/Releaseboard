import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAIy2KLnI0dn3ag-yutRJ-T1FBc0nL1rUE",
  authDomain: "releaseboard-902ea.firebaseapp.com",
  projectId: "releaseboard-902ea",
  storageBucket: "releaseboard-902ea.appspot.com",
  messagingSenderId: "223663280441",
  appId: "1:223663280441:web:ce368759cc98bad89b98e8"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
