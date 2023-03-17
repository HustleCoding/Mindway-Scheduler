import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { useAuth } from "../../utils/auth";
import { collection, query, where, onSnapshot } from "firebase/firestore";

interface Appointment {
  id: string;
  psychologistId: string;
  patientId: string;
  date: string;
  time: string;
}

const AppointmentList = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    if (!user) return;

    const appointmentCollection = collection(db, "appointments");
    const appointmentQuery = query(
      appointmentCollection,
      where("patientId", "==", user.uid)
    );
    const unsubscribe = onSnapshot(appointmentQuery, (snapshot) => {
      const appointmentsData: Appointment[] = [];
      snapshot.forEach((doc) => {
        appointmentsData.push({ id: doc.id, ...doc.data() } as Appointment);
      });
      setAppointments(appointmentsData);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div>
      <h1>Appointments</h1>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            Psychologist ID: {appointment.psychologistId} | Date:{" "}
            {appointment.date} | Time: {appointment.time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentList;
