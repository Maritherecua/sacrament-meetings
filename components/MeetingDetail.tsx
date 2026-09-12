import Link from "next/link";
import type { ReactElement } from "react";
import type {
  Hymn,
  SacramentMeeting,
  SpeakerItem,
  WardBusinessItem,
} from "@/lib/types";

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

function hymnLabel(hymn: Hymn): string {
  return `#${hymn.number} · ${hymn.title}`;
}

function participantLabel(item: SpeakerItem): string {
  return item.topic ? `${item.name} · ${item.topic}` : item.name;
}

function businessLabel(item: WardBusinessItem): string {
  return item.description;
}

export function MeetingDetail({ meeting }: MeetingDetailProps): ReactElement {
  const date = new Date(`${meeting.date}T12:00:00`);
  return (
    <article className="detail-sheet space-y-8">
      <div className="detail-heading flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">Oak Street Ward · Sacrament meeting</p>
          <h1>{meeting.meetingType} meeting</h1>
          <p className="detail-date">
            {date.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        <Link
          className="print-link"
          href={`/meetings/${meeting.id}?print=true`}
          target="_blank"
        >
          Print agenda ↗
        </Link>
      </div>
      <dl className="meeting-facts grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <dt>Presiding</dt>
          <dd>{meeting.presiding}</dd>
        </div>
        <div>
          <dt>Conducting</dt>
          <dd>{meeting.conducting}</dd>
        </div>
        <div>
          <dt>Opening hymn</dt>
          <dd>{hymnLabel(meeting.openingHymn)}</dd>
        </div>
        <div>
          <dt>Opening prayer</dt>
          <dd>{meeting.openingPrayer}</dd>
        </div>
        <div>
          <dt>Sacrament hymn</dt>
          <dd>{hymnLabel(meeting.sacramentHymn)}</dd>
        </div>
        <div>
          <dt>Closing hymn</dt>
          <dd>{hymnLabel(meeting.closingHymn)}</dd>
        </div>
        <div>
          <dt>Closing prayer</dt>
          <dd>{meeting.closingPrayer}</dd>
        </div>
        <div>
          <dt>Stake business</dt>
          <dd>{meeting.stakeBusiness ? "Included" : "None"}</dd>
        </div>
      </dl>
      <section className="agenda" aria-labelledby="agenda-heading">
        <div className="agenda-header">
          <span id="agenda-heading">Agenda</span>
          <span>Program</span>
        </div>
        {meeting.announcements?.map((announcement: string) => (
          <div className="agenda-row" key={`announcement-${announcement}`}>
            <strong>Announcement</strong>
            <span>{announcement}</span>
          </div>
        ))}
        {meeting.wardBusinessItem.map((item: WardBusinessItem) => (
          <div className="agenda-row" key={`business-${item.description}`}>
            <strong>Ward business</strong>
            <span>{businessLabel(item)}</span>
          </div>
        ))}
        {meeting.speakers.map((speaker: SpeakerItem) => (
          <div className="agenda-row" key={`${speaker.type}-${speaker.name}`}>
            <strong>
              {speaker.type === "musical-number" ? "Musical number" : "Speaker"}
            </strong>
            <span>{participantLabel(speaker)}</span>
          </div>
        ))}
        {meeting.intermediateHymn && (
          <div className="agenda-row">
            <strong>Intermediate hymn</strong>
            <span>{hymnLabel(meeting.intermediateHymn)}</span>
          </div>
        )}
      </section>
      <p className="detail-note">
        Please arrive a few minutes early so we can begin together.
      </p>
    </article>
  );
}
