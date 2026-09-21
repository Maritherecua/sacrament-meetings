"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addMeeting, deleteMeeting as deleteMeetingRow, updateMeeting as updateMeetingRow } from "@/lib/meetings-db";
import type { MeetingInput } from "@/lib/types";

const MeetingFormSchema = z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Enter a date in YYYY-MM-DD format."),
    meetingType: z.enum(["testimony", "regular", "stake", "general"]),
    presiding: z.string().trim().min(1, "Presiding is required."),
    conducting: z.string().trim().min(1, "Conducting is required."),
    openingPrayer: z.string().trim().min(1, "Opening prayer is required."),
    closingPrayer: z.string().trim().min(1, "Closing prayer is required."),
    stakeBusiness: z.optional(z.string()).transform((value) => value === "on"),
    openingHymnNumber: z.coerce.number().int().positive("Enter a valid hymn number."),
    openingHymnTitle: z.string().trim().min(1, "Opening hymn title is required."),
    sacramentHymnNumber: z.coerce.number().int().positive("Enter a valid hymn number."),
    sacramentHymnTitle: z.string().trim().min(1, "Sacrament hymn title is required."),
    closingHymnNumber: z.coerce.number().int().positive("Enter a valid hymn number."),
    closingHymnTitle: z.string().trim().min(1, "Closing hymn title is required."),
    announcements: z.string().optional().default(""),
    wardBusinessItem: z.string().optional().default(""),
    speakers: z.string().optional().default(""),
});

// Splits a textarea's lines into a clean array, dropping blanks.
function parseLines(value: string): string[] {
    return value.split("\n").map((line) => line.trim()).filter(Boolean);
}

// Speaker lines are entered as "Name | Topic"; topic is optional.
function parseSpeakers(value: string) {
    return parseLines(value).map((line) => {
        const [name, topic] = line.split("|").map((part) => part.trim());
        return { name, topic: topic || undefined, type: "speaker" as const };
    });
}

function toMeetingInput(data: z.infer<typeof MeetingFormSchema>): MeetingInput {
    return {
        date: data.date,
        meetingType: data.meetingType,
        presiding: data.presiding,
        conducting: data.conducting,
        announcements: parseLines(data.announcements),
        openingHymn: { number: data.openingHymnNumber, title: data.openingHymnTitle },
        openingPrayer: data.openingPrayer,
        wardBusinessItem: parseLines(data.wardBusinessItem).map((description) => ({ description })),
        stakeBusiness: data.stakeBusiness,
        sacramentHymn: { number: data.sacramentHymnNumber, title: data.sacramentHymnTitle },
        speakers: parseSpeakers(data.speakers),
        closingHymn: { number: data.closingHymnNumber, title: data.closingHymnTitle },
        closingPrayer: data.closingPrayer,
    };
}

export async function createMeeting(formData: FormData): Promise<void> {
    const parsed = MeetingFormSchema.safeParse(Object.fromEntries(formData));

    if (!parsed.success) {
        throw new Error(z.prettifyError(parsed.error));
    }

    await addMeeting(toMeetingInput(parsed.data));

    revalidatePath("/meetings");
    redirect("/meetings");
}

export async function updateMeeting(id: number, formData: FormData): Promise<void> {
    const parsed = MeetingFormSchema.safeParse(Object.fromEntries(formData));

    if (!parsed.success) {
        throw new Error(z.prettifyError(parsed.error));
    }

    await updateMeetingRow(id, toMeetingInput(parsed.data));

    revalidatePath("/meetings");
    redirect("/meetings");
}

export async function deleteMeeting(formData: FormData): Promise<void> {
    const id = Number(formData.get("id"));

    if (!Number.isInteger(id)) {
        throw new Error("Meeting ID must be a number.");
    }

    await deleteMeetingRow(id);

    revalidatePath("/meetings");
}
