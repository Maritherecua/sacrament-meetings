"use client";

import Link from "next/link";
import type { ReactElement } from "react";
import { usePathname } from "next/navigation";

export function NavLinks(): ReactElement {
  const pathname = usePathname();
  const isCurrentMeeting = pathname === "/meetings/current";
  const isMeetingsSection =
    pathname.startsWith("/meetings") && !isCurrentMeeting;

  return (
    <nav className="nav-links flex gap-5" aria-label="Main navigation">
      <Link className={pathname === "/" ? "active" : ""} href="/">
        Home
      </Link>
      <Link className={isMeetingsSection ? "active" : ""} href="/meetings">
        Meetings
      </Link>
      <Link
        className={isCurrentMeeting ? "active" : ""}
        href="/meetings/current"
      >
        This Sunday
      </Link>
    </nav>
  );
}
