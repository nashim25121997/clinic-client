import { useState } from "react";
import { FaCalendarPlus } from "react-icons/fa";

export default function ScanningTab() {
  // Sample Scanning Reports
  const [scans, setScans] = useState([
    {
      id: 1,
      type: "X-Ray",
      title: "Chest X-Ray",
      date: "2025-08-20",
      time: "10:30 AM",
      description: "Routine checkup",
    },
    {
      id: 2,
      type: "CT Scan",
      title: "CT Scan - Brain",
      date: "2025-08-15",
      time: "02:00 PM",
      description: "Headache diagnosis",
    },
  ]);

  // Popup state
  const [showPopup, setShowPopup] = useState(false);
  const [scanType, setScanType] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [desc, setDesc] = useState("");

  const handleBook = () => {
    const newScan = {
      id: scans.length + 1,
      type: scanType,
      title: `${scanType} Report`,
      date,
      time,
      description: desc,
    };
    setScans([...scans, newScan]);

    setShowPopup(false);
    setScanType("");
    setDate("");
    setTime("");
    setDesc("");
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Scanning Reports</h3>
        <button
          onClick={() => setShowPopup(true)}
          className="btn btn-primary flex items-center gap-2"
        >
          <FaCalendarPlus /> Book Scanning Appointment
        </button>
      </div>

      {/* Modern "card row" style instead of table */}
      <div className="space-y-3">
        {scans.map((scan) => (
          <div
            key={scan.id}
            className="bg-white shadow rounded-lg p-4 border hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold text-blue-700">{scan.title}</h4>
              <span className="text-xs text-gray-500">
                {scan.date} • {scan.time}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="font-medium text-gray-500">Scan Type</p>
                <p>{scan.type}</p>
              </div>
              <div>
                <p className="font-medium text-gray-500">Date</p>
                <p>{scan.date}</p>
              </div>
              <div>
                <p className="font-medium text-gray-500">Time</p>
                <p>{scan.time}</p>
              </div>
              <div>
                <p className="font-medium text-gray-500">Description</p>
                <p>{scan.description || "—"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Appointment Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 !mt-0">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">
              Book Scanning Appointment
            </h2>

            {/* Scan Type */}
            <label className="block text-sm font-medium mb-1">Select Scan</label>
            <select
              value={scanType}
              onChange={(e) => setScanType(e.target.value)}
              className="input w-full mb-3 border rounded px-3 py-2"
            >
              <option value="">-- Select Scan --</option>
              <option value="MRI">MRI</option>
              <option value="CT Scan">CT Scan</option>
              <option value="X-Ray">X-Ray</option>
              <option value="Ultrasound">Ultrasound</option>
            </select>

            {/* Date */}
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input w-full mb-3 border rounded px-3 py-2"
            />

            {/* Time */}
            <label className="block text-sm font-medium mb-1">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="input w-full mb-3 border rounded px-3 py-2"
            />

            {/* Description */}
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="input w-full mb-4 border rounded px-3 py-2"
              rows={3}
              placeholder="Enter description or notes"
            />

            {/* Actions */}
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 border rounded"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={handleBook}
                disabled={!scanType || !date || !time}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
