import { useState } from "react";
import { useAuth } from "../../utils/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

const appointmentsCollection = collection(db, "appointments");

const AppointmentForm = () => {
  const { user } = useAuth();
  const [psychologistId, setPsychologistId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await addDoc(appointmentsCollection, {
        psychologistId,
        patientId: user.uid,
        date,
        time,
      });
      setPsychologistId("");
      setDate("");
      setTime("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Schedule Appointment</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Psychologist ID"
          value={psychologistId}
          onChange={(e) => setPsychologistId(e.target.value)}
        />
        <input
          type="date"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="time"
          placeholder="Time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <button type="submit">Schedule</button>
      </form>
    </div>
  );
};

export default AppointmentForm;
