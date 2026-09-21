// app/(overview)/loading.tsx
export default function Loading() {
  return (
    <div className="flex items-center justify-center p-8" role="status">
      <p className="text-sm font-medium text-[var(--muted)]">Loading meetings...</p>
    </div>
  );
}