import { getAuth } from "@firebase/auth";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

//Général
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
export const db = getFirestore(app);

//User collection
const usersCollection = collection(db, "Utilisateurs");
export const getUsers = async () => {
  const querySnapshot = await getDocs(usersCollection);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().Prenom,
    lastName: doc.data().Nom,
    email: doc.data().Email,
  }));
};

export const getUserDetails = async (uid) => {
  const userRef = doc(db, "Utilisateurs", uid);
  const userSnapshot = await getDoc(userRef);
  if (userSnapshot.exists()) {
    const userData = userSnapshot.data();
    return {
      name: userData.Nom,
      pseudo: userData.Pseudo,
    };
  } else {
    console.log("No user data found for UID:", uid);
    return null;
  }
};

//Event collection
const eventsCollection = collection(db, "Evenements");
export const getEvents = async () => {
  const querySnapshot = await getDocs(eventsCollection);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    date: doc.data().date,
    heure: doc.data().heure,
    distance: doc.data().distance,
    lieu: doc.data().lieu,
    parcours: doc.data().parcours,
    rythme: doc.data().rythme,
    auteur: doc.data().auteur,
    participants: doc.data().participants,
  }));
};

export const getEventDetails = async (eventId) => {
  const eventRef = doc(db, "Evenements", eventId);
  const eventSnapshot = await getDoc(eventRef);
  const eventData = eventSnapshot.data();
  return {
    id: eventSnapshot.id,
    date: eventData.date,
    heure: eventData.heure,
    distance: eventData.distance,
    lieu: eventData.lieu,
    parcours: eventData.parcours,
    rythme: eventData.rythme,
    auteur: eventData.auteur,
    participants: eventData.participants,
  };
};

export const addParticipantToEvent = async (eventId) => {
  try {
    const eventRef = doc(db, "Evenements", eventId);
    const eventSnapshot = await getDoc(eventRef);
    if (eventSnapshot.exists()) {
      const eventData = eventSnapshot.data();
      const currentPaticipants = eventData.Participants;
      const newParticipants = currentPaticipants + 1;
      await setDoc(eventRef, {
        id: eventSnapshot.id,
        date: eventData.Date,
        heure: eventData.Heure,
        distance: eventData.Distance,
        lieu: eventData.Lieu,
        parcours: eventData.Parcours,
        rythme: eventData.Rythme,
        auteur: eventData.Auteur,
        participants: newParticipants,
      });
    } else {
      throw new Error("Event not found");
    }
  } catch (error) {
    console.error("Error adding participant to event: ", error);
    throw error;
  }
};

export const auth = getAuth();
