import Link from "next/link";
import { NavLinks } from "./NavLinks";

export function Header() {
    const formattedDate = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric" }).format(new Date());
    return <header className="site-header"><div className="header-inner"><Link className="brand" href="/"><span className="brand-mark" aria-hidden="true">SM</span><span><strong>Oak Street Ward</strong><small>Sacrament meetings</small></span></Link><div className="header-meta"><span>{formattedDate}</span><NavLinks /></div></div></header>;
}