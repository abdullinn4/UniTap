import style from "../create-card-panel.module.scss"
import {ChangeEvent, useRef, useState} from "react";
import {StorySlider} from "./StorySlider.tsx";
export const UploadArea = () => {
    const [images,setImages] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const coverInputRef = useRef<HTMLInputElement>(null)

    const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsLoading(true);
        const reader = new FileReader();
        reader.onloadend = () => {
            setImages((prev) => [...prev, reader.result as string]);
            setIsLoading(false);
        };
        reader.readAsDataURL(file);
    };

    return (
        <>
            <label>
                <input
                    key={images.length}
                    type="file"
                    hidden
                    accept="image/**"
                    ref={inputRef}
                    onChange={handleUpload}
                    disabled={images.length > 0}
                />

                {isLoading ? (
                    <div className={style.loading}>
                        <div className={style.spinner} />
                        <p>Загружается...</p>
                    </div>
                ) : images.length > 0 ? (
                        <div className={style.upload_area_wrapper}>
                            <StorySlider images={images} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex}/>
                            <div className={style.cover_section}>
                                <p>Обложка</p>
                                <label>
                                    <button className={style.cover_button} onClick={() => coverInputRef.current?.click()}>
                                        <img src="src/assets/mini_camera_icon.svg" alt="Upload" />
                                        <input
                                            type="file"
                                            hidden
                                            accept="image/*"
                                            ref={coverInputRef}
                                            onChange={handleUpload}
                                        />
                                    </button>
                                </label>
                            </div>
                        </div>
                ) : (
                    <div className={style.upload_area_wrapper}>
                        <img src="src/assets/Load_Photo_Input.svg" alt="Upload" />
                    </div>
                )}
            </label>

        </>
    )
}