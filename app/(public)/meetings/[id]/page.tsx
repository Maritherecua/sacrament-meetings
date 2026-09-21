import { MeetingDetail } from "@/components/MeetingDetail";
import { getMeetingById } from "@/lib/meetings-db";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function MeetingPage({ params, searchParams }: PageProps<"/meetings/[id]">) {
    const { id } = await params;
    const meetingId = Number(id);

    if (!Number.isInteger(meetingId)) {
        notFound();
    }

    const meeting = await getMeetingById(meetingId);
    if (!meeting) notFound();
    const { print } = await searchParams;
    return <div className={print === "true" ? "print-view content-column" : "content-column"}><MeetingDetail meeting={meeting} /></div>;
}