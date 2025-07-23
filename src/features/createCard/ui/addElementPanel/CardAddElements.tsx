import type {AddElementSectionType} from "../../../../entities/types";
import style from "./card-add-elements.module.scss"
import {ELEMENTS} from "../../../../entities/constants";
import {DraggableElement} from "./DraggableElement.tsx";
import {useState} from "react";
import {ElementSearch} from "./ElementSearch.tsx";

interface Props {
    onSelectSection: (addElementSection: AddElementSectionType) => void
    activeSection: AddElementSectionType | null;
}

export const CardAddElements = ({onSelectSection, activeSection}: Props) => {
    const [query, setQuery] = useState("");

    const filteredElements = ELEMENTS.filter(el =>
        el.label.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <>
            <p className={style.section_title}>Элементы для добавления</p>

            <div className={style.add_elem_wrapper}>


                <ElementSearch query={query} onQueryChange={setQuery} />

                <div className={style.elements_list}>
                    {filteredElements.map(({ label, type, icon }) => (
                        <div
                            key={type}
                            onClick={() => onSelectSection(type)}
                        >
                            <DraggableElement type={type} label={label} icon={icon} isActive={type === activeSection} />
                        </div>
                    ))}
                    {filteredElements.length === 0 && (
                        <p className={style.no_results}>Ничего не найдено</p>
                    )}
                </div>
            </div>
        </>

    )
}

