import style from "../create-card-panel.module.scss"
import type {AddElementSectionType} from "../../../../../entities/types";
import {useDroppable} from "@dnd-kit/core";

interface Props{
    onAddClick: () => void;
    addedElementSections: AddElementSectionType[];
}
export const AddElementButton = ({onAddClick, addedElementSections} : Props) => {
    const isEmpty = addedElementSections.length === 0;

    const { isOver, setNodeRef } = useDroppable({
        id: 'add-element-dropzone',
    });


    return(
        <div
            ref={setNodeRef}
            className={`${style.addElementButton_wrapper} ${isOver ? style.drop_highlight : ''}`}
        >
            {isEmpty ? (
                <>
                    <img src="src/assets/Empty_icon.svg" alt="empty icon"/>
                    <p>Тут пока пусто</p>
                    <p>Добавьте элементы, нажав на кнопку “Добавить элемент” или щелкните на кнопку “Добавить” в панели инструментов</p>
                    <button onClick={onAddClick} className={style.add_element_button}>
                        Добавить элемент
                        <img src="src/assets/Plus_icon.svg" alt="Plus icon"/>
                    </button>
                </>
            ) : (
                <div>
                    {addedElementSections.map((section, index) => (
                        <div key={index}>
                            <span>Добавлен элемент: {section}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )

}