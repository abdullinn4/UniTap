import {useKeenSlider} from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import style from "./image-elem-panel.module.scss";
import {useEffect} from "react";
import type {KeenSliderInstance} from "keen-slider";
import type {Preview} from "./useUploadPreviews.ts";

interface Props {
    previews: string[];
    currentSlide: number;
    setCurrentSlide: (i: number) => void;
    onSliderReady?: (sliderInstance: KeenSliderInstance | null) => void;
}


export const ImageSlider = ({previews, currentSlide, setCurrentSlide, onSliderReady}: Props) => {
    const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
        initial: currentSlide,
        slideChanged(s) {
            setCurrentSlide(s.track.details.rel);
        },
        loop: false,
    });

    useEffect(() => {
        onSliderReady?.(slider.current || null);
    }, [slider]);

    return (
        <div className={`keen-slider ${style.upload_zone}`} ref={sliderRef}
        >
            {previews.map((preview, i) => (
                <div className="keen-slider__slide" key={i}>
                    <img src={preview} alt={`slide-${i}`}/>
                </div>
            ))}
        </div>
    );
};
