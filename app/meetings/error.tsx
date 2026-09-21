// Acts as a React error boundary for the meetings page, any runtime or database errors occurring inside that page folder will be caught and displayed by this component.
"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 text-center" role="alert">
      <h2 className="text-lg font-bold">Something went wrong!</h2>
      <p className="text-sm text-[var(--muted)]">{error.message || "Failed to load data."}</p>
      <div className="flex items-center gap-4">
        <button
          onClick={() => reset()}
          className="rounded border border-[var(--coral)] px-4 py-2 text-sm font-semibold text-[var(--coral)]"
        >
          Try Again
        </button>
        <Link href="/meetings" className="text-link">Back to meetings</Link>
      </div>
    </div>
  );
}
