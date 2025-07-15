import {useEffect, useRef} from "react";
import style from "../create-card-panel.module.scss"
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination} from "swiper/modules";
import type {Swiper as SwiperClass} from 'swiper/types';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Props {
    images: string[];
    currentIndex: number;
    setCurrentIndex: (index: number) => void;
}

export const StorySlider = ({images, currentIndex, setCurrentIndex}: Props) => {
    const swiperRef = useRef<SwiperClass | null>(null);

    useEffect(() => {
        if (currentIndex >= images.length) {
            setCurrentIndex(images.length - 1);
        }
    }, [images]);

    return (
        <div className={style.story_slider_wrapper}>
            <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                modules={[Pagination]}
                spaceBetween={10}
                slidesPerView={1}
                agination={{ clickable: true, type: "bullets" }}
                onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
                initialSlide={currentIndex}
            >
                <>
                    {images.map((img, idx) => (
                        <SwiperSlide key={idx}>
                            <div className={style.story_image_wrapper}>
                                <img className={style.story_image} src={img} alt={`slide-${idx}`}/>
                                <div className={style.click_area_left} onClick={() => swiperRef.current?.slidePrev()}/>
                                <div className={style.click_area_right} onClick={() => swiperRef.current?.slideNext()}/>
                            </div>
                        </SwiperSlide>
                    ))}
                </>
            </Swiper>
        </div>
    )
}
