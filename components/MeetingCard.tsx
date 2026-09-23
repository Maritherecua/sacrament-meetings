import Link from "next/link";
import type { ReactElement } from "react";
import type { SacramentMeeting } from "@/lib/types";
import { deleteMeeting } from "@/lib/actions";

interface MeetingCardProps {
    meeting: SacramentMeeting;
    featured?: boolean;
}

export function MeetingCard({ meeting, featured = false }: MeetingCardProps): ReactElement {
    const date = new Date(`${meeting.date}T00:00:00Z`);
    const month = date.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" });
    const day = date.getDate();
    const weekday = date.toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" });
    return (
        <article className={`meeting-card${featured ? " featured" : ""} grid gap-7 md:grid-cols-[92px_1fr]`}>
            <div className="card-date">
                <span>{month}</span>
                <strong>{day}</strong>
                <span>{weekday}</span>
            </div>
            <div className="card-content">
                <p className="eyebrow">{featured ? "Next gathering" : "Sacrament meeting"}</p>
                <h2>{meeting.meetingType} meeting</h2>
                <p className="card-meta">
                    Presided by {meeting.presiding} · {meeting.speakers?.length ?? 0} program participants
                </p>
                <div className="flex items-center gap-4">
                    <Link className="text-link inline-flex items-center gap-3" href={`/meetings/${meeting.id}`}>
                        View agenda <span aria-hidden="true">→</span>
                    </Link>
                    <Link
                        className="text-link"
                        href={`/meetings/${meeting.id}/edit`}
                        aria-label={`Edit ${meeting.meetingType} meeting on ${meeting.date}`}
                    >
                        Edit
                    </Link>
                    <form action={deleteMeeting}>
                        <input type="hidden" name="id" value={meeting.id} />
                        <button
                            type="submit"
                            className="text-link"
                            aria-label={`Delete ${meeting.meetingType} meeting on ${meeting.date}`}
                        >
                            Delete
                        </button>
                    </form>
                </div>
            </div>
        </article>
    );
}