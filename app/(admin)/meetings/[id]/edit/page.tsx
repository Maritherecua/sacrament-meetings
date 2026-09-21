import { notFound } from "next/navigation";
import { updateMeeting } from "@/lib/actions";
import { getMeetingById } from "@/lib/meetings-db";
import { MeetingForm } from "@/components/MeetingForm";

export default async function EditMeetingPage({ params }: PageProps<"/meetings/[id]/edit">) {
    const { id } = await params;
    const meetingId = Number(id);

    if (!Number.isInteger(meetingId)) {
        notFound();
    }

    const meeting = await getMeetingById(meetingId);
    if (!meeting) notFound();

    return (
        <div className="content-column">
            <div className="page-intro">
                <p className="eyebrow">Admin</p>
                <h1>Edit meeting</h1>
            </div>
            <MeetingForm action={updateMeeting.bind(null, meetingId)} submitLabel="Save changes" meeting={meeting} />
        </div>
    );
}
