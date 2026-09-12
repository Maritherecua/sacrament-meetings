"use client";

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

  const handlePrint = () => {
    window.print();
  };

  return (
    <article className="detail-sheet space-y-8 print:space-y-4 print:p-0 print:text-black">
      <div className="detail-heading flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between print:flex-row print:items-end print:justify-between">
        <div>
          <p className="eyebrow print:text-gray-600">Oak Street Ward · Sacrament meeting</p>
          <h1 className="print:text-2xl print:font-bold">{meeting.meetingType} meeting</h1>
          <p className="detail-date print:text-sm">
            {date.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        <button
          type="button"
          onClick={handlePrint}
          className="print-link cursor-pointer print:hidden"
        >
          Print agenda ↗
        </button>
      </div>

      <dl className="meeting-facts grid grid-cols-1 gap-5 sm:grid-cols-2 print:grid-cols-2 print:gap-3 print:text-sm">
        <div>
          <dt className="print:font-semibold">Presiding</dt>
          <dd>{meeting.presiding}</dd>
        </div>
        <div>
          <dt className="print:font-semibold">Conducting</dt>
          <dd>{meeting.conducting}</dd>
        </div>
        <div>
          <dt className="print:font-semibold">Opening hymn</dt>
          <dd>{hymnLabel(meeting.openingHymn)}</dd>
        </div>
        <div>
          <dt className="print:font-semibold">Opening prayer</dt>
          <dd>{meeting.openingPrayer}</dd>
        </div>
        <div>
          <dt className="print:font-semibold">Sacrament hymn</dt>
          <dd>{hymnLabel(meeting.sacramentHymn)}</dd>
        </div>
        <div>
          <dt className="print:font-semibold">Closing hymn</dt>
          <dd>{hymnLabel(meeting.closingHymn)}</dd>
        </div>
        <div>
          <dt className="print:font-semibold">Closing prayer</dt>
          <dd>{meeting.closingPrayer}</dd>
        </div>
        <div>
          <dt className="print:font-semibold">Stake business</dt>
          <dd>{meeting.stakeBusiness ? "Included" : "None"}</dd>
        </div>
      </dl>

      <section className="agenda print:break-inside-avoid" aria-labelledby="agenda-heading">
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

      <p className="detail-note print:text-xs print:mt-4">
        Please arrive a few minutes early so we can begin together.
      </p>
    </article>
  );
}