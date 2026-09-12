import { MeetingDetail } from "@/components/MeetingDetail";
import { getMeeting } from "@/lib/meetings-db";
import { notFound } from "next/navigation";

export default async function MeetingPage({ params, searchParams }: PageProps<"/meetings/[id]">) {
    const { id } = await params;
    const meeting = getMeeting(Number(id));
    if (!meeting) notFound();
    const { print } = await searchParams;
    return <div className={print === "true" ? "print-view content-column" : "content-column"}><MeetingDetail meeting={meeting} /></div>;
}