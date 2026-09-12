import type { SacramentMeeting } from "./types";

export const meetings: SacramentMeeting[] = [
    {
        id: 1,
        date: "2026-09-13",
        meetingType: "regular",
        presiding: "Bishop Marquez",
        conducting: "Brother Manuel Borda",
        openingHymn: { number: 1, title: "How Great Thou Art" },
        openingPrayer: "Brother Luna",
        wardBusinessItem: [],
        stakeBusiness: false,
        sacramentHymn: { number: 3, title: "Come, Follow Me" },
        speakers: [
            { name: "Sister Amara Lee", topic: "faith in Christ", type: "speaker" },
            { name: "Elder Marcus Bell", topic: "Service", type: "speaker" },
            { name: "Ward Choir", type: "musical-number" },
        ],
        intermediateHymn: { number: 4, title: "Be Still, My Soul" },
        closingHymn: { number: 2, title: "Count Your Blessings" },
        closingPrayer: "Sister Langarica",
        announcements: [],
        items: [],
    },
    {
        id: 2,
        date: "2026-09-06",
        meetingType: "regular",
        presiding: "Brother Tusher",
        conducting: "Sister Nia Patel",
        openingHymn: { number: 3, title: "Come, Come, Ye Saints" },
        openingPrayer: "Gabriel Lopez",
        wardBusinessItem: [{ description: "Discussion on upcoming ward activities" }],
        stakeBusiness: false,
        sacramentHymn: { number: 5, title: "The Spirit of God" },
        speakers: [
            { name: "Sister Nia Patel", topic: " Being prepared for service", type: "speaker" },
        ],
        intermediateHymn: { number: 6, title: "Abide with Me; 'Tis Eventide" },
        closingHymn: { number: 4, title: "Love One Another" },
        closingPrayer: "Sister Perez",
        announcements: ["Ward activity updates"],
        items: [],
    },
    {
        id: 3,
        date: "2026-08-30",
        meetingType: "regular",
        presiding: "Bishop  Marquez",
        conducting: "Brother Soberanis",
        openingHymn: { number: 5, title: "Where Can I Turn for Peace?" },
        openingPrayer: "Brother Perez",
        wardBusinessItem: [],
        stakeBusiness: false,
        sacramentHymn: { number: 3, title: "Come, Follow Me" },
        speakers: [
            { name: "Brother Theo Grant", topic: "Gratitude and Service", type: "speaker" },
        ],
        intermediateHymn: { number: 4, title: "Be Still, My Soul" },
        closingHymn: { number: 6, title: "Lead, Kindly Light" },
        closingPrayer: "Sister Canizales",
        items: [

        ],
    },
    {
        id: 4,
        date: "2026-09-13",
        meetingType: "regular",
        presiding: "Bishop  Marquez",
        conducting: "Brother Patel",
        openingHymn: { number: 1, title: "The Morning Breaks" },
        openingPrayer: "Brother Tafolla",
        wardBusinessItem: [],
        stakeBusiness: false,
        sacramentHymn: { number: 2, title: "Come, Follow Me" },
        speakers: [
            { name: "Sister Amara Lee", topic: "Faith and Service", type: "speaker" },
        ],
        intermediateHymn: { number: 3, title: "Come, Come, Ye Saints" },
        closingHymn: { number: 4, title: "Love One Another" },
        closingPrayer: "Sister Alejandra Powell",
        items: [
        ],
    },
    {
        id: 5,
        date: "2026-09-20",
        meetingType: "regular",
        presiding: "President Mejia",
        conducting: "Brother Meyer",
        openingHymn: { number: 2, title: "The Spirit of God" },
        openingPrayer: "Sister Rosales",
        wardBusinessItem: [],
        stakeBusiness: false,
        sacramentHymn: { number: 3, title: "Come, Follow Me" },
        speakers: [
            { name: "Brother Theo Grant", topic: "Gratitude and Service", type: "speaker" },
        ],
        intermediateHymn: { number: 4, title: "Be Still, My Soul" },
        closingHymn: { number: 5, title: "The Spirit of God" },
        closingPrayer: "Sister Mejia",
        items: [],
    }

];

export function getMeetings(date?: string | null): SacramentMeeting[] {
    if (!date) {
        return meetings;
    }
    return meetings.filter((meeting) => meeting.date === date);
}
export function getMeetingById(id: number): SacramentMeeting | undefined {
    return meetings.find((meeting) => meeting.id === id);
}

export function getCurrentMeeting(): SacramentMeeting {
    const today = new Date();
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - today.getDay());
    return getMeetings(sunday.toISOString().slice(0, 10))[0] ?? meetings[0];
}

export function getMeeting(id: number): SacramentMeeting | undefined {
    return getMeetingById(id);
}