import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import PatientDetail from "./pages/PatientDetail";
import AddPatient from "./pages/AddPatient";
import { PatientProvider } from "./context/PatientContext";

export default function App() {
  return (
    <PatientProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/patients/new" element={<AddPatient />} />
            <Route path="/patients/:id" element={<PatientDetail />} />
          </Routes>
        </Layout>
      </Router>
    </PatientProvider>
  );
}
