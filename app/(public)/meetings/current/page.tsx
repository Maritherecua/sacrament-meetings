import { redirect } from "next/navigation";
import { getMeetings } from "@/lib/meetings-db";

export const dynamic = "force-dynamic";

export default async function CurrentMeetingPage(): Promise<never> {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - dayOfWeek);
    const sundayDate = sunday.toISOString().slice(0, 10);
    const meeting = (await getMeetings("", 1, sundayDate))[0];

    redirect(meeting ? `/meetings/${meeting.id}` : "/meetings");
}