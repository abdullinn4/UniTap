import {ChangeEvent, useRef, useState} from "react";
import style from "../create-card-panel.module.scss"

export const AvatarBrandBlock = () => {
    const[avatar, setAvatar] = useState<string | null>(null);
    const[brand, setBrand] = useState<string|null>(null);

    const avatarRef = useRef<HTMLInputElement>(null);
    const brandRef = useRef<HTMLInputElement>(null);

    const handleFile = (e: ChangeEvent<HTMLInputElement>,
                        setImage: (src: string | null) => void ) => {

        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => setImage(reader.result as string);
        reader.readAsDataURL(file);
    }

    return(
        <div className={style.avatar_brand_wrapper}>
            <div className={style.avatar_block}>
                <input
                    type="file"
                    hidden
                    ref={avatarRef}
                    accept="/image/**"
                    onChange={(e) => handleFile(e, setAvatar)}
                />
                <div onClick={() => avatarRef.current?.click()}>
                    {avatar ? (
                        <img src={avatar} alt="Avatar" className={style.avatar_photo}/>
                    ) : (
                        <img src="src/assets/avatar_mini.svg" alt="Avatar"/>
                    )}
                </div>
                <div>
                    <p>Аватар</p>
                    <p>На визитке, рядом с вашем именем будет располагаться ваше описание</p>
                </div>
            </div>
            <div className={style.avatar_block}>
                <input
                    type="file"
                    hidden
                    ref={brandRef}
                    accept="/image/**"
                    onChange={(e) => handleFile(e, setBrand)}
                />
                <div onClick={() => brandRef.current?.click()}>
                    {avatar && brand ? (
                        <div>
                            <img src={avatar} alt="Avatar" className={style.avatar_photo}/>
                            <img src={brand} alt="Brand" className={style.brand_photo}/>
                        </div>
                    ) : (
                        <img src="src/assets/brand_mini.svg" alt="Brand"/>
                    )}
                </div>

                <div>
                    <p>Бренд</p>
                    <p>На визитке, рядом с вашем именем будет располагаться ваше описание</p>
                </div>
            </div>
        </div>
    )

}