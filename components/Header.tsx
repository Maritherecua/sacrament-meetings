import Link from "next/link";
import type { ReactElement } from "react";
import { NavLinks } from "./NavLinks";

export function Header(): ReactElement {
    const formattedDate = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric" }).format(new Date());
    return <header className="site-header"><div className="header-inner flex items-center justify-between gap-6"><Link className="brand inline-flex items-center gap-3" href="/"><span className="brand-mark" aria-hidden="true">SM</span><span><strong>Bella Vista Ward</strong><small>Sacrament meetings</small></span></Link><div className="header-meta flex items-center gap-8"><span>{formattedDate}</span><NavLinks /></div></div></header>;
}