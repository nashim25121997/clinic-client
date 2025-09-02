import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Table from "../components/Table.jsx";
import { Card, FormField } from "../components/FormWrap.jsx";
import Loader from "../components/ui/Loader";

const emptyForm = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  gender: "Male",
  dob: "",
  address: "",
  medicalHistory: "",
};
export default function Patients() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchItems = () => {
    api
      .get("/patients")
      .then((res) => setItems(res.data || []), setLoading(false))
      .catch((err) => console.error("Error fetching patients:", err));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (editing) await api.put(`/patients/${editing._id}`, form);
    else await api.post("/patients", form);
    setForm(emptyForm);
    setEditing(null);
    fetchItems();
  };
  const onEdit = (row) => {
    setEditing(row);
    setForm({ ...row, dob: row.dob ? row.dob.substring(0, 10) : "" });
  };
  const onDelete = async (row) => {
    await api.delete(`/patients/${row._id}`);
    fetchItems();
  };

  const onView = (row) => {
    navigate(`/patients/${row._id}`);
  };

  const searchItems = (val) => {
    setLoading(true);
    setSearch(val);
    const lowerVal = val.toLowerCase();
    api
      .get(`/patients?search=${lowerVal}`)
      .then((res) => setItems(res.data || []), setLoading(false))
      .catch((err) => console.error("Error fetching patients:", err));
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <div className="card !bg-blue-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="title">Patients</h2>
            <input
              type="text"
              placeholder="Search patients..."
              className="input !w-[300px] border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={search}
              onChange={(e) => searchItems(e.target.value)}
            />
          </div>
          <Table
            columns={[
              { key: "firstName", title: "First Name" },
              { key: "lastName", title: "Last Name" },
              { key: "phone", title: "Phone" },
              { key: "email", title: "Email" },
            ]}
            data={items}
            onEdit={onEdit}
            onDelete={onDelete}
            onView={onView}
          />
        </div>
      </div>
      <div className="md:col-span-1">
        <Card
          title={editing ? "Edit Patient" : "Add Patient"}
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
              <FormField label="First Name">
                <input
                  className="input"
                  value={form.firstName}
                  onChange={(e) =>
                    setForm({ ...form, firstName: e.target.value })
                  }
                  required
                />
              </FormField>
              <FormField label="Last Name">
                <input
                  className="input"
                  value={form.lastName}
                  onChange={(e) =>
                    setForm({ ...form, lastName: e.target.value })
                  }
                  required
                />
              </FormField>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Phone">
                <input
                  className="input"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </FormField>
              <FormField label="Email">
                <input
                  type="email"
                  className="input"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </FormField>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Gender">
                <select
                  className="input"
                  value={form.gender}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </FormField>
              <FormField label="Date of Birth">
                <input
                  type="date"
                  className="input"
                  value={form.dob}
                  onChange={(e) => setForm({ ...form, dob: e.target.value })}
                />
              </FormField>
            </div>
            <FormField label="Address">
              <input
                className="input"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </FormField>
            <FormField label="Medical History">
              <textarea
                className="input"
                rows="3"
                value={form.medicalHistory}
                onChange={(e) =>
                  setForm({ ...form, medicalHistory: e.target.value })
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
