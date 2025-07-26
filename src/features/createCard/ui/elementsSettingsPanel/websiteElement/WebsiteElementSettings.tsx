import type {ElementInstance} from "../../../../../entities/types";
import {useEffect, useState} from "react";
import {HeaderPanel} from "../HeaderPanel.tsx";
import style from "../imageElement/image-elem-panel.module.scss"
import style1 from "../textElement/text-elem-panel.module.scss"
import style2 from "./website-elem-panel.module.scss"
import {UploadIconButton} from "./UploadIconButton.tsx";
import clsx from "clsx";

interface Props{
    data: Extract<ElementInstance, {type: "website"}>;
    onSave: (data: ElementInstance) => void;
    onBack: () => void;
}
export const WebsiteElementSettings = ({data, onSave, onBack} : Props) => {
    const [localData, setLocalData] = useState<ElementInstance<"website">>(data);
    const [showDropdown, setShowDropdown] = useState(false);
    const [customIcon, setCustomIcon] = useState<string | undefined>(data.data.iconType === "custom" ? data.data.icon : undefined);


    const handleSave = () => {
        onSave(localData);
    }
    useEffect(() => {
        setLocalData(data)
    }, [data]);

    const selectIcon = (type: "link" | "globe" | "custom") => {
        setLocalData((prev) => ({
            ...prev,
            data: {
                ...prev.data,
                iconType: type,
                icon: type === "custom" ? customIcon : prev.data.icon,
            },
        }));
        console.log(localData.data.iconType);
    };

    const handleCustomIconUpload = (iconUrl: string) => {
        setCustomIcon(iconUrl);
        setLocalData((prev) => ({
            ...prev,
            data: {
                ...prev.data,
                iconType: "custom",
                icon: iconUrl,
            },
        }));
    };

    return(
        <>
            <HeaderPanel title={"Личный сайт"} onBack={onBack} onDropdownClick={() => setShowDropdown(!showDropdown)}
                         showDropdown={showDropdown}/>

            <div className={style1.text_panel_wrapper}>
                <div className={style1.textarea_wrapper}>
                    <label>Заголовок</label>
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

                <div className={style2.icons_wrapper}>
                    <label>Иконка</label>
                    <p>На визитке, рядом с вашем именем будет располагаться ваше</p>

                    <div className={style2.icon_options}>

                        <div
                            className={clsx(style2.icon_btn, {
                                [style2.active_icon]: localData.data.iconType === "custom",
                            })}
                            onClick={() => selectIcon("custom")}
                        >
                            <UploadIconButton
                                uploadedIconUrl={customIcon}
                                onUpload={(file) => {
                                    const url = URL.createObjectURL(file);
                                    handleCustomIconUpload(url);
                                    selectIcon("custom");
                                }}
                                onRemove={() => {
                                    setCustomIcon(undefined);
                                    setLocalData((prev) => ({
                                        ...prev,
                                        data: {
                                            ...prev.data,
                                            icon: undefined,
                                            iconType: "link",
                                        },
                                    }));
                                }}
                            />
                        </div>


                        <button
                            onClick={() => selectIcon("link")}
                            className={clsx(style2.icon_btn, {
                                [style2.active_icon]: localData.data.iconType === "link"
                            })}
                        >
                            <img src="src/assets/link_active_icon.svg" alt="link icon btn"/>
                        </button>
                        <button
                            onClick={() => selectIcon("globe")}
                            className={clsx(style2.icon_btn, {
                                [style2.active_icon]: localData.data.iconType === "globe"
                            })}
                        >
                            <img src="src/assets/browser_active_icon.svg" alt="browser icon btn"/>
                        </button>

                    </div>
                </div>

                <div className={style1.textarea_wrapper}>
                    <label>Ссылка</label>
                    <input
                        type="link"
                        name="link"
                        value={localData.data.link}
                        onChange={(e) => setLocalData({
                            ...localData, data: {
                                ...localData.data,
                                link: e.target.value,
                            },
                        })}
                        className={style.image_panel_title}
                        placeholder="Введите ссылку на сайт"
                        pattern="https?://.+"
                    />
                </div>


                <button onClick={handleSave} className={style1.save_button}>
                    Сохранить
                </button>
            </div>
        </>
    )

}