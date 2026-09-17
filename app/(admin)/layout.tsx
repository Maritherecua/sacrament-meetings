export default function AdminLayout({ children }: LayoutProps<"/meetings">) {
    return <main className="page-shell">{children}</main>;
}