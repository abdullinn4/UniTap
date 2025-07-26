import type {ImageElementData, TextElementData, WebsiteElementData} from "./elements/elements.types.ts";

export type OverviewSectionType = "settings" | "viewer" | "help";
export type TabType = 'overview' | 'add';
export type AddElementSectionType = "text" | "image" | "video" | "quote" | "list" | "section"
    | "map" | "event" | "divider" | "button" | "email" | "phone" | "social" | "website" | "loop" | "link" | "gallery"
    | "story";

export type AddElementSectionType_ = keyof ElementDataMap;

export type ElementInstance<T extends AddElementSectionType_ = AddElementSectionType_> = {
    id: string;
    type: T;
    data: ElementDataMap[T];
    hidden?: boolean;
};

export type ElementInstance_ = {
    id: string;
    type: AddElementSectionType;
    data: TextElementData;
    hidden?: boolean;
}
export type ElementDataMap = {
    text: TextElementData;
    image: ImageElementData;
    website: WebsiteElementData;
    // Добавь другие соответствия

};