export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-2 border-[var(--border)] border-t-[var(--accent-blue)] animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 rounded-full bg-[var(--accent-blue)] opacity-20 animate-ping" />
        </div>
      </div>
    </div>
  );
}
