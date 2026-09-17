import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
    return <main className="page-shell">{children}</main>;
}