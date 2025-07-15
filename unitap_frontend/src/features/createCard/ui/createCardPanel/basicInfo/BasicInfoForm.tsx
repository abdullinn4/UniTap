import {ChangeEvent, useState} from "react";
import style from "../create-card-panel.module.scss"
import InputMask from "react-input-mask";

export const BasicInfoForm = () => {
    const [form, setForm] = useState({
        name: "",
        about: "",
        phone: "",
        email: "",
        location: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setForm((prev) => ({...prev,[name]: value}));
    }

    return(
        <div>
            <div className={style.qc_form_wrapper}>
                <label className={style.data_block}>
                    <span>Как Вас записать*</span>
                    <input
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Напишите текст"
                    />
                </label>

                <label className={style.data_block}>
                    <span>О себе</span>
                    <textarea
                        name="about"
                        value={form.about}
                        onChange={handleChange}
                        placeholder="Небольшое описание"
                        rows={4}
                    />
                    <p>На визитке, рядом с вашем именем будет располагаться ваше описание</p>
                </label>


                <label className={style.data_block}>
                    <span>Номер телефона</span>
                    <input
                        value={form.phone}
                        onChange={handleChange}
                        name="phone"
                        placeholder="Напишите текст"
                        type="tel"
                    />
                </label>


                <label className={style.data_block}>
                    <span>Электронная почта</span>
                    <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Напишите текст"
                    />
                </label>

                <label className={style.data_block}>
                    <span>Место жительства</span>
                    <input
                        name="location"
                        type="text"
                        value={form.location}
                        onChange={handleChange}
                        placeholder="Напишите текст"
                    />
                </label>
            </div>
        </div>
    )
}