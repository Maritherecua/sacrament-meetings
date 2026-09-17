import { neon } from "@neondatabase/serverless";
import type { SacramentMeeting } from "./types";

function getSql() {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl || databaseUrl === "POSTGRES_URL") {
        throw new Error("DATABASE_URL must contain a valid Neon connection string.");
    }

    return neon(databaseUrl);
}

export async function getMeetings(date?: string | null): Promise<SacramentMeeting[]> {
    const sql = getSql();

    if (date) {
        return (await sql`SELECT * FROM meetings WHERE date = ${date} ORDER BY date DESC`) as SacramentMeeting[];
    }

    return (await sql`SELECT * FROM meetings ORDER BY date DESC`) as SacramentMeeting[];
}

export async function getMeetingById(id: number): Promise<SacramentMeeting | null> {
    const sql = getSql();
    const [meeting] = await sql`SELECT * FROM meetings WHERE id = ${id}` as SacramentMeeting[];
    return meeting ?? null;
}

export async function getCurrentMeeting(): Promise<SacramentMeeting> {
    const today = new Date();
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - today.getDay());
    const [meeting] = await getMeetings(sunday.toISOString().slice(0, 10));

    if (!meeting) {
        throw new Error("No meeting is scheduled for this Sunday.");
    }

    return meeting;
}

export async function getMeeting(id: number): Promise<SacramentMeeting | null> {
    return getMeetingById(id);
}

export async function addMeeting(_meeting: SacramentMeeting): Promise<SacramentMeeting> {
    throw new Error("Adding meetings will be implemented with the Week 04 forms.");
}

export async function updateMeeting(_id: number, _meeting: SacramentMeeting): Promise<SacramentMeeting | null> {
    throw new Error("Updating meetings will be implemented with the Week 04 forms.");
}

export async function deleteMeeting(_id: number): Promise<void> {
    throw new Error("Deleting meetings will be implemented with the Week 04 forms.");
}