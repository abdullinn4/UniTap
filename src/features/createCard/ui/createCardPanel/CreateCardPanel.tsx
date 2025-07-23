import style from "./create-card-panel.module.scss"
import {CardHeader} from "./cardHeader/CardHeader.tsx";
import {UploadArea} from "./uploadArea/UploadArea.tsx";
import {AvatarBrandBlock} from "./uploadArea/AvatarBrandBlock.tsx";
import {QuickContactButton} from "./quickContactButton/QuickContactButton.tsx";
import {Dispatch, SetStateAction, useState} from "react";
import {BasicInfoForm} from "./basicInfo/BasicInfoForm.tsx";
import {TagsForm} from "./tagsInput/TagsForm.tsx";
import {AddElementButton} from "./addElement/AddElementButton.tsx";
import type {AddElementSectionType, ElementInstance} from "../../../../entities/types";

interface Props {
    onAddElementClick: () => void;
    onSelectElement: (id: string) => void;
    elements: ElementInstance[];
    setElements: Dispatch<SetStateAction<ElementInstance[]>>
}

export const CreateCardPanel = ({onAddElementClick, onSelectElement, elements, setElements}: Props) => {
    const [isQContactOpen, setQContactOpen] = useState(false);

    return (
        <>
        {isQContactOpen ? (
            <>
                <QuickContactPanel onClose={() => setQContactOpen(false)}/>
            </>
        ) : (
            <>
                <CardHeader/>
                <div className={style.data_wrapper}>
                    <UploadArea/>
                    <AvatarBrandBlock/>
                    <QuickContactButton onClick={() => setQContactOpen(true)}/>
                    <BasicInfoForm/>
                    <TagsForm/>
                    <AddElementButton
                        onAddClick={onAddElementClick}
                        elements={elements}
                        onSelectElement={onSelectElement}
                        setElements={setElements}
                    />
                </div>
            </>
        )}
        </>
    )
}