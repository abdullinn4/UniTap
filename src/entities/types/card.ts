export type OverviewSectionType = "settings" | "viewer" | "help";
export type TabType = 'overview' | 'add';
export type AddElementSectionType = "text" | "image" | "video" | "quote" | "list" | "section"
    | "map" | "event" | "divider" | "button" | "email" | "phone" | "social" | "website" | "loop" | "link" | "gallery"
    | "story";

export type CardElement = {
    id: string;
    type: AddElementSectionType; // 'image' | 'quote' | 'map' ...
    data: any; // Специфичные данные, например { src: 'image.jpg', title: 'Фото' }
    hidden?: boolean;
};
