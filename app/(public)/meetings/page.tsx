import { MeetingCard } from "@/components/MeetingCard";
import { MeetingSearch } from "@/components/MeetingSearch";
import { Pagination } from "@/components/Pagination";
import { getMeetings, getMeetingsTotalPages } from "@/lib/meetings-db";

export const dynamic = "force-dynamic";

export default async function MeetingsPage({ searchParams }: PageProps<"/meetings">) {
    const { query = "", page = "1" } = await searchParams;
    const meetingQuery = typeof query === "string" ? query.trim() : "";
    const currentPage = typeof page === "string" ? Math.max(Number(page) || 1, 1) : 1;
    const [meetings, totalPages] = await Promise.all([
        getMeetings(meetingQuery, currentPage),
        getMeetingsTotalPages(meetingQuery),
    ]);

    return <div className="content-column"><div className="page-intro"><p className="eyebrow">The record</p><h1>Sunday meetings</h1><p>A simple place to find the order of worship, the people serving, and the words we are gathering around.</p></div><MeetingSearch /><div className="meeting-list">{meetings.map((meeting, index) => <MeetingCard key={meeting.id} meeting={meeting} featured={index === 0} />)}</div><Pagination totalPages={totalPages} /></div>;
}