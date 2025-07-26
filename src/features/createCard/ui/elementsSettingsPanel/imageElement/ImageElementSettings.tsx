import type {ElementInstance} from "../../../../../entities/types";
import {HeaderPanel} from "../HeaderPanel.tsx";
import {useEffect, useState} from "react";
import {UploadImage} from "./UploadImage.tsx";
import style from "./image-elem-panel.module.scss"
import style1 from "../textElement/text-elem-panel.module.scss"

interface Props {
    data: Extract<ElementInstance, { type: "image" }>;
    onSave: (data: ElementInstance) => void;
    onBack: () => void;
}

export const ImageElementSettings = ({data, onSave, onBack}: Props) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [localData, setLocalData] = useState<ElementInstance<"image">>(data);

    const handleSave = () => {
        onSave(localData);
    }
    useEffect(() => {
        setLocalData(data)
    }, [data]);


    return (
        <>
            <HeaderPanel title={"Фото"} onBack={onBack} onDropdownClick={() => setShowDropdown(!showDropdown)}
                         showDropdown={showDropdown}/>

            <div className={style.image_elem_wrapper}>
                <UploadImage
                    urls={localData.data.url}
                    onUrlsChange={(urls) =>
                        setLocalData((prev) => ({
                            ...prev,
                            data: { ...prev.data, url: urls },
                        }))
                    }
                    multiple
                />

                <div className={style1.textarea_wrapper}>
                    <label>Заголовок (необязательно)</label>
                    <input
                        name="title"
                        value={localData.data.title}
                        onChange={(e) => setLocalData({
                            ...localData, data: {
                                ...localData.data,
                                title: e.target.value,
                            },
                        })}
                        className={style.image_panel_title}
                        placeholder="Напиши небольшой заголовок"
                    />
                </div>

                <div className={style1.textarea_wrapper}>
                    <label>Описание (необязательно)</label>
                    <input
                        name="content"
                        value={localData.data.content}
                        onChange={(e) => setLocalData({
                            ...localData, data: {
                                ...localData.data,
                                content: e.target.value,
                            },
                        })}
                        className={style.image_panel_title}
                        placeholder="Напиши небольшое описание"
                    />
                </div>


                <button onClick={handleSave} className={style1.save_button}>
                    Сохранить
                </button>
            </div>
        </>
    )

}