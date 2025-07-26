import type {ElementInstance} from "../../../../../entities/types";
import {useEffect, useState} from "react";
import style from "../textElement/text-elem-panel.module.scss";
import {HeaderPanel} from "../HeaderPanel.tsx";

interface Props {
    data: Extract<ElementInstance, { type: "text" }>;
    onBack: () => void;
    onSave: (data: ElementInstance) => void;
}

export const TextElementSettings = ({data, onBack, onSave}: Props) => {
    const [localData, setLocalData] = useState<ElementInstance<"text">>(data);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleSave = () => {
        onSave(localData);
    }
    useEffect(() => {
        setLocalData(data)
    }, [data]);

    return (
        <>
            <HeaderPanel title={"Текст"} onBack={onBack} onDropdownClick={() => setShowDropdown(!showDropdown)}
                         showDropdown={showDropdown}/>

            <div className={style.text_panel_wrapper}>
                <div className={style.textarea_wrapper}>
                    <label>Заголовок</label>
                    <textarea
                        name="title"
                        value={localData.data.title}
                        onChange={(e) => setLocalData({
                            ...localData, data: {
                                ...localData.data,
                                title: e.target.value,
                            },
                        })}
                        className={style.text_panel_title}
                        placeholder="Напиши небольшой заголовок"
                    />
                </div>

                <div className={style.textarea_wrapper}>
                    <label>Основной текст</label>
                    <textarea
                        name="content"
                        value={localData.data.content}
                        onChange={(e) => setLocalData({
                            ...localData, data: {
                                ...localData.data,
                                content: e.target.value,
                            },
                        })}
                        className={style.text_panel_content}
                        placeholder="Напишите основной текст"
                    />
                </div>


                <button onClick={handleSave} className={style.save_button}>
                    Сохранить
                </button>
            </div>
        </>
    )
}