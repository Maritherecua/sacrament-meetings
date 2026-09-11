import { getMeeting } from "@/lib/meetings-db";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const meeting = getMeeting(id);
    return meeting ? Response.json(meeting) : Response.json({ error: "Meeting not found" }, { status: 404 });
}