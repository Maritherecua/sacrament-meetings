"use client";

import { useActionState } from "react";
import type { ReactElement } from "react";
import type { SacramentMeeting } from "@/lib/types";
import type { MeetingFormState } from "@/lib/actions";

interface MeetingFormProps {
    action: (state: MeetingFormState, formData: FormData) => Promise<MeetingFormState>;
    submitLabel: string;
    meeting?: SacramentMeeting;
}

const initialState: MeetingFormState = { message: null, errors: {} };

function speakersToLines(speakers: SacramentMeeting["speakers"] | undefined): string {
    return (speakers ?? []).map((speaker) => (speaker.topic ? `${speaker.name} | ${speaker.topic}` : speaker.name)).join("\n");
}

function FieldErrors({ id, errors }: { id: string; errors?: string[] }): ReactElement {
    return (
        <div id={id} aria-live="polite" className="text-sm text-[var(--coral)]">
            {errors?.map((error) => <p key={error}>{error}</p>)}
        </div>
    );
}

export function MeetingForm({ action, submitLabel, meeting }: MeetingFormProps): ReactElement {
    const [state, formAction, isPending] = useActionState(action, initialState);
    const errors = state.errors ?? {};

    return (
        <form action={formAction} noValidate className="grid gap-6 max-w-2xl">
            <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
                <div className="grid gap-1">
                    <label htmlFor="date" className="eyebrow">Date</label>
                    <input id="date" type="date" name="date" defaultValue={meeting?.date} aria-describedby="date-error" />
                    <FieldErrors id="date-error" errors={errors.date} />
                </div>
                <div className="grid gap-1">
                    <label htmlFor="meetingType" className="eyebrow">Meeting type</label>
                    <select id="meetingType" name="meetingType" defaultValue={meeting?.meetingType ?? "regular"} aria-describedby="meetingType-error">
                        <option value="regular">Regular</option>
                        <option value="testimony">Testimony</option>
                        <option value="stake">Stake</option>
                        <option value="general">General</option>
                    </select>
                    <FieldErrors id="meetingType-error" errors={errors.meetingType} />
                </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
                <div className="grid gap-1">
                    <label htmlFor="presiding" className="eyebrow">Presiding</label>
                    <input id="presiding" type="text" name="presiding" defaultValue={meeting?.presiding} aria-describedby="presiding-error" />
                    <FieldErrors id="presiding-error" errors={errors.presiding} />
                </div>
                <div className="grid gap-1">
                    <label htmlFor="conducting" className="eyebrow">Conducting</label>
                    <input id="conducting" type="text" name="conducting" defaultValue={meeting?.conducting} aria-describedby="conducting-error" />
                    <FieldErrors id="conducting-error" errors={errors.conducting} />
                </div>
            </div>

            <div className="grid gap-1">
                <label htmlFor="stakeBusiness" className="flex items-center gap-2">
                    <input id="stakeBusiness" type="checkbox" name="stakeBusiness" defaultChecked={meeting?.stakeBusiness} aria-describedby="stakeBusiness-error" />
                    <span>Includes stake business</span>
                </label>
                <FieldErrors id="stakeBusiness-error" errors={errors.stakeBusiness} />
            </div>

            <fieldset className="grid gap-2 sm:grid-cols-2 sm:gap-4">
                <legend className="eyebrow">Opening hymn</legend>
                <div className="grid gap-1">
                    <label htmlFor="openingHymnNumber">Number</label>
                    <input id="openingHymnNumber" type="number" name="openingHymnNumber" placeholder="Number" defaultValue={meeting?.openingHymn?.number} aria-describedby="openingHymnNumber-error" />
                    <FieldErrors id="openingHymnNumber-error" errors={errors.openingHymnNumber} />
                </div>
                <div className="grid gap-1">
                    <label htmlFor="openingHymnTitle">Title</label>
                    <input id="openingHymnTitle" type="text" name="openingHymnTitle" placeholder="Title" defaultValue={meeting?.openingHymn?.title} aria-describedby="openingHymnTitle-error" />
                    <FieldErrors id="openingHymnTitle-error" errors={errors.openingHymnTitle} />
                </div>
            </fieldset>

            <div className="grid gap-1">
                <label htmlFor="openingPrayer" className="eyebrow">Opening prayer</label>
                <input id="openingPrayer" type="text" name="openingPrayer" defaultValue={meeting?.openingPrayer} aria-describedby="openingPrayer-error" />
                <FieldErrors id="openingPrayer-error" errors={errors.openingPrayer} />
            </div>

            <fieldset className="grid gap-2 sm:grid-cols-2 sm:gap-4">
                <legend className="eyebrow">Sacrament hymn</legend>
                <div className="grid gap-1">
                    <label htmlFor="sacramentHymnNumber">Number</label>
                    <input id="sacramentHymnNumber" type="number" name="sacramentHymnNumber" placeholder="Number" defaultValue={meeting?.sacramentHymn?.number} aria-describedby="sacramentHymnNumber-error" />
                    <FieldErrors id="sacramentHymnNumber-error" errors={errors.sacramentHymnNumber} />
                </div>
                <div className="grid gap-1">
                    <label htmlFor="sacramentHymnTitle">Title</label>
                    <input id="sacramentHymnTitle" type="text" name="sacramentHymnTitle" placeholder="Title" defaultValue={meeting?.sacramentHymn?.title} aria-describedby="sacramentHymnTitle-error" />
                    <FieldErrors id="sacramentHymnTitle-error" errors={errors.sacramentHymnTitle} />
                </div>
            </fieldset>

            <div className="grid gap-1">
                <label htmlFor="speakers" className="eyebrow">Speakers</label>
                <span className="text-sm text-[var(--muted)]">One per line, as &ldquo;Name | Topic&rdquo;</span>
                <textarea id="speakers" name="speakers" rows={3} defaultValue={speakersToLines(meeting?.speakers)} aria-describedby="speakers-error" />
                <FieldErrors id="speakers-error" errors={errors.speakers} />
            </div>

            <div className="grid gap-1">
                <label htmlFor="wardBusinessItem" className="eyebrow">Ward business</label>
                <span className="text-sm text-[var(--muted)]">One item per line</span>
                <textarea id="wardBusinessItem" name="wardBusinessItem" rows={2} defaultValue={meeting?.wardBusinessItem?.map((item) => item.description).join("\n")} aria-describedby="wardBusinessItem-error" />
                <FieldErrors id="wardBusinessItem-error" errors={errors.wardBusinessItem} />
            </div>

            <div className="grid gap-1">
                <label htmlFor="announcements" className="eyebrow">Announcements</label>
                <span className="text-sm text-[var(--muted)]">One per line</span>
                <textarea id="announcements" name="announcements" rows={2} defaultValue={meeting?.announcements?.join("\n")} aria-describedby="announcements-error" />
                <FieldErrors id="announcements-error" errors={errors.announcements} />
            </div>

            <fieldset className="grid gap-2 sm:grid-cols-2 sm:gap-4">
                <legend className="eyebrow">Closing hymn</legend>
                <div className="grid gap-1">
                    <label htmlFor="closingHymnNumber">Number</label>
                    <input id="closingHymnNumber" type="number" name="closingHymnNumber" placeholder="Number" defaultValue={meeting?.closingHymn?.number} aria-describedby="closingHymnNumber-error" />
                    <FieldErrors id="closingHymnNumber-error" errors={errors.closingHymnNumber} />
                </div>
                <div className="grid gap-1">
                    <label htmlFor="closingHymnTitle">Title</label>
                    <input id="closingHymnTitle" type="text" name="closingHymnTitle" placeholder="Title" defaultValue={meeting?.closingHymn?.title} aria-describedby="closingHymnTitle-error" />
                    <FieldErrors id="closingHymnTitle-error" errors={errors.closingHymnTitle} />
                </div>
            </fieldset>

            <div className="grid gap-1">
                <label htmlFor="closingPrayer" className="eyebrow">Closing prayer</label>
                <input id="closingPrayer" type="text" name="closingPrayer" defaultValue={meeting?.closingPrayer} aria-describedby="closingPrayer-error" />
                <FieldErrors id="closingPrayer-error" errors={errors.closingPrayer} />
            </div>

            <div aria-live="polite" className="text-sm text-[var(--coral)]">{state.message}</div>

            <button type="submit" disabled={isPending} className="text-link inline-flex w-fit items-center gap-3 disabled:opacity-50">
                {isPending ? "Saving..." : submitLabel} <span aria-hidden="true">→</span>
            </button>
        </form>
    );
}

