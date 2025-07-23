import type {AddElementSectionType, TextElementData} from "../../entities/types";

export const getDefaultElementData = (type: AddElementSectionType): TextElementData => {
    switch (type) {
        case "text":
            return { title: "", content: "" };
        // case "image":
        //     return { src: "", alt: "" }; // пример
        default:
            return { title: "", content: "" };
    }
};
