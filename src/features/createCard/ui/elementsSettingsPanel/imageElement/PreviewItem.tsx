import clsx from "clsx";
import style from "./image-elem-panel.module.scss";
import style1 from "../../createCardPanel/create-card-panel.module.scss"
import type {Preview} from "./useUploadPreviews.ts";
import {useRef, useState} from "react";
import {useClickOutside} from "../../../../../shared/utils";


interface Props {
    preview: Preview;
    active: boolean;
    onClick: () => void;
    onReplace: () => void;
    onRemove: () => void;
}

export const PreviewItem = ({preview, active, onClick, onReplace, onRemove}: Props) => {
    const [showMenu, setShowMenu] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useClickOutside(dropdownRef, () => {
        setShowMenu(false);
    });

    return (
        <div
            className={clsx(style.preview_wrapper, {[style.active_preview]: active})}
            onClick={onClick}
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            ref={dropdownRef}
        >
            <img src={preview.url} className={style.preview_img} alt="preview img"/>
            <button
                className={clsx(style.preview_menu_btn, {
                    [style.preview_menu_btn_active]: showMenu,
                })}
                onClick={(e) => {
                    e.stopPropagation();
                    setShowMenu(!showMenu);
                }}
            >
                <img src={showMenu ? "src/assets/preview_menu_btn_active.svg" : "src/assets/preview_dropdown_btn.svg"}
                     alt="menu button"/>
            </button>

            {showMenu && (
                <div className={style.preview_dropdown}>
                    <button onClick={(e) => {
                        e.stopPropagation();
                        onReplace();
                        setShowMenu(false);
                    }}
                            className={style1.dropdown_button}
                    >
                        <img src="src/assets/replace_icon.svg" alt="replace icon"/>
                        Заменить
                    </button>
                    <button onClick={(e) => {
                        e.stopPropagation();
                        onRemove();
                        setShowMenu(false);
                    }}
                            className={style1.dropdown_button}
                    >
                        <img src="src/assets/delete.svg" alt="remove icon"/>
                        Удалить
                    </button>
                </div>
            )}

            {preview.status === "uploading" && (
                <div className={style.overlay_icon}>
                    <img src="src/assets/loader_icon.svg" alt="Loading"/>
                </div>
            )}
            {preview.showStatusIcon && (
                <div className={style.overlay_icon}>
                    <img
                        src={`src/assets/${preview.status === "done" ? "check_icon" : "error_icon"}.svg`}
                        alt={preview.status}
                    />
                </div>
            )}
        </div>

    )

};
