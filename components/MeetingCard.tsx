import Link from "next/link";
import type { ReactElement } from "react";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingCardProps {
    meeting: SacramentMeeting;
    featured?: boolean;
}

export function MeetingCard({ meeting, featured = false }: MeetingCardProps): ReactElement {
    const date = new Date(`${meeting.date}T12:00:00`);
    return <article className={`meeting-card${featured ? " featured" : ""} grid gap-7 md:grid-cols-[92px_1fr]`}><div className="card-date"><span>{date.toLocaleDateString("en-US", { month: "short" })}</span><strong>{date.getDate()}</strong><span>{date.toLocaleDateString("en-US", { weekday: "short" })}</span></div><div className="card-content"><p className="eyebrow">{featured ? "Next gathering" : "Sacrament meeting"}</p><h2>{meeting.meetingType} meeting</h2><p className="card-meta">Presided by {meeting.presiding} · {meeting.speakers.length} program participants</p><Link className="text-link inline-flex items-center gap-3" href={`/meetings/${meeting.id}`}>View agenda <span aria-hidden="true">→</span></Link></div></article>;
}