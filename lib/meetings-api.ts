import { headers } from "next/headers";
import type { SacramentMeeting } from "./types";

async function apiUrl(path: string): Promise<string> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "http";
  return `${protocol}://${host}${path}`;
}

export async function fetchMeetings(
  date?: string
): Promise<SacramentMeeting[]> {
  const query = date ? `?date=${encodeURIComponent(date)}` : "";
  const response = await fetch(await apiUrl(`/api/meetings${query}`), {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Unable to load meetings: ${response.status}`);
  }

  return response.json() as Promise<SacramentMeeting[]>;
}

export async function fetchMeeting(
  id: string
): Promise<SacramentMeeting | null> {
  const response = await fetch(
    await apiUrl(`/api/meetings/${encodeURIComponent(id)}`),
    { cache: "no-store" }
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Unable to load meeting: ${response.status}`);
  }

  return response.json() as Promise<SacramentMeeting>;
}
