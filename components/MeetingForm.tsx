import type { ReactElement } from "react";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingFormProps {
    action: (formData: FormData) => void | Promise<void>;
    submitLabel: string;
    meeting?: SacramentMeeting;
}

function speakersToLines(speakers: SacramentMeeting["speakers"] | undefined): string {
    return (speakers ?? []).map((speaker) => (speaker.topic ? `${speaker.name} | ${speaker.topic}` : speaker.name)).join("\n");
}

export function MeetingForm({ action, submitLabel, meeting }: MeetingFormProps): ReactElement {
    return (
        <form action={action} className="grid gap-6 max-w-2xl">
            <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
                <label className="grid gap-1">
                    <span className="eyebrow">Date</span>
                    <input type="date" name="date" defaultValue={meeting?.date} required />
                </label>
                <label className="grid gap-1">
                    <span className="eyebrow">Meeting type</span>
                    <select name="meetingType" defaultValue={meeting?.meetingType ?? "regular"} required>
                        <option value="regular">Regular</option>
                        <option value="testimony">Testimony</option>
                        <option value="stake">Stake</option>
                        <option value="general">General</option>
                    </select>
                </label>
            </div>

            <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
                <label className="grid gap-1">
                    <span className="eyebrow">Presiding</span>
                    <input type="text" name="presiding" defaultValue={meeting?.presiding} required />
                </label>
                <label className="grid gap-1">
                    <span className="eyebrow">Conducting</span>
                    <input type="text" name="conducting" defaultValue={meeting?.conducting} required />
                </label>
            </div>

            <label className="flex items-center gap-2">
                <input type="checkbox" name="stakeBusiness" defaultChecked={meeting?.stakeBusiness} />
                <span>Includes stake business</span>
            </label>

            <fieldset className="grid gap-2 sm:grid-cols-2 sm:gap-4">
                <legend className="eyebrow">Opening hymn</legend>
                <input type="number" name="openingHymnNumber" placeholder="Number" defaultValue={meeting?.openingHymn?.number} required />
                <input type="text" name="openingHymnTitle" placeholder="Title" defaultValue={meeting?.openingHymn?.title} required />
            </fieldset>

            <label className="grid gap-1">
                <span className="eyebrow">Opening prayer</span>
                <input type="text" name="openingPrayer" defaultValue={meeting?.openingPrayer} required />
            </label>

            <fieldset className="grid gap-2 sm:grid-cols-2 sm:gap-4">
                <legend className="eyebrow">Sacrament hymn</legend>
                <input type="number" name="sacramentHymnNumber" placeholder="Number" defaultValue={meeting?.sacramentHymn?.number} required />
                <input type="text" name="sacramentHymnTitle" placeholder="Title" defaultValue={meeting?.sacramentHymn?.title} required />
            </fieldset>

            <label className="grid gap-1">
                <span className="eyebrow">Speakers</span>
                <span className="text-sm text-[var(--muted)]">One per line, as &ldquo;Name | Topic&rdquo;</span>
                <textarea name="speakers" rows={3} defaultValue={speakersToLines(meeting?.speakers)} />
            </label>

            <label className="grid gap-1">
                <span className="eyebrow">Ward business</span>
                <span className="text-sm text-[var(--muted)]">One item per line</span>
                <textarea name="wardBusinessItem" rows={2} defaultValue={meeting?.wardBusinessItem?.map((item) => item.description).join("\n")} />
            </label>

            <label className="grid gap-1">
                <span className="eyebrow">Announcements</span>
                <span className="text-sm text-[var(--muted)]">One per line</span>
                <textarea name="announcements" rows={2} defaultValue={meeting?.announcements?.join("\n")} />
            </label>

            <fieldset className="grid gap-2 sm:grid-cols-2 sm:gap-4">
                <legend className="eyebrow">Closing hymn</legend>
                <input type="number" name="closingHymnNumber" placeholder="Number" defaultValue={meeting?.closingHymn?.number} required />
                <input type="text" name="closingHymnTitle" placeholder="Title" defaultValue={meeting?.closingHymn?.title} required />
            </fieldset>

            <label className="grid gap-1">
                <span className="eyebrow">Closing prayer</span>
                <input type="text" name="closingPrayer" defaultValue={meeting?.closingPrayer} required />
            </label>

            <button type="submit" className="text-link inline-flex w-fit items-center gap-3">{submitLabel} <span aria-hidden="true">→</span></button>
        </form>
    );
}
