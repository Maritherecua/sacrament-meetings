import { meetings } from "@/lib/meetings-db";

export function GET() {
    return Response.json(meetings);
}