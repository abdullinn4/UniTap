import type {AddElementSectionType} from "../../../../entities/types";
import {useDraggable} from "@dnd-kit/core";
import style from "./card-add-elements.module.scss"

interface DraggableElementProps {
    type: AddElementSectionType;
    label: string;
    icon: string;
}

export const DraggableElement = ({ type, label, icon }: DraggableElementProps) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: type,
    });

    const dragStyle = {
        transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : undefined,
        opacity: isDragging ? 0.5 : 1,
        cursor: "grab",
    };

    return (
        <div
            ref={setNodeRef}
            style={dragStyle}
            {...listeners}
            {...attributes}
            className={style.add_element_item}
        >
            <img src={icon} alt={icon} />
            <div>
                <span>{label}</span>
                <p>Ссылка</p>
            </div>
        </div>
    );
};