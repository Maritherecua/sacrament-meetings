import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function MeetingsLayout({ children }: LayoutProps<"/meetings">) {
    return <><Header /><main className="page-shell">{children}</main><Footer /></>;
}