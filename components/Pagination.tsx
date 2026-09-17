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

    return <nav className="mt-8 flex items-center justify-between border-t border-[var(--line)] pt-5 text-sm" aria-label="Meetings pagination"><span className="text-[var(--muted)]">Page {currentPage} of {totalPages}</span>{totalPages > 1 ? <div className="flex items-center gap-4">{currentPage > 1 ? <Link className="text-[var(--coral)] underline underline-offset-4" href={pageUrl(currentPage - 1)}>Previous</Link> : <span className="text-[var(--muted)]">Previous</span>}{currentPage < totalPages ? <Link className="text-[var(--coral)] underline underline-offset-4" href={pageUrl(currentPage + 1)}>Next</Link> : <span className="text-[var(--muted)]">Next</span>}</div> : null}</nav>;
}