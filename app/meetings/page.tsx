import { MeetingCard } from "@/components/MeetingCard";
import { meetings } from "@/lib/meetings-db";

export default function MeetingsPage() {
    return <div className="content-column"><div className="page-intro"><p className="eyebrow">The record</p><h1>Sunday meetings</h1><p>A simple place to find the order of worship, the people serving, and the words we are gathering around.</p></div><div className="meeting-list">{meetings.map((meeting, index) => <MeetingCard key={meeting.id} meeting={meeting} featured={index === 0} />)}</div></div>;
}