import { useEffect, useState } from "react";
import api from "../api";
import Table from "../components/Table.jsx";
import { Card, FormField } from "../components/FormWrap.jsx";
import Loader from "../components/ui/Loader";
import { useParams } from "react-router-dom";
import CasesAccordion from "../components/CaseAccordian.jsx";
import ReportsTab from "../components/ReportTab.jsx";

const emptyForm = {
  patient: "",
  doctor: "",
  title: "",
  description: "",
  diagnosis: "",
  prescriptions: "",
  followUpDate: "",
};

export default function PatientDetails() {
  const [patientDetails, setPatientDetails] = useState([]);
  // const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeTab, setActiveTab] = useState("Cases");
  const [cases, setCases] = useState([]); 

  const fetchAll = () =>
    Promise.all([
      api.get(`/patients/${id}`),
      api.get(`/cases/patient/${id}`),
      // api.get("/patients"),
      api.get("/doctors"),
    ]).then(([p, c, d]) => {
      setPatientDetails(p.data);
      setCases(c.data);
      // setPatients(p.data);
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
      patient: id,
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

  console.log("Patient Details:", patientDetails);


  const tabs = [
    {
      name: "Cases",
      icon: (
        <svg
          className="w-4 h-4 me-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
        </svg>
      ),
      content: <div className="p-4"><CasesAccordion cases={cases} /></div>,
    },
    {
      name: "Reports",
      icon: (
        <svg
          className="w-4 h-4 me-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M19 3H5a2 2 0 0 0-2 2v14l4-4h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" />
        </svg>
      ),
      content: <div className="p-4"><ReportsTab/></div>,
    },
    {
      name: "Scanning",
      icon: (
        <svg
          className="w-4 h-4 me-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M4 4h16v2H4V4zm0 14h16v2H4v-2zm2-7h12v2H6v-2z" />
        </svg>
      ),
      content: <div className="p-4">🖨️ Scanning content goes here</div>,
    },
    {
      name: "Prescriptions",
      icon: (
        <svg
          className="w-4 h-4 me-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm1 15h-2v-2H9v-2h2V9h2v2h2v2h-2Z" />
        </svg>
      ),
      content: <div className="p-4">💊 Prescriptions content goes here</div>,
    },
    {
      name: "History",
      icon: (
        <svg
          className="w-4 h-4 me-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M13 3a9 9 0 1 0 8.485 6.486l-2.032-.527A7 7 0 1 1 12 5V2.05A9.001 9.001 0 0 0 13 3Zm-1 5v5l4.243 2.536 1.028-1.714L13 11V8h-1Z" />
        </svg>
      ),
      content: <div className="p-4">📜 History content goes here</div>,
    },
  ];

  return loading ? (
    <Loader />
  ) : (
    <div className="grid md:grid-cols-1 gap-6">
      {/* Patient Details */}
      <div className="md:col-span-1">
        <div className="card !bg-blue-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="title">Patient Details</h2>
            <button
              className="btn btn-primary"
              onClick={() => {
                setEditing(null);
                setForm(emptyForm);
                setShowSidebar(true);
              }}
            >
              + Add Case
            </button>
          </div>

          {/* Patient Info Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
            {/* Name */}
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wide">
                Name
              </p>
              <p className="text-gray-900 font-semibold">
                {patientDetails.firstName} {patientDetails.lastName}
              </p>
            </div>

            {/* Gender */}
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wide">
                Gender
              </p>
              <p className="text-gray-900 font-semibold">
                {patientDetails.gender}
              </p>
            </div>

            {/* DOB */}
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wide">
                DOB
              </p>
              <p className="text-gray-900 font-semibold">
                {new Date(patientDetails.dob).toLocaleDateString()}
              </p>
            </div>

            {/* Phone */}
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wide">
                Phone
              </p>
              <p className="text-gray-900 font-semibold">
                {patientDetails.phone}
              </p>
            </div>

            {/* Email */}
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wide">
                Email
              </p>
              <p className="text-gray-900 font-semibold break-words">
                {patientDetails.email}
              </p>
            </div>

            {/* Address */}
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wide">
                Address
              </p>
              <p className="text-gray-900 font-semibold">
                {patientDetails.address}
              </p>
            </div>

            {/* Created At */}
            <div className="sm:col-span-2 lg:col-span-3">
              <p className="text-gray-500 text-xs uppercase tracking-wide">
                Created At :
                <span className="text-gray-500 text-xs pl-2">
                  {new Date(patientDetails.createdAt).toLocaleString()}
                </span>
              </p>
            </div>
          </div>

          {/* Patient Details Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700 mt-5">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500">
              {tabs.map((tab) => (
                <li key={tab.name} className="me-2">
                  <button
                    onClick={() => setActiveTab(tab.name)}
                    className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg group transition ${
                      activeTab === tab.name
                        ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                        : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                    }`}
                  >
                    {tab.icon}
                    {tab.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Content */}
          <div className="shadow-sm rounded-b-lg">
            {tabs.find((tab) => tab.name === activeTab)?.content}
          </div>
        </div>
      </div>

      {/* Sidebar Drawer */}
      {showSidebar && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowSidebar(false)}
          />

          {/* Drawer */}
          <div
            className={`fixed top-0 right-0 h-full w-full sm:w-[500px] bg-white shadow-lg z-50 transform transition-transform duration-300 ${
              showSidebar ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="p-6 h-full flex flex-col">
              <div className="flex patientDetails-center justify-between mb-4">
                <h2 className="title">{editing ? "Edit Case" : "Add Case"}</h2>
                <button
                  className="btn"
                  onClick={() => {
                    setEditing(null);
                    setForm(emptyForm);
                    setShowSidebar(false);
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Form */}
              <form
                onSubmit={(e) => {
                  submit(e);
                  setShowSidebar(false);
                }}
                className="grid gap-3 overflow-y-auto pr-5 pl-2"
              >
                <FormField label="Doctor">
                  <select
                    className="input"
                    value={form.doctor}
                    onChange={(e) =>
                      setForm({ ...form, doctor: e.target.value })
                    }
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

                <FormField label="Title">
                  <input
                    className="input"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    required
                  />
                </FormField>

                <FormField label="Description">
                  <textarea
                    className="input"
                    rows={3}
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
                    rows={3}
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

                <button className="btn btn-primary mt-2">
                  {editing ? "Update" : "Create"}
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
