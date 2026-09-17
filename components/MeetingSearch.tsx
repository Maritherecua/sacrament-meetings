"use client";

import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function MeetingSearch() {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const urlQuery = searchParams.get("query") ?? "";

    const updateQuery = useDebouncedCallback((value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value) {
            params.set("query", value);
        } else {
            params.delete("query");
        }

        params.delete("page");

        const queryString = params.toString();
        router.push(queryString ? `${pathname}?${queryString}` : pathname);
    }, 300);

    return <div className="meeting-search"><label htmlFor="meeting-search">Search meetings</label><input aria-label="Search meetings" defaultValue={urlQuery} id="meeting-search" type="search" onChange={(event) => updateQuery(event.target.value.trim())} placeholder="Search people or meeting type" /></div>;
}