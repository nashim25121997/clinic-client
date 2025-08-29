import { useEffect, useState } from "react";
import api from "../api";

export default function Dashboard() {
  const [counts, setCounts] = useState({ patients: 0, doctors: 0, staff: 0, appointments: 0, cases: 0 });
  useEffect(() => {
    Promise.all([
      api.get("/patients"),
      api.get("/doctors"),
      api.get("/staff"),
      api.get("/appointments"),
      api.get("/cases"),
    ]).then(([p, d, s, a, c]) => {
      setCounts({
        patients: p.data.length,
        doctors: d.data.length,
        staff: s.data.length,
        appointments: a.data.length,
        cases: c.data.length,
      });
    }).catch(console.error);
  }, []);

  const cards = [
    { label: "Patients", value: counts.patients },
    { label: "Doctors", value: counts.doctors },
    { label: "Staff", value: counts.staff },
    { label: "Appointments", value: counts.appointments },
    { label: "Cases", value: counts.cases },
  ];

  return (
    <div className="grid md:grid-cols-5 gap-4">
      {cards.map((c) => (
        <div key={c.label} className="card text-center">
          <div className="text-4xl font-bold">{c.value}</div>
          <div className="text-slate-600 mt-1">{c.label}</div>
        </div>
      ))}
    </div>
  );
}
