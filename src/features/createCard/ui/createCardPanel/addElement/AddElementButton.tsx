import style from "../create-card-panel.module.scss"
import type {ElementInstance} from "../../../../../entities/types";
import type {DragEndEvent} from "@dnd-kit/core";
import {closestCenter, DndContext, useDroppable} from "@dnd-kit/core";
import {arrayMove, SortableContext, verticalListSortingStrategy,} from '@dnd-kit/sortable';
import {ElementCard} from "./ElementCard.tsx";
import {Dispatch, SetStateAction} from "react";

interface Props {
    onAddClick: () => void;
    elements: ElementInstance[];
    onSelectElement: (id: string) => void;
    setElements: Dispatch<SetStateAction<ElementInstance[]>>
}

export const AddElementButton = ({onAddClick, elements, onSelectElement, setElements}: Props) => {
    const isEmpty = elements.length === 0;

    const {isOver, setNodeRef} = useDroppable({
        id: 'add-element-dropzone',
    });

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;

        if (active.id !== over?.id) {
            const oldIndex = elements.findIndex(el => el.id === active.id);
            const newIndex = elements.findIndex(el => el.id === over?.id);

            setElements((prev) => arrayMove(prev, oldIndex, newIndex));
        }
    };

    const moveElement = (index: number, direction: "up" | "down") => {
        setElements((prev) => {
            const newIndex = direction === "up" ? index - 1 : index + 1;

            if (newIndex < 0 || newIndex >= prev.length){
                return prev;
            }
            return arrayMove(prev, index, newIndex);
        })
    }
    const toggleVisibility = (id: string) => {
        setElements((prev) =>
            prev.map((el) =>
                el.id === id ? { ...el, hidden: !el.hidden } : el
            )
        );
    }
    const removeElement = (id: string) => {
        setElements((prev) => prev.filter((el) => el.id !== id));
    }

    return (
        <div
            ref={setNodeRef}
            className={`${style.addElementButton_wrapper} ${isOver ? style.drop_highlight : ''}`}
        >
            {isEmpty ? (
                <div className={style.empty_container}>
                    <img src="src/assets/Empty_icon.svg" alt="empty icon"/>
                    <p>Тут пока пусто</p>
                    <p>Добавьте элементы, нажав на кнопку “Добавить элемент” или щелкните на кнопку “Добавить” в панели
                        инструментов</p>
                    <button onClick={onAddClick} className={style.add_element_button}>
                        Добавить элемент
                        <img src="src/assets/Plus_icon.svg" alt="Plus icon"/>
                    </button>
                </div>
            ) : (
                <div>
                    <DndContext
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={elements.map(el => el.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            <>
                                {elements.map((element, index) => (
                                    <ElementCard
                                        key={element.id}
                                        element={element}
                                        index={index}
                                        onSelect={onSelectElement}
                                        onMove={moveElement}
                                        onHide={toggleVisibility}
                                        onDelete={removeElement}
                                        totalCount={elements.length}/>
                                ))}
                            </>
                        </SortableContext>
                    </DndContext>

                </div>
            )}
        </div>
    )

}