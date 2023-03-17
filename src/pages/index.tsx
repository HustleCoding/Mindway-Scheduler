import AppointmentForm from "../../components/Schedule/AppointmentForm";
import AppointmentList from "../../components/Schedule/AppointmentList";
import { useRequireAuth } from "../../utils/auth";

const HomePage = () => {
  const auth = useRequireAuth();

  if (auth.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome!</h1>
      <AppointmentForm />
      <AppointmentList />
    </div>
  );
};

export default HomePage;
