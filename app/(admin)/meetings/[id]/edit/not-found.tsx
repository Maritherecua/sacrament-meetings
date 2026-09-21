import Link from "next/link";

export default function NotFound() {
    return (
        <div className="content-column flex flex-col items-center justify-center gap-4 p-8 text-center">
            <h1 className="text-lg font-bold">Meeting not found</h1>
            <p className="text-sm text-[var(--muted)]">We couldn&rsquo;t find a meeting with that ID. It may have been deleted or never existed.</p>
            <Link href="/meetings" className="text-link">Back to meetings</Link>
        </div>
    );
}
