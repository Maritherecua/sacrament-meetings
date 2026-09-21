import { neon } from "@neondatabase/serverless";
import type { MeetingInput, SacramentMeeting } from "@/lib/types";

const MEETING_RETURNING = `
    id,
    to_char(date, 'YYYY-MM-DD') AS date,
    meeting_type AS "meetingType",
    presiding,
    conducting,
    announcements,
    opening_hymn AS "openingHymn",
    opening_prayer AS "openingPrayer",
    ward_business AS "wardBusinessItem",
    stake_business AS "stakeBusiness",
    sacrament_hymn AS "sacramentHymn",
    speakers,
    closing_hymn AS "closingHymn",
    closing_prayer AS "closingPrayer"
`;

const MEETINGS_PER_PAGE = 5;
//Check environment variables first
if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set.");
}

function getSql() {
    const databaseUrl = process.env.DATABASE_URL ?? process.env.DATABASE_URL_UNPOOLED;

    if (!databaseUrl || databaseUrl === "POSTGRES_URL" || databaseUrl === "postgresql://") {
        throw new Error("DATABASE_URL must contain a valid Neon connection string.");
    }

    return neon(databaseUrl);
}

export async function getMeetings(query = "", page = 1, date?: string | null): Promise<SacramentMeeting[]> {
    const sql = getSql();
    const offset = (Math.max(page, 1) - 1) * MEETINGS_PER_PAGE;

    if (date) {
        return (await sql`SELECT ${sql.unsafe(MEETING_RETURNING)} FROM meetings WHERE meetings.date = ${date} ORDER BY meetings.date DESC`) as SacramentMeeting[];
    }

    if (query) {
        return (await sql`SELECT ${sql.unsafe(MEETING_RETURNING)} FROM meetings WHERE to_jsonb(meetings)::text ILIKE ${`%${query}%`} ORDER BY meetings.date DESC LIMIT ${MEETINGS_PER_PAGE} OFFSET ${offset}`) as SacramentMeeting[];
    }

    return (await sql`SELECT ${sql.unsafe(MEETING_RETURNING)} FROM meetings ORDER BY meetings.date DESC LIMIT ${MEETINGS_PER_PAGE} OFFSET ${offset}`) as SacramentMeeting[];
}

export async function getMeetingsTotalPages(query = ""): Promise<number> {
    const sql = getSql();
    const [result] = query
        ? await sql`SELECT COUNT(*)::int AS count FROM meetings WHERE to_jsonb(meetings)::text ILIKE ${`%${query}%`}`
        : await sql`SELECT COUNT(*)::int AS count FROM meetings`;

    return Math.max(1, Math.ceil(Number(result.count) / MEETINGS_PER_PAGE));
}

export async function getMeetingById(id: number): Promise<SacramentMeeting | null> {
    const sql = getSql();
    const meetings = await sql`SELECT ${sql.unsafe(MEETING_RETURNING)} FROM meetings WHERE meetings.id = ${id}` as SacramentMeeting[];
    return meetings[0] ?? null;
}

export async function getCurrentMeeting(): Promise<SacramentMeeting> {
    // Database query execution to find the next upcoming meeting.
    const sql = getSql();
    const today = new Date();
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - today.getDay());
    const [meeting] = await sql`SELECT ${sql.unsafe(MEETING_RETURNING)} FROM meetings WHERE meetings.date >= ${sunday.toISOString().slice(0, 10)} ORDER BY meetings.date ASC LIMIT 1` as SacramentMeeting[];

    if (!meeting) {
        throw new Error("No upcoming meetings are scheduled.");
    }

    return meeting;
}

export async function getMeeting(id: number): Promise<SacramentMeeting | null> {
    return getMeetingById(id);
}

export async function addMeeting(meeting: MeetingInput): Promise<SacramentMeeting> {
    const sql = getSql();
    const [row] = await sql`
        INSERT INTO meetings (
            date, meeting_type, presiding, conducting, announcements,
            opening_hymn, opening_prayer, ward_business, stake_business,
            sacrament_hymn, speakers, closing_hymn, closing_prayer
        ) VALUES (
            ${meeting.date}, ${meeting.meetingType}, ${meeting.presiding}, ${meeting.conducting}, ${meeting.announcements ?? []},
            ${JSON.stringify(meeting.openingHymn)}::jsonb, ${meeting.openingPrayer}, ${JSON.stringify(meeting.wardBusinessItem)}::jsonb, ${meeting.stakeBusiness},
            ${JSON.stringify(meeting.sacramentHymn)}::jsonb, ${JSON.stringify(meeting.speakers)}::jsonb, ${JSON.stringify(meeting.closingHymn)}::jsonb, ${meeting.closingPrayer}
        )
        RETURNING ${sql.unsafe(MEETING_RETURNING)}
    ` as SacramentMeeting[];

    return row;
}

export async function updateMeeting(id: number, meeting: MeetingInput): Promise<SacramentMeeting | null> {
    const sql = getSql();
    const [row] = await sql`
        UPDATE meetings SET
            date = ${meeting.date},
            meeting_type = ${meeting.meetingType},
            presiding = ${meeting.presiding},
            conducting = ${meeting.conducting},
            announcements = ${meeting.announcements ?? []},
            opening_hymn = ${JSON.stringify(meeting.openingHymn)}::jsonb,
            opening_prayer = ${meeting.openingPrayer},
            ward_business = ${JSON.stringify(meeting.wardBusinessItem)}::jsonb,
            stake_business = ${meeting.stakeBusiness},
            sacrament_hymn = ${JSON.stringify(meeting.sacramentHymn)}::jsonb,
            speakers = ${JSON.stringify(meeting.speakers)}::jsonb,
            closing_hymn = ${JSON.stringify(meeting.closingHymn)}::jsonb,
            closing_prayer = ${meeting.closingPrayer}
        WHERE id = ${id}
        RETURNING ${sql.unsafe(MEETING_RETURNING)}
    ` as SacramentMeeting[];

    return row ?? null;
}

export async function deleteMeeting(id: number): Promise<void> {
    const sql = getSql();
    await sql`DELETE FROM meetings WHERE id = ${id}`;
}
