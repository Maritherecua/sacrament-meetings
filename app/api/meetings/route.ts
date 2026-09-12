import { meetings } from "@/lib/meetings-db";

export function GET(): Response {
    return Response.json(meetings);
}