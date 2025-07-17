import {TagsInput} from "./TagsInput.tsx";
import {useState} from "react";
import style from "../create-card-panel.module.scss";

export const TagsForm = () => {
    const [tags, setTags] = useState<string[]>([]);

    return (
        <div className={style.qc_form_wrapper}>
            <div className={style.tags_wrapper}>
                <span>Теги</span>
                <TagsInput value={tags} onChange={setTags} />
                <p>На визитке, рядом с вашем именем будет располагаться ваше описание</p>
            </div>
        </div>
    );
}