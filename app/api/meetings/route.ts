import { getMeetings } from "@/lib/meetings-db";

export async function GET(request: Request): Promise<Response> {
    const url = new URL(request.url);

    const date = url.searchParams.get("date");
    const search = url.searchParams.get("search") || "";
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return Response.json({ error: "Date must use YYYY-MM-DD format" }, { status: 400 });
    }

    return Response.json(await getMeetings(search, page, date));
}