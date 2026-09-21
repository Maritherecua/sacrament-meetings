import { getMeetings } from "@/lib/meetings-db";

export async function GET(request: Request): Promise<Response> {
    const date = new URL(request.url).searchParams.get("date");

    if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return Response.json({ error: "Date must use YYYY-MM-DD format" }, { status: 400 });
    }

    return Response.json(await getMeetings("", 1, date));
}