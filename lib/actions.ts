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
    stakeBusiness: z.string().optional().transform((value) => value === "on"),
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
//Define a clear interface for the parsed speaker object
interface SpeakerItem {
    name: string;
    topic?: string;
    type: "speaker";
}
// Speaker lines are entered as "Name | Topic"; topic is optional.
function parseSpeakers(value: string): SpeakerItem[] {
    return parseLines(value).map((line): SpeakerItem => {
        const parts = line.split("|").map((part) => part.trim());
        const name = parts[0] || "";
        const topic = parts[1] || undefined;
        return {name, topic, type: "speaker" };
    
        // const parts = line.split("|").map((part) => part.trim());
        // return { name, topic: topic || undefined, type: "speaker" as const };
    })
    .filter((speaker: SpeakerItem) => speaker.name.length > 0);      
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

export type MeetingFormState = {
    errors?: Partial<Record<string, string[]>>;
    message?: string | null;
};

export async function createMeeting(_prevState: MeetingFormState, formData: FormData): Promise<MeetingFormState> {
    const parsed = MeetingFormSchema.safeParse(Object.fromEntries(formData));

    if (!parsed.success) {
        const fieldErrors: Record<string, string[]> = {};
        for (const issue of parsed.error.issues) {
            const field = issue.path[0]?.toString();
            if (field) {
                if (!fieldErrors[field]) {
                    fieldErrors[field] = [];
                }
                fieldErrors[field].push(issue.message);
            }
        }
        return {
            //errors: z.flattenError(parsed.error).fieldErrors,
            errors: fieldErrors,
            message: "Please fix the errors below and try again.",
        };
    }

    try {
        await addMeeting(toMeetingInput(parsed.data));
    } catch (error) {
        console.error("Failed to create meeting:", error);
        return { message: "Something went wrong while creating the meeting. Please try again." };
    }

    revalidatePath("/meetings", "layout");
    redirect("/meetings");
}

export async function updateMeeting(id: number, _prevState: MeetingFormState, formData: FormData): Promise<MeetingFormState> {
    const parsed = MeetingFormSchema.safeParse(Object.fromEntries(formData));

    if (!parsed.success) {
        const fieldErrors: Record<string, string[]> = {};
        for (const issue of parsed.error.issues) {
            const field = issue.path[0]?.toString();
            if (field) {
                if (!fieldErrors[field]) {
                    fieldErrors[field] = [];
                }
                fieldErrors[field].push(issue.message);
            }
        }
        return {
            errors: fieldErrors,
            message: "Please fix the errors below and try again.",
        };
    }

    try {
        await updateMeetingRow(id, toMeetingInput(parsed.data));
    } catch (error) {
        console.error(`Failed to update meeting ${id}:`, error);
        return { message: "Something went wrong while updating the meeting. Please try again." };
    }

    revalidatePath("/meetings", "layout");
    redirect("/meetings");
}

export async function deleteMeeting(formData: FormData): Promise<void> {
    const id = Number(formData.get("id"));

    if (!Number.isInteger(id)) {
        throw new Error("Meeting ID must be a number.");
    }

    try {
        await deleteMeetingRow(id);
    } catch (error) {
        console.error(`Failed to delete meeting ${id}:`, error);
        throw new Error("Something went wrong while deleting the meeting. Please try again.");
    }

    revalidatePath("/meetings", "layout");
}
