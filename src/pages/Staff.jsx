import { useEffect, useState } from "react";
import api from "../api";
import Table from "../components/Table.jsx";
import { Card, FormField } from "../components/FormWrap.jsx";
import Loader from "../components/ui/Loader";

const emptyForm = { name: "", role: "", phone: "", email: "" };

export default function Staff() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchItems = () => api.get("/staff").then((res) => setItems(res.data), setLoading(false));
  useEffect(() => {
    fetchItems();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (editing) await api.put(`/staff/${editing._id}`, form);
    else await api.post("/staff", form);
    setForm(emptyForm);
    setEditing(null);
    fetchItems();
  };
  const onEdit = (row) => {
    setEditing(row);
    setForm(row);
  };
  const onDelete = async (row) => {
    await api.delete(`/staff/${row._id}`);
    fetchItems();
  };

  return (
    loading ? <Loader /> :
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <Card title="Staff">
          <Table
            columns={[
              { key: "name", title: "Name" },
              { key: "role", title: "Role" },
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
          title={editing ? "Edit Staff" : "Add Staff"}
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
            <FormField label="Role">
              <input
                className="input"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
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
            <button className="btn btn-primary">
              {editing ? "Update" : "Create"}
            </button>
          </form>
        </Card>
      </div>
    </div>
  );
}
