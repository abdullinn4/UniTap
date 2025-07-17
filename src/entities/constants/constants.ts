import type {AddElementSectionType} from "../types";

export interface ElementMeta {
    label: string;
    type: AddElementSectionType;
    icon: string;
}

export const ELEMENTS: ElementMeta[] = [
    { label: "Текст", type: "text", icon: "src/assets/text_icon.svg" },
    { label: "Фото", type: "image", icon: "src/assets/image_icon.svg" },
    { label: "Видео", type: "video", icon: "src/assets/video_icon.svg" },
    { label: "Цитата", type: "quote", icon: "src/assets/quote_icon.svg" },
    { label: "Список", type: "list", icon: "src/assets/list_icon.svg" },
    { label: "Раздел", type: "section", icon: "src/assets/section_icon.svg" },
    { label: "Карта", type: "map", icon: "src/assets/map_icon.svg" },
    { label: "Событие", type: "event", icon: "src/assets/event_icon.svg" },
    { label: "Разделитель", type: "divider", icon: "src/assets/divider_icon.svg" },
    { label: "Кнопка", type: "button", icon: "src/assets/button_icon.svg" },
    { label: "E-mail", type: "email", icon: "src/assets/email_icon.svg" },
    { label: "Телефон", type: "phone", icon: "src/assets/phone_icon.svg" },
    { label: "Соцсети", type: "social", icon: "src/assets/social_icon.svg" },
    { label: "Сайт", type: "website", icon: "src/assets/website_icon.svg" },
    { label: "Loop", type: "loop", icon: "src/assets/loop_icon.svg" },
    { label: "Ссылка", type: "link", icon: "src/assets/link_icon.svg" },
    { label: "Фотоальбом", type: "gallery", icon: "src/assets/gallery_icon.svg" },
    { label: "Сторис", type: "story", icon: "src/assets/story_icon.svg" },
];