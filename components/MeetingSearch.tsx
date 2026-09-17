"use client";

import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function MeetingSearch() {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const urlQuery = searchParams.get("query") ?? "";
    const [query, setQuery] = useState(urlQuery);

    useEffect(() => {
        setQuery(urlQuery);
    }, [urlQuery]);

    const updateQuery = useDebouncedCallback((value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value) {
            params.set("query", value);
        } else {
            params.delete("query");
        }

        const queryString = params.toString();
        router.replace(queryString ? `${pathname}?${queryString}` : pathname);
    }, 300);

    return <div className="meeting-search"><label htmlFor="meeting-search">Search meetings</label><input id="meeting-search" type="search" value={query} onChange={(event) => { const value = event.target.value; setQuery(value); updateQuery(value.trim()); }} placeholder="Search people or meeting type" /></div>;
}