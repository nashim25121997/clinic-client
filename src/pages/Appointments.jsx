import { useEffect, useState } from "react";
import api from "../api";
import Table from "../components/Table.jsx";
import { Card, FormField } from "../components/FormWrap.jsx";
import Loader from "../components/ui/Loader";


const emptyForm = {
  patient: "",
  doctor: "",
  date: "",
  status: "Scheduled",
  reason: "",
  notes: "",
};

export default function Appointments() {
  const [items, setItems] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAll = () =>
    Promise.all([
      api.get("/appointments"),
      api.get("/patients"),
      api.get("/doctors"),
    ]).then(([a, p, d]) => {
      setItems(a.data);
      setPatients(p.data);
      setDoctors(d.data);
      setLoading(false);
    });

  useEffect(() => {
    fetchAll();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const payload = { ...form, date: new Date(form.date) };
    if (editing) await api.put(`/appointments/${editing._id}`, payload);
    else await api.post("/appointments", payload);
    setForm(emptyForm);
    setEditing(null);
    fetchAll();
  };
  const onEdit = (row) => {
    setEditing(row);
    setForm({
      patient: row.patient?._id || row.patient,
      doctor: row.doctor?._id || row.doctor,
      date: row.date ? row.date.substring(0, 16) : "",
      status: row.status,
      reason: row.reason || "",
      notes: row.notes || "",
    });
  };
  const onDelete = async (row) => {
    await api.delete(`/appointments/${row._id}`);
    fetchAll();
  };

  return (
    loading ? <Loader /> :
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <Card title="Appointments">
          <Table
            columns={[
              {
                key: "patient",
                title: "Patient",
                render: (v, row) =>
                  row.patient?.firstName
                    ? row.patient.firstName + " " + row.patient.lastName
                    : "",
              },
              {
                key: "doctor",
                title: "Doctor",
                render: (v, row) => row.doctor?.name,
              },
              {
                key: "date",
                title: "Date",
                render: (v) => (v ? new Date(v).toLocaleString() : ""),
              },
              { key: "status", title: "Status" },
            ]}
            data={items}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Card>
      </div>

      <div className="md:col-span-1">
        <Card
          title={editing ? "Edit Appointment" : "Book Appointment"}
          actions={
            editing && (
              <button
                className="btn"
                onClick={() => {
                  setEditing(null);
                  setForm(emptyForm);
                }}
              >
                Cancel
              </button>
            )
          }
        >
          <form onSubmit={submit} className="grid gap-3">
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Patient">
                <select
                  className="input"
                  value={form.patient}
                  onChange={(e) =>
                    setForm({ ...form, patient: e.target.value })
                  }
                  required
                >
                  <option value="">Select Patient</option>
                  {patients.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.firstName} {p.lastName}
                    </option>
                  ))}
                </select>
              </FormField>
              <FormField label="Doctor">
                <select
                  className="input"
                  value={form.doctor}
                  onChange={(e) => setForm({ ...form, doctor: e.target.value })}
                  required
                >
                  <option value="">Select Doctor</option>
                  {doctors.map((d) => (
                    <option key={d._id} value={d._id}>
                      {d.name} ({d.specialty})
                    </option>
                  ))}
                </select>
              </FormField>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Date & Time">
                <input
                  type="datetime-local"
                  className="input"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  required
                />
              </FormField>
              <FormField label="Status">
                <select
                  className="input"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  <option>Scheduled</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </select>
              </FormField>
            </div>
            <FormField label="Reason">
              <input
                className="input"
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
              />
            </FormField>
            <FormField label="Notes">
              <textarea
                className="input"
                rows="3"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </FormField>
            <button className="btn btn-primary">
              {editing ? "Update" : "Create"}
            </button>
          </form>
        </Card>
      </div>
    </div>
  );
}
