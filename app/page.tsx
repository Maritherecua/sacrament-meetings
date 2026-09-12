import Link from "next/link";
import Image from "next/image";
import { MeetingCard } from "@/components/MeetingCard";
import { getCurrentMeeting } from "@/lib/meetings-db";

export default function Home() {
    const meeting = getCurrentMeeting();

    return <main className="home-main"><section className="home-hero"><div><p className="eyebrow">A shared Sunday rhythm</p><h1>Make room<br />for one another.</h1><p className="hero-copy">The Oak Street Ward meeting record, kept simple so you can arrive present and ready.</p><Link className="primary-link" href={`/meetings/${meeting.id}`}>See this Sunday <span aria-hidden="true">→</span></Link></div><Image className="hero-image" src="/window.svg" alt="Window illustration for the meeting record" width={320} height={320} priority /></section><section className="home-feature"><MeetingCard meeting={meeting} featured /><div className="home-aside"><p className="eyebrow">A little context</p><p>Every meeting is a chance to listen closely, sing together, and leave with something to carry home.</p><Link className="text-link" href="/meetings">Browse the record <span aria-hidden="true">→</span></Link></div></section></main>;
}
