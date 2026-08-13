export default function StatusChip({ tone, children }) {
  return (
    <span className="status-chip" data-tone={tone}>
      <span className="status-dot" aria-hidden="true" />
      {children}
    </span>
  );
}
