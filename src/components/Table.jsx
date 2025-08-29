export default function Table({ columns = [], data = [], onEdit, onDelete, onView }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border bg-white rounded-2xl overflow-hidden">
        <thead className="bg-slate-100">
          <tr>
            {columns.map((c) => (
              <th key={c.key} className="text-left px-4 py-2 text-sm font-semibold text-slate-700">{c.title}</th>
            ))}
            {(onEdit || onDelete) && <th className="text-left px-4 py-2 text-sm font-semibold text-slate-700">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row._id} className="border-t">
              {columns.map((c) => (
                <td key={c.key} className="px-4 py-2 text-sm">{c.render ? c.render(row[c.key], row) : row[c.key]}</td>
              ))}
              {(onEdit || onDelete) && (
                <td className="px-4 py-2 text-sm flex gap-2">
                  {onEdit && <button className="btn btn-secondary" onClick={() => onEdit(row)}>Edit</button>}
                  {onDelete && <button className="btn bg-rose-600 text-white" onClick={() => onDelete(row)}>Delete</button>}
                  {onView && <button className="btn btn-primary" onClick={() => onView(row)}>View</button>}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
