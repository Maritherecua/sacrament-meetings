"use client";

import Link from "next/link";
import type { ReactElement } from "react";
import { usePathname } from "next/navigation";

export function NavLinks(): ReactElement {
    const pathname = usePathname();
    return <nav className="nav-links flex gap-5" aria-label="Main navigation"><Link className={pathname === "/" ? "active" : ""} href="/">Home</Link><Link className={pathname.startsWith("/meetings") ? "active" : ""} href="/meetings">Meetings</Link><Link href="/meetings/current">This Sunday</Link></nav>;
}