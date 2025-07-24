import {useEffect, useState} from "react";
import {useDropzone} from "react-dropzone";
import style from "./image-elem-panel.module.scss"
import clsx from "clsx";
import "keen-slider/keen-slider.min.css";
import {useUploadPreviews} from "./useUploadPreviews.ts";
import {PreviewItem} from "./PreviewItem.tsx";
import {ImageSlider} from "./ImageSlider.tsx";
import type {KeenSliderInstance} from "keen-slider";

interface Props {
    urls: string[];
    onUrlsChange: (urls: string[]) => void;
    multiple?: boolean;
}

export const UploadImage = ({urls, onUrlsChange, multiple}: Props) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [sliderInstance, setSliderInstance] = useState<KeenSliderInstance | null>(null);


    const {previews, setPreviews, isUploading, uploadFiles} = useUploadPreviews(
        (uploadedUrls) => {
            onUrlsChange([...urls, ...uploadedUrls]);
        },
        urls
    );


    const {getRootProps, getInputProps, isDragActive, open} = useDropzone({
        onDrop: uploadFiles,
        multiple,
        accept: {"image/*": []},
        noClick: true,
        noKeyboard: true,
    });

    const handleDropzoneClick = () => {
        if (previews.length === 0) open();
    };

    useEffect(() => {
        sliderInstance?.update();
    }, [urls, sliderInstance]);

    return (
        <div
            {...getRootProps()}
            className={clsx(style.dropzone, {[style.active]: isDragActive})}
            onClick={handleDropzoneClick}
            style={{cursor: urls.length === 0 ? "pointer" : "default"}}
        >
            <input {...getInputProps()} />

            {urls.length === 0 ? (
                <div className={style.upload_zone}>
                    <img
                        src={isUploading ? "src/assets/loading_icon.svg" : "src/assets/image_zone.svg"}
                        alt="zone"
                    />
                </div>
            ) : (
                <>
                    <ImageSlider
                        previews={urls}
                        currentSlide={currentSlide}
                        setCurrentSlide={setCurrentSlide}
                        onSliderReady={setSliderInstance}
                    />

                    <p>Содержимое</p>

                    <div className={style.preview_row}>

                        <button
                            className={style.add_more_btn}
                            onClick={(e) => {
                                e.stopPropagation();
                                open();
                            }}
                        >
                            <img src="src/assets/mini_camera_icon.svg" alt="Upload"/>
                        </button>

                        {previews.map((preview, i) => (
                            <PreviewItem
                                key={i}
                                preview={preview}
                                active={currentSlide === i}
                                onClick={() => {
                                    sliderInstance?.moveToIdx(i);
                                }}
                                onRemove={() => {
                                    setPreviews((prev) => {
                                        const newPreviews = prev.filter((_, idx) => idx !== i);
                                        onUrlsChange(newPreviews.map((p) => p.url));
                                        return newPreviews;
                                    });
                                }}

                                onReplace={() => {
                                    if (i === 0) return;

                                    setPreviews((prev) => {
                                        const newPreviews = [...prev];
                                        const temp = newPreviews[i - 1];
                                        newPreviews[i - 1] = newPreviews[i];
                                        newPreviews[i] = temp;

                                        onUrlsChange(newPreviews.map((p) => p.url));
                                        return newPreviews;
                                    });
                                    setCurrentSlide((prev) => Math.max(prev - 1, 0));
                                }}

                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};
