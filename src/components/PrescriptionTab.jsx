import { useState } from "react";
import { FaUserMd, FaCalendarAlt, FaPills } from "react-icons/fa";

export default function PrescriptionsTab() {
  const [prescriptions, setPrescriptions] = useState([
    {
      id: 1,
      date: "2025-08-20",
      doctor: "Dr. John Doe",
      medicines: [
        "Paracetamol 500mg – 1 tablet after meals",
        "Amoxicillin 250mg – 1 capsule every 8 hrs",
        "Vitamin D3 – once daily",
      ],
    },
    {
      id: 2,
      date: "2025-08-15",
      doctor: "Dr. Sarah Lee",
      medicines: [
        "Ibuprofen 400mg – 1 tablet for pain",
        "Omeprazole 20mg – before breakfast",
      ],
    },
  ]);

  return (
    <div className="p-4 space-y-6">
      <h3 className="text-lg font-semibold mb-4">Prescription Records</h3>

      <div className="space-y-6">
        {prescriptions.map((presc) => (
          <div
            key={presc.id}
            className="bg-white shadow-md rounded-lg p-6 border relative overflow-hidden"
            style={{
              backgroundImage:
                "repeating-linear-gradient(white, white 24px, #f9fafb 25px)",
            }}
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <div className="flex items-center gap-2 text-blue-700 font-medium">
                <FaUserMd /> {presc.doctor}
              </div>
              <div className="flex items-center gap-1 text-gray-500 text-sm">
                <FaCalendarAlt /> {new Date(presc.date).toLocaleDateString()}
              </div>
            </div>

            {/* Medicines */}
            <div>
              <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FaPills className="text-green-600" /> Prescribed Medicines
              </h4>
              <ul className="list-disc pl-6 space-y-1 text-gray-800">
                {presc.medicines.map((med, i) => (
                  <li key={i}>{med}</li>
                ))}
              </ul>
            </div>

            {/* Footer Signature Line */}
            <div className="mt-6 flex justify-end">
              <div className="text-right">
                <p className="text-gray-400 italic text-sm">
                  ______________________
                </p>
                <p className="text-gray-600 text-sm">Doctor’s Signature</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
