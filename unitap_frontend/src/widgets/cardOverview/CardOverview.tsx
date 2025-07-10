import style from "../cardOverview/card-overview.module.scss"
import type {SectionType} from "../../entities/types";

interface Props {
    onSelectSection : (section: SectionType) => void;
}
export const CardOverview = ({onSelectSection}: Props) => {
    const handleSave = () => {}

    return (
        <div className={style.overview_wrapper}>
            <button onClick={() => onSelectSection("settings")} className={style.overview_button}>Настройки</button>
            <button onClick={() => onSelectSection("viewer")} className={style.overview_button}>Режим зрителя</button>
            <button onClick={() => onSelectSection("help")} className={style.overview_button}>Помощь</button>

            <button onClick={handleSave} className={style.overview_save_button}>
                <p>Сохранить</p>
                <p>Введите название</p>
            </button>
        </div>
    )
}