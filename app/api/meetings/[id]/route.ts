import { getMeetingById } from "@/lib/meetings-db";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<Response> {
  const { id: idParam } = await params;
  const id = Number(idParam);

  if (!idParam || !Number.isInteger(id)) {
    return Response.json(
      { error: "Meeting ID must be a number" },
      { status: 400 },
    );
  }

  const meeting = getMeetingById(id);
  return meeting
    ? Response.json(meeting)
    : Response.json({ error: "Meeting not found" }, { status: 404 });
}
