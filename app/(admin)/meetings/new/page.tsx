import { createMeeting } from "@/lib/actions";
import { MeetingForm } from "@/components/MeetingForm";

export default function NewMeetingPage() {
    return (
        <div className="content-column">
            <div className="page-intro">
                <p className="eyebrow">Admin</p>
                <h1>Create meeting</h1>
            </div>
            <MeetingForm action={createMeeting} submitLabel="Create meeting" />
        </div>
    );
}
