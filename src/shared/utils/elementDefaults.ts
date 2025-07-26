import type {AddElementSectionType, TextElementData} from "../../entities/types";
import type {ElementDataMap} from "../../entities/types/card.ts";

export const getDefaultElementData = <T extends AddElementSectionType>(type: T): ElementDataMap[T]  => {
    switch (type) {
        case "text":
            return { title: "", content: "" } as ElementDataMap[T];
        case "image":
            return { url: [], title: "", content: "" } as ElementDataMap[T];
        case "website":
            return { title: "", link: "", iconType: "link", icon: ""} as ElementDataMap[T]
        // другие кейсы...
        default:
            throw new Error(`Неизвестный тип: ${type}`);
    }
};
