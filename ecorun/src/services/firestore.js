import { getAuth } from "@firebase/auth";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

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

const eventsCollection = collection(db, "Evenements");
export const getEvents = async () => {
  const querySnapshot = await getDocs(eventsCollection);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    date: doc.data().Date,
    heure: doc.data().Heure,
    distance: doc.data().Distance,
    lieu: doc.data().Lieu,
    parcours: doc.data().Parcours,
    rythme: doc.data().Rythme,
    auteur: doc.data().Auteur,
  }));
};

export const getEventDetails = async (eventId) => {
  const eventRef = doc(db, "Evenements", eventId);
  const eventSnapshot = await getDoc(eventRef);

  const eventData = eventSnapshot.data();
  return {
    id: eventSnapshot.id,
    date: eventData.Date,
    heure: eventData.Heure,
    distance: eventData.Distance,
    lieu: eventData.Lieu,
    parcours: eventData.Parcours,
    rythme: eventData.Rythme,
    auteur: eventData.Auteur,
    participants: eventData.Participants,
  };
};

export const addParticipantToEvent = async (eventId) => {
  try {
    const eventRef = doc(db, "Evenements", eventId);
    const eventSnapshot = await getDoc(eventRef);
    if (eventSnapshot.exists()) {
      const eventData = eventSnapshot.data();
      const currentParticipants = eventData.participants;
      const newParticipants = currentParticipants + 1;
      await updateDoc(eventRef, { participants: newParticipants });
    } else {
      throw new Error("Event not found");
    }
  } catch (error) {
    console.error("Error adding participant to event: ", error);
    throw error;
  }
};

export const auth = getAuth();
