import { useState } from "react";

export default function HistoryTab() {
  const [history] = useState([
    { date: "2019-05-12", title: "Consulted Dr. Smith", description: "General check-up and blood test." },
    { date: "2020-09-18", title: "Admitted to hospital", description: "Treated for fever and dehydration." },
    { date: "2021-04-05", title: "Scanning done", description: "CT scan of the brain performed." },
    { date: "2021-06-05", title: "Scanning done", description: "CT scan of the brain performed." },
    { date: "2022-11-22", title: "Discharged", description: "Condition stable and sent home." },
    { date: "2023-08-25", title: "Follow-up", description: "Routine consultation with Dr. John." },
  ]);

  return (
    <div className="p-6 bg-blue-50 rounded-lg">
      <h3 className="text-xl font-semibold mb-10 text-center">Patient History</h3>

      <div className="relative max-w-5xl mx-auto">
        {/* Center vertical line */}
        <div
          aria-hidden
          className="absolute left-1/2 top-0 bottom-0 w-[3px] bg-blue-600/90 -translate-x-1/2"
        />

        <ul className="space-y-16">
          {history.map((e, idx) => {
            const isLeft = idx % 2 === 0; // start on LEFT, then alternate
            const year = new Date(e.date).getFullYear();
            const dateStr = new Date(e.date).toLocaleDateString();

            return (
              <li key={idx} className="relative md:min-h-[120px]">
                {/* Dot on the line (line passes through this circle) */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="relative">
                    {/* outer ring */}
                    <span className="block w-6 h-6 rounded-full bg-white border-[5px] border-blue-600 shadow" />
                    {/* tiny center to ensure line 'passes through' visually */}
                    <span className="absolute inset-0 m-auto w-1.5 h-1.5 rounded-full bg-blue-600" />
                  </div>
                </div>

                {/* Year + date next to the dot, aligned toward the card side */}
                <div
                  className={`absolute top-1/2 -translate-y-1/2 text-blue-700 font-semibold text-sm
                    ${!isLeft ? "right-[calc(50%+18px)] text-right" : "left-[calc(50%+18px)]"}`}
                >
                  <div>{year}</div>
                  <div className="text-xs text-gray-500 font-normal">{dateStr}</div>
                </div>

                {/* Two-column layout with the card on alternating sides */}
<div className="md:grid md:grid-cols-2 md:gap-16 items-center">
  {isLeft ? (
    <>
      {/* LEFT card */}
      <div className="md:col-start-1 flex justify-end">
        <article className="bg-white border rounded-xl shadow p-5 max-w-max min-w-[200px] text-right">
          <h4 className="font-semibold text-gray-900">{e.title}</h4>
          <p className="text-gray-600 mt-1 text-sm">{e.description}</p>
        </article>
      </div>
      {/* spacer on right */}
      <div className="md:col-start-2" />
    </>
  ) : (
    <>
      {/* spacer on left */}
      <div className="md:col-start-1" />
      {/* RIGHT card */}
      <div className="md:col-start-2 flex justify-start">
        <article className="bg-white border rounded-xl shadow p-5 max-w-max min-w-[200px]">
          <h4 className="font-semibold text-gray-900">{e.title}</h4>
          <p className="text-gray-600 mt-1 text-sm">{e.description}</p>
        </article>
      </div>
    </>
  )}
</div>

              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
