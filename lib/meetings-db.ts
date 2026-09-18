import { neon } from "@neondatabase/serverless";
import type { SacramentMeeting } from "@/lib/types";

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
        return (await sql`SELECT meetings.*, to_char(meetings.date, 'YYYY-MM-DD') AS date FROM meetings WHERE meetings.date = ${date} ORDER BY meetings.date DESC`) as SacramentMeeting[];
    }

    if (query) {
        return (await sql`SELECT meetings.*, to_char(meetings.date, 'YYYY-MM-DD') AS date FROM meetings WHERE to_jsonb(meetings)::text ILIKE ${`%${query}%`} ORDER BY meetings.date DESC LIMIT ${MEETINGS_PER_PAGE} OFFSET ${offset}`) as SacramentMeeting[];
    }

    return (await sql`SELECT meetings.*, to_char(meetings.date, 'YYYY-MM-DD') AS date FROM meetings ORDER BY meetings.date DESC LIMIT ${MEETINGS_PER_PAGE} OFFSET ${offset}`) as SacramentMeeting[];
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
    const meetings = await sql`SELECT meetings.*, to_char(meetings.date, 'YYYY-MM-DD') AS date FROM meetings WHERE meetings.id = ${id}` as SacramentMeeting[];
    return meetings[0] ?? null;
}

export async function getCurrentMeeting(): Promise<SacramentMeeting> {
    // Database query execution to find the next upcoming meeting.
    const sql = getSql();
    const today = new Date();
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - today.getDay());
    const [meeting] = await sql`SELECT meetings.*, to_char(meetings.date, 'YYYY-MM-DD') AS date FROM meetings WHERE meetings.date >= ${sunday.toISOString().slice(0, 10)} ORDER BY meetings.date ASC LIMIT 1` as SacramentMeeting[];

    if (!meeting) {
        throw new Error("No upcoming meetings are scheduled.");
    }

    return meeting;
}

export async function getMeeting(id: number): Promise<SacramentMeeting | null> {
    return getMeetingById(id);
}

export async function addMeeting(_meeting: SacramentMeeting): Promise<SacramentMeeting> {
    void _meeting;
    throw new Error("Adding meetings will be implemented with the Week 04 forms.");
}

export async function updateMeeting(_id: number, _meeting: SacramentMeeting): Promise<SacramentMeeting | null> {
    void _id;
    void _meeting;
    throw new Error("Updating meetings will be implemented with the Week 04 forms.");
}

export async function deleteMeeting(_id: number): Promise<void> {
    void _id;
    throw new Error("Deleting meetings will be implemented with the Week 04 forms.");
}