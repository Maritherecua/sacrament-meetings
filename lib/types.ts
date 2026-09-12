export type MeetingType = "testimony" | "regular" | "stake" | "general";

export interface Hymn {
  number: number;
  title: string;
}
export interface SpeakerItem {
  name: string;
  topic?: string;
  type: "speaker" | "musical-number";
}
export interface WardBusinessItem {
  description: string;
}

export interface SacramentMeeting {
  id: number;
  date: string; //ISO date string: "YYYY-MM-DD"
  meetingType: MeetingType;
  presiding: string;
  conducting: string;
  announcements?: string[];
  openingHymn: Hymn;
  openingPrayer: string;
  wardBusinessItem: WardBusinessItem[];
  stakeBusiness: boolean;
  sacramentHymn: Hymn;
  speakers: SpeakerItem[];
  intermediateHymn?: Hymn;
  closingHymn: Hymn;
  closingPrayer: string;
  items: (SpeakerItem | WardBusinessItem)[];
}
