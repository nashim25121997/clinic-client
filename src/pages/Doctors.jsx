import { useEffect, useState } from "react";
import api from "../api";
import Table from "../components/Table.jsx";
import { Card, FormField } from "../components/FormWrap.jsx";

const emptyForm = { name: "", specialty: "", phone: "", email: "", room: "" };

export default function Doctors() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);

  const fetchItems = () =>
    api.get("/doctors").then((res) => setItems(res.data));
  // useEffect(fetchItems, []);
  useEffect(() => {
    fetchItems();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (editing) await api.put(`/doctors/${editing._id}`, form);
    else await api.post("/doctors", form);
    setForm(emptyForm);
    setEditing(null);
    fetchItems();
  };
  const onEdit = (row) => {
    setEditing(row);
    setForm(row);
  };
  const onDelete = async (row) => {
    await api.delete(`/doctors/${row._id}`);
    fetchItems();
  };

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <Card title="Doctors">
          <Table
            columns={[
              { key: "name", title: "Name" },
              { key: "specialty", title: "Specialty" },
              { key: "phone", title: "Phone" },
              { key: "email", title: "Email" },
            ]}
            data={items}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Card>
      </div>

      <div className="md:col-span-1">
        <Card
          title={editing ? "Edit Doctor" : "Add Doctor"}
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
            <FormField label="Name">
              <input
                className="input"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </FormField>
            <FormField label="Specialty">
              <input
                className="input"
                value={form.specialty}
                onChange={(e) =>
                  setForm({ ...form, specialty: e.target.value })
                }
                required
              />
            </FormField>
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
            <FormField label="Room">
              <input
                className="input"
                value={form.room}
                onChange={(e) => setForm({ ...form, room: e.target.value })}
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
