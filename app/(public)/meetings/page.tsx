import { MeetingCard } from "@/components/MeetingCard";
import { MeetingSearch } from "@/components/MeetingSearch";
import { getMeetings } from "@/lib/meetings-db";

export const dynamic = "force-dynamic";

export default async function MeetingsPage({ searchParams }: PageProps<"/meetings">) {
    const { query = "" } = await searchParams;
    const normalizedQuery = typeof query === "string" ? query.trim().toLowerCase() : "";
    const meetings = await getMeetings();
    const filteredMeetings = normalizedQuery ? meetings.filter((meeting) => [meeting.meetingType, meeting.presiding, meeting.conducting, ...meeting.speakers.flatMap((speaker) => [speaker.name, speaker.topic ?? ""])].some((value) => value.toLowerCase().includes(normalizedQuery))) : meetings;

    return <div className="content-column"><div className="page-intro"><p className="eyebrow">The record</p><h1>Sunday meetings</h1><p>A simple place to find the order of worship, the people serving, and the words we are gathering around.</p></div><MeetingSearch /><div className="meeting-list">{filteredMeetings.map((meeting, index) => <MeetingCard key={meeting.id} meeting={meeting} featured={index === 0} />)}</div></div>;
}