export interface MeetingItem {
    id: string;
    title: string;
    time: string;
    location: string;
    notes?: string;
}

export interface Meeting {
    id: string;
    date: string;
    theme: string;
    presiding: string;
    conducting: string;
    openingHymn: string;
    closingHymn: string;
    items: MeetingItem[];
}