import Link from "next/link";
import type { ReactElement } from "react";
import type { SacramentMeeting } from "@/lib/types";
import { deleteMeeting } from "@/lib/actions";

interface MeetingCardProps {
    meeting: SacramentMeeting;
    featured?: boolean;
}

export function MeetingCard({ meeting, featured = false }: MeetingCardProps): ReactElement {
    const date = new Date(`${meeting.date}T12:00:00`);
    return <article className={`meeting-card${featured ? " featured" : ""} grid gap-7 md:grid-cols-[92px_1fr]`}><div className="card-date"><span>{date.toLocaleDateString("en-US", { month: "short" })}</span><strong>{date.getDate()}</strong><span>{date.toLocaleDateString("en-US", { weekday: "short" })}</span></div><div className="card-content"><p className="eyebrow">{featured ? "Next gathering" : "Sacrament meeting"}</p><h2>{meeting.meetingType} meeting</h2><p className="card-meta">Presided by {meeting.presiding} · {meeting.speakers?.length ?? 0} program participants</p><div className="flex items-center gap-4"><Link className="text-link inline-flex items-center gap-3" href={`/meetings/${meeting.id}`}>View agenda <span aria-hidden="true">→</span></Link><Link className="text-link" href={`/meetings/${meeting.id}/edit`}>Edit</Link><form action={deleteMeeting}><input type="hidden" name="id" value={meeting.id} /><button type="submit" className="text-link">Delete</button></form></div></div></article>;
}