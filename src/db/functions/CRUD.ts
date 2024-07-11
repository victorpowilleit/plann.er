import {collection, addDoc, doc, updateDoc, deleteDoc, getDoc} from "firebase/firestore";
import {db} from "./connect.ts";
import {DateRange} from "react-day-picker";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import {DocumentData} from "firebase/compat";

export type TripDataType = {
  ownerName?: string
  ownerEmail?: string
  invited?: { name: string, email: string, isConfirmed: boolean }[]
  destination?: string
  eventStartAndEndDates?: DateRange
  activities?: {title:string, occursAt: string}[]
  links?:{link:string, url:string}[]
}

export type DocDataType = DocumentData

export async function dbCreateTrip(tripData: TripDataType): Promise<string | null> {
  try {
    const docRef = await addDoc(collection(db, `trips/`), tripData);
    // console.log("Document written with ID: ", docRef.id);
    return docRef.id
  } catch (e) {
    // console.error("Error adding document: ", e);
    return null;
  }
}

// export async function dbSetTrip(tripData: TripDataType): Promise<boolean> {
//   try {
//     const docRef = await setDoc(doc(db, `trips/`, tripData.ownerEmail), tripData);
//     console.log("Document written with ID: ", docRef);
//     return true
//   } catch (e) {
//     console.error("Error adding document: ", e);
//     return false;
//   }
// }

export async function dbRead(tripId: string) {
  // Acessa diretamente o documento pelo seu ID
  const docRef = doc(db, "trips", tripId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // console.log(docSnap.id, " => ", docSnap.data());
    return docSnap.data()
  } else {
    // console.log("Error getting document!");
  }
}

export async function dbUpdateTrip(tripId: string, data: TripDataType): Promise<boolean> {
  try {
    // const docRef = doc(db, "trips", tripId);
    await updateDoc(docRef, data);
    return true
  } catch (e) {
    // console.error("Error updating document: ", e);
    return false
  }
}

export async function dbDelete() {
  await deleteDoc(doc(db, "cities", "DC"));
}