import { useEffect, useState } from "react";
import api from "../api";
import Table from "../components/Table.jsx";
import { Card, FormField } from "../components/FormWrap.jsx";
import Loader from "../components/ui/Loader";


const emptyForm = {
  patient: "",
  doctor: "",
  title: "",
  description: "",
  diagnosis: "",
  prescriptions: "",
  followUpDate: "",
};

export default function Cases() {
  const [items, setItems] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAll = () =>
    Promise.all([
      api.get("/cases"),
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
    const payload = {
      ...form,
      followUpDate: form.followUpDate ? new Date(form.followUpDate) : null,
    };
    if (editing) await api.put(`/cases/${editing._id}`, payload);
    else await api.post("/cases", payload);
    setForm(emptyForm);
    setEditing(null);
    fetchAll();
  };
  const onEdit = (row) => {
    setEditing(row);
    setForm({
      patient: row.patient?._id || row.patient,
      doctor: row.doctor?._id || row.doctor,
      title: row.title || "",
      description: row.description || "",
      diagnosis: row.diagnosis || "",
      prescriptions: row.prescriptions || "",
      followUpDate: row.followUpDate ? row.followUpDate.substring(0, 10) : "",
    });
  };
  const onDelete = async (row) => {
    await api.delete(`/cases/${row._id}`);
    fetchAll();
  };

  return (
    loading ? <Loader /> :
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <Card title="Cases">
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
              { key: "title", title: "Title" },
              {
                key: "followUpDate",
                title: "Follow Up",
                render: (v) => (v ? new Date(v).toLocaleDateString() : "-"),
              },
            ]}
            data={items}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Card>
      </div>

      <div className="md:col-span-1">
        <Card
          title={editing ? "Edit Case" : "Add Case"}
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
            <FormField label="Title">
              <input
                className="input"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </FormField>
            <FormField label="Description">
              <textarea
                className="input"
                rows="3"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </FormField>
            <FormField label="Diagnosis">
              <input
                className="input"
                value={form.diagnosis}
                onChange={(e) =>
                  setForm({ ...form, diagnosis: e.target.value })
                }
              />
            </FormField>
            <FormField label="Prescriptions">
              <textarea
                className="input"
                rows="3"
                value={form.prescriptions}
                onChange={(e) =>
                  setForm({ ...form, prescriptions: e.target.value })
                }
              />
            </FormField>
            <FormField label="Follow Up Date">
              <input
                type="date"
                className="input"
                value={form.followUpDate}
                onChange={(e) =>
                  setForm({ ...form, followUpDate: e.target.value })
                }
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
