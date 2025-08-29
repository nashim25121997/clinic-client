import { Link, NavLink, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Patients from "./pages/Patients.jsx";
import Doctors from "./pages/Doctors.jsx";
import Staff from "./pages/Staff.jsx";
import Appointments from "./pages/Appointments.jsx";
import Cases from "./pages/Cases.jsx";
import Logo from "./assets/images/logo.png";

const navLinkClass = ({ isActive }) =>
  `px-3 py-2 rounded-xl ${isActive ? "bg-indigo-600 text-white" : "text-black-600 hover:bg-slate-200"}`;

export default function App() {
  return (
    <div className="min-h-screen">
      <header className="bg-[#1CA4AC] border-b">
        <div className=" mx-auto px-4 py-4 flex items-center gap-6">
          <Link to="/" className="text-xl font-bold"><img src={Logo} width="150px"/></Link>
          <nav className="flex gap-2">
            <NavLink to="/" className={navLinkClass} end>Dashboard</NavLink>
            <NavLink to="/patients" className={navLinkClass}>Patients</NavLink>
            <NavLink to="/doctors" className={navLinkClass}>Doctors</NavLink>
            <NavLink to="/staff" className={navLinkClass}>Staff</NavLink>
            <NavLink to="/appointments" className={navLinkClass}>Appointments</NavLink>
            <NavLink to="/cases" className={navLinkClass}>Cases</NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto px-4 py-6 min-h-[calc(100vh-96px)]">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/cases" element={<Cases />} />
        </Routes>
      </main>
    </div>
  );
}
