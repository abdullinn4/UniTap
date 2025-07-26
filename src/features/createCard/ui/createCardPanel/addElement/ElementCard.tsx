import type {AddElementSectionType, ElementInstance} from "../../../../../entities/types";
import {useRef, useState} from "react";
import style from "../create-card-panel.module.scss"
import {ELEMENTS} from "../../../../../entities/constants";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';
import type {UniqueIdentifier} from "@dnd-kit/core";
import {useClickOutside} from "../../../../../shared/utils";


interface Props {
    element: ElementInstance;
    index: number;
    onSelect: (id: string) => void;
    onMove: (index: number, direction: "up" | "down") => void;
    onHide: (id: string) => void;
    onDelete: (id: string) => void;
    totalCount: number;
}

export const ElementCard = ({element, index, onSelect, onMove, onHide, onDelete, totalCount}: Props) => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useClickOutside(dropdownRef, () => {
        setMenuOpen(false);
    });

    const isFirst = index === 0;
    const isLast = index === totalCount - 1;
    const isHidden = element.hidden;

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: element.id as UniqueIdentifier });

    const styleInline = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        cursor: "default",
    };


    return (
        <div
            ref={setNodeRef}
            style={styleInline}
            className={`${style.card_element_wrapper} ${isHidden ? style.hiddenCard : ''}`}
        >
            <div className={style.card_element} onClick={() => onSelect(element.id)}>
                <button
                    className={style.drag_button}
                    {...attributes}
                    {...listeners}
                >
                    <img
                        src={
                            isDragging
                                ? "src/assets/grabbing_icon.svg"
                                : "src/assets/drag_icon.svg"
                        }
                        alt="drag"
                    />
                </button>

                <img
                    src={element.data?.url || getElementIcon(element.type)}
                    alt="icon"
                    className={style.card_img}
                />

                <div className={style.text_block}>
                    <p className={isHidden ? style.hiddenText : ""}>
                        {getElementLabel(element.type)}
                    </p>
                    <p className={isHidden ? style.hiddenText : ""}>
                        {element.data?.title || "Без названия"}
                    </p>
                </div>
            </div>
            <div className={style.card_actions} ref={dropdownRef}>
                <div className={style.dropdown_wrapper}>
                    <button
                        className={style.dropdown_card_button}
                        onClick={() => setMenuOpen(!isMenuOpen)}
                    >
                        <img src="src/assets/more_icon.svg" alt="more"/>
                    </button>

                    {isMenuOpen && (
                        <div className={style.dropdown_menu}>
                            <button
                                className={style.dropdown_button}
                                onClick={() => onMove(index, "up")}
                                disabled={isFirst}
                            >
                                <img src="src/assets/up_icon.svg" alt="up button"/>
                                Сделать выше
                            </button>
                            <button
                                className={style.dropdown_button}
                                onClick={() => onMove(index, "down")}
                                disabled={isLast}
                            >
                                <img src="src/assets/down_icon.svg" alt="down button"/>
                                Сделать ниже
                            </button>
                            <button
                                className={style.dropdown_button}
                                onClick={() => onHide(element.id)}
                            >
                                <img src="src/assets/hide_icon.svg" alt="hide button"/>
                                {isHidden ? "Показать блок" : "Скрыть блок"}
                            </button>
                            <button
                                className={style.dropdown_button}
                                onClick={() => onDelete(element.id)}
                            >
                                <img src="src/assets/delete.svg" alt="delete button"/>
                                Удалить
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export function getElementLabel(type: AddElementSectionType): string {
    const element = ELEMENTS.find((el) => el.type === type);
    return element?.label ?? "Элемент";
}

export function getElementIcon(type: AddElementSectionType): string {
    const element = ELEMENTS.find((el) => el.type === type);
    return element?.icon ?? "src/assets/default_icon.svg";
}