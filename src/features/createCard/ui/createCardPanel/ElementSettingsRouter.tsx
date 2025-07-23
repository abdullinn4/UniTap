import type {AddElementSectionType, ElementInstance} from "../../../../entities/types";
import {TextElementSettings} from "../elementsSettingsPanel/textElement/TextElementSettings.tsx";

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
                    data={element}
                    onBack={onBack}
                    onSave={onSave}
                />
            );
        // другие типы сюда
        default:
            return <p>Нет настроек для типа: {type}</p>;
    }
};
