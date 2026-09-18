"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationProps {
    totalPages: number;
}

export function Pagination({ totalPages }: PaginationProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Math.min(Math.max(Number(searchParams.get("page")) || 1, 1), totalPages);

    function pageUrl(page: number): string {
        const params = new URLSearchParams(searchParams.toString());

        if (page === 1) {
            params.delete("page");
        } else {
            params.set("page", String(page));
        }

        const queryString = params.toString();
        return queryString ? `${pathname}?${queryString}` : pathname;
    }

    return <nav className="mt-8 flex items-center justify-between border-t border-[var(--line)] pt-5 text-sm" aria-label="Meetings pagination"><span aria-live="polite" className="font-medium text-[var(--ink)]">Page {currentPage} of {totalPages}</span>{totalPages > 1 ? <div className="flex items-center gap-3">{currentPage > 1 ? <Link className="rounded-sm border border-[var(--coral)] px-3 py-2 font-semibold text-[var(--coral)] transition-colors hover:bg-[var(--coral)] hover:text-[var(--cream)] focus:outline-2 focus:outline-offset-2 focus:outline-[var(--coral)]" href={pageUrl(currentPage - 1)}>Previous</Link> : <span className="cursor-not-allowed rounded-sm border border-[var(--line)] px-3 py-2 text-[var(--muted)]">Previous</span>}{currentPage < totalPages ? <Link className="rounded-sm border border-[var(--coral)] px-3 py-2 font-semibold text-[var(--coral)] transition-colors hover:bg-[var(--coral)] hover:text-[var(--cream)] focus:outline-2 focus:outline-offset-2 focus:outline-[var(--coral)]" href={pageUrl(currentPage + 1)}>Next</Link> : <span className="cursor-not-allowed rounded-sm border border-[var(--line)] px-3 py-2 text-[var(--muted)]">Next</span>}</div> : null}</nav>;
}