export function FormField({ label, children }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="label">{label}</span>
      {children}
    </label>
  );
}

export function Card({ title, children, actions }) {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="title">{title}</h2>
        {actions}
      </div>
      {children}
    </div>
  );
}
