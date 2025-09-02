import { useState } from "react";
import { FaUserMd } from "react-icons/fa"; // doctor icon

export default function CasesAccordion({ cases }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="divide-y divide-gray-200">
      {cases.map((caseItem, index) => (
        <div key={index} className="border rounded-lg mb-3 shadow-sm">
          {/* Accordion Header */}
          <button
            className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 rounded-t-lg transition"
            onClick={() => toggleAccordion(index)}
          >
            <div className="flex flex-col items-start">
              <span className="font-semibold text-gray-800">
                {caseItem?.title || "Untitled Case"}
              </span>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <FaUserMd className="mr-1 text-blue-500" />
                Dr. {caseItem?.doctor?.name} - {caseItem?.doctor?.specialty || "General"}
              </div>
            </div>
            <div className="text-xs text-gray-500 ml-2">
              {new Date(caseItem.createdAt).toLocaleDateString()}
            </div>
          </button>

          {/* Accordion Content */}
          {openIndex === index && (
            <div className="p-4 bg-white">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-blue-100 text-gray-700">
                    <tr>
                      <th className="px-4 py-2 text-left font-semibold">
                        Description
                      </th>
                      <th className="px-4 py-2 text-left font-semibold">
                        Diagnosis
                      </th>
                      <th className="px-4 py-2 text-left font-semibold">
                        Prescriptions
                      </th>
                      <th className="px-4 py-2 text-left font-semibold">
                        Follow Up Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      {/* Description */}
                      <td className="px-4 py-3 align-top">
                        {caseItem.description || "—"}
                      </td>

                      {/* Diagnosis */}
                      <td className="px-4 py-3 align-top">
                        {caseItem.diagnosis || "—"}
                      </td>

                      {/* Prescriptions */}
                      <td className="px-4 py-3 align-top">
                        {caseItem.prescriptions ? (
                          <ul className="list-disc list-inside space-y-1">
                            {caseItem.prescriptions.split(",").map((p, idx) => (
                              <li key={idx}>{p.trim()}</li>
                            ))}
                          </ul>
                        ) : (
                          "—"
                        )}
                      </td>

                      {/* Follow Up Date */}
                      <td className="px-4 py-3 align-top">
                        {caseItem.followUpDate
                          ? new Date(caseItem.followUpDate).toLocaleDateString()
                          : "—"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
