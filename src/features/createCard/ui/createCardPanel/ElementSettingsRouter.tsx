import type {AddElementSectionType, ElementInstance} from "../../../../entities/types";
import {TextElementSettings} from "../elementsSettingsPanel/textElement/TextElementSettings.tsx";
import {ImageElementSettings} from "../elementsSettingsPanel/imageElement/ImageElementSettings.tsx";
import {WebsiteElementSettings} from "../elementsSettingsPanel/websiteElement/WebsiteElementSettings.tsx";

interface Props {
    type: AddElementSectionType;
    element: ElementInstance;
    onBack: () => void;
    onSave: (data: ElementInstance) => void;
}

export const ElementSettingsRouter = ({type, element, onBack, onSave}: Props) => {
    switch (type) {
        case "text":
            return (
                <TextElementSettings
                    data={element as Extract<ElementInstance, { type: "text" }>}
                    onBack={onBack}
                    onSave={onSave}
                />
            );
        case "image":
            return(
                <ImageElementSettings
                    data={element as Extract<ElementInstance, { type: "image" }>}
                    onBack={onBack}
                    onSave={onSave}
                />
            )
        case "website":
            return (
                <WebsiteElementSettings
                    data={element as Extract<ElementInstance, { type: "website"}>}
                    onBack={onBack}
                    onSave={onSave}
                />
            )
        default:
            return <p>Нет настроек для типа: {type}</p>;
    }
};
