export interface TextElementData {
    title: string;
    content: string;
}
export interface ImageElementData{
    url: string[];
    title: string;
    content: string;
}
export interface WebsiteElementData{
    title: string;
    link: string;
    iconType: "custom" | "link" | "globe";
    icon?: string; // путь или base64 иконки, если iconType === "custom"
}