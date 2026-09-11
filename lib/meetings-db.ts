import type { Meeting } from "./types";

export const meetings: Meeting[] = [
    {
        id: "2026-09-13",
        date: "2026-09-13",
        theme: "Gathered in gratitude",
        presiding: "Bishop Elena Marquez",
        conducting: "Brother Theo Grant",
        openingHymn: "How Great Thou Art",
        closingHymn: "Count Your Blessings",
        items: [
            { id: "welcome", title: "Welcome and announcements", time: "10:00 AM", location: "Meetinghouse foyer" },
            { id: "sacrament", title: "Sacrament hymn and administration", time: "10:12 AM", location: "Chapel" },
            { id: "speaker-1", title: "Message: The practice of gratitude", time: "10:28 AM", location: "Chapel", notes: "Sister Amara Lee" },
            { id: "speaker-2", title: "Message: A table with room", time: "10:45 AM", location: "Chapel", notes: "Elder Marcus Bell" },
            { id: "music", title: "Ward choir musical number", time: "11:03 AM", location: "Chapel", notes: "Come, Ye Children of the Lord" },
            { id: "closing", title: "Closing remarks and prayer", time: "11:15 AM", location: "Chapel" },
        ],
    },
    {
        id: "2026-09-06",
        date: "2026-09-06",
        theme: "A place to belong",
        presiding: "Bishop Elena Marquez",
        conducting: "Sister Nia Patel",
        openingHymn: "Come, Come, Ye Saints",
        closingHymn: "Love One Another",
        items: [
            { id: "welcome", title: "Welcome and announcements", time: "10:00 AM", location: "Meetinghouse foyer" },
            { id: "sacrament", title: "Sacrament hymn and administration", time: "10:12 AM", location: "Chapel" },
            { id: "message", title: "Message: Finding our people", time: "10:30 AM", location: "Chapel", notes: "Sister Nia Patel" },
            { id: "closing", title: "Closing remarks and prayer", time: "11:10 AM", location: "Chapel" },
        ],
    },
    {
        id: "2026-08-30",
        date: "2026-08-30",
        theme: "Steady hands",
        presiding: "Bishop Elena Marquez",
        conducting: "Brother Theo Grant",
        openingHymn: "Where Can I Turn for Peace?",
        closingHymn: "Lead, Kindly Light",
        items: [
            { id: "welcome", title: "Welcome and announcements", time: "10:00 AM", location: "Meetinghouse foyer" },
            { id: "sacrament", title: "Sacrament hymn and administration", time: "10:12 AM", location: "Chapel" },
            { id: "message", title: "Message: Small acts, lasting faith", time: "10:30 AM", location: "Chapel", notes: "Brother Theo Grant" },
            { id: "closing", title: "Closing remarks and prayer", time: "11:10 AM", location: "Chapel" },
        ],
    },
];

export function getMeeting(id: string) {
    return meetings.find((meeting) => meeting.id === id);
}

export function getCurrentMeeting() {
    const today = new Date();
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - today.getDay());
    return getMeeting(sunday.toISOString().slice(0, 10)) ?? meetings[0];
}