import { collection, addDoc } from "firebase/firestore";
import { db } from "./config";

const appointmentsCollection = collection(db, "appointments");

interface Appointment {
  psychologistId: string;
  patientId: string;
  date: Date;
}

export const addAppointment = async (appointment: Appointment) => {
  try {
    const docRef = await addDoc(appointmentsCollection, appointment);
    console.log("Appointment added with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding appointment: ", error);
  }
};
