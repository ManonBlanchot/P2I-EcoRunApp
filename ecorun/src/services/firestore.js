import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAUXnr_IAAQXx32wwVKGA1wIelh3seg-Gw",
  authDomain: "ecorundb.firebaseapp.com",
  projectId: "ecorundb",
  storageBucket: "ecorundb.appspot.com",
  messagingSenderId: "80052269980",
  appId: "1:80052269980:web:d77d7641f8b65616050e59",
  measurementId: "G-T61BYF8PWM",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const usersCollection = collection(db, "Utilisateurs");

export const getUsers = async () => {
  const querySnapshot = await getDocs(usersCollection);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().Prenom,
    lastName: doc.data().Nom,
  }));
};
