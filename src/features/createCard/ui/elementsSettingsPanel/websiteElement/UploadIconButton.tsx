import {useDropzone} from "react-dropzone";
import style0 from "./website-elem-panel.module.scss"
import style from "../imageElement/image-elem-panel.module.scss";
import style1 from "../../createCardPanel/create-card-panel.module.scss"
import {useEffect, useRef, useState} from "react";
import {useClickOutside} from "../../../../../shared/utils";
import clsx from "clsx";
import {toast} from "react-toastify";

interface Props {
    onUpload: (file: File) => void;
    uploadedIconUrl?: string;
    onRemove: () => void;
}
export const UploadIconButton = ({onUpload, uploadedIconUrl, onRemove}: Props) => {
    const maxSizeInBytes = 500 * 1024;
    const [showMenu, setShowMenu] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [showStatusIcon, setShowStatusIcon] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);
    useClickOutside(dropdownRef, () => setShowMenu(false));

    const onDrop = (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Можно загружать только изображения");
            return;
        }
        if (file.size > maxSizeInBytes) {
            toast.error("Файл слишком большой");
            return;
        }

        setUploading(true);
        const reader = new FileReader();
        reader.onloadend = () => {
            onUpload(file);
        };
        reader.readAsDataURL(file);
    };


    useEffect(() => {
        if (uploadedIconUrl) {
            setUploading(false);
            setShowStatusIcon(true);
        }
    }, [uploadedIconUrl]);


    useEffect(() => {
        if (showStatusIcon) {
            const timeout = setTimeout(() => setShowStatusIcon(false), 5000);
            return () => clearTimeout(timeout);
        }
    }, [showStatusIcon]);

    const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
        noClick: true,
        noKeyboard: true,
        accept: { "image/*": [] }
    });

    return (
        <div {...getRootProps()} className={style.preview_wrapper}>
            <input {...getInputProps()} />
            <div>
                {uploadedIconUrl ? (
                    <img src={uploadedIconUrl} alt="icon preview" className={style0.icon_img}/>
                ) : (
                    <button type="button" onClick={open} className={style0.icon_btn}>
                        <img src={
                            isDragActive
                                ? "src/assets/active_camera_icon.svg"
                                : "src/assets/mini_camera_icon.svg"
                        }
                             alt="upload icon" />
                    </button>
                )}

                {uploadedIconUrl && (
                    <>
                        <button
                            className={clsx(style.preview_menu_btn, {
                                [style.preview_menu_btn_active]: showMenu,
                            })}
                            onClick={() => setShowMenu(!showMenu)}
                        >
                            <img
                                src={
                                    showMenu
                                        ? "src/assets/preview_menu_btn_active.svg"
                                        : "src/assets/preview_dropdown_btn.svg"
                                }
                                alt="menu icon"
                            />
                        </button>

                        {showMenu && (
                            <div className={style.preview_dropdown}>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onRemove();
                                        setShowMenu(false);
                                    }}
                                    className={style1.dropdown_button}
                                >
                                    <img src="src/assets/delete.svg" alt="remove icon" />
                                    Удалить
                                </button>
                            </div>
                        )}
                    </>
                )}

                {uploading && (
                    <div className={style.overlay_icon}>
                        <img src="src/assets/loader_icon.svg" alt="loading" />
                    </div>
                )}
                {showStatusIcon && !uploading && (
                    <div className={style.overlay_icon}>
                        <img src="src/assets/check_icon.svg" alt="done" />
                    </div>
                )}
            </div>
        </div>
    );
}