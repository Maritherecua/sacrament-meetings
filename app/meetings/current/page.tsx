import { redirect } from "next/navigation";
import { getCurrentMeeting } from "@/lib/meetings-db";

export default function CurrentMeetingPage() {
    redirect(`/meetings/${getCurrentMeeting().id}`);
}