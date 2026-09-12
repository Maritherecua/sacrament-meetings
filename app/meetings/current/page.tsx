import { redirect } from "next/navigation";
import { getMeetings } from "@/lib/meetings-db";

export default function CurrentMeetingPage(): never {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - dayOfWeek);
  const sundayDate = sunday.toISOString().slice(0, 10);
  const meeting = getMeetings(sundayDate)[0];

  redirect(meeting ? `/meetings/${meeting.id}` : "/meetings");
}
