import type {TextElementData} from "./elements/elements.types.ts";

export type OverviewSectionType = "settings" | "viewer" | "help";
export type TabType = 'overview' | 'add';
export type AddElementSectionType = "text" | "image" | "video" | "quote" | "list" | "section"
    | "map" | "event" | "divider" | "button" | "email" | "phone" | "social" | "website" | "loop" | "link" | "gallery"
    | "story";

export type ElementInstance = {
    id: string;
    type: AddElementSectionType;
    data: TextElementData;
    hidden?: boolean;
}