import Link from "next/link";
import type { Meeting } from "@/lib/types";

export function MeetingCard({ meeting, featured = false }: { meeting: Meeting; featured?: boolean }) {
    const date = new Date(`${meeting.date}T12:00:00`);
    return <article className={`meeting-card${featured ? " featured" : ""}`}><div className="card-date"><span>{date.toLocaleDateString("en-US", { month: "short" })}</span><strong>{date.getDate()}</strong><span>{date.toLocaleDateString("en-US", { weekday: "short" })}</span></div><div className="card-content"><p className="eyebrow">{featured ? "Next gathering" : "Sacrament meeting"}</p><h2>{meeting.theme}</h2><p className="card-meta">Presided by {meeting.presiding} · 10:00 AM</p><Link className="text-link" href={`/meetings/${meeting.id}`}>View agenda <span aria-hidden="true">→</span></Link></div></article>;
}