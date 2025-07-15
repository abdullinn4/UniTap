import style from "../cardOverview/card-overview.module.scss"
import type {SectionType} from "../../entities/types";

interface Props {
    onSelectSection : (section: SectionType) => void;
}
export const CardOverview = ({onSelectSection}: Props) => {
    const handleSave = () => {}

    return (
        <>
            <div className={style.overview_wrapper}>
                <div className={style.section_row}>
                    <img src="src/assets/settings.svg" alt="settings"/>
                    <button onClick={() => onSelectSection("settings")} className={style.overview_button}>Настройки</button>
                </div>
                <div className={style.section_row}>
                    <img src="src/assets/viewer.svg" alt="viewer"/>
                    <button onClick={() => onSelectSection("viewer")} className={style.overview_button}>Режим зрителя</button>
                </div>
                <div className={style.section_row}>
                    <img src="src/assets/help.svg" alt="help"/>
                    <button onClick={() => onSelectSection("help")} className={style.overview_button}>Помощь</button>
                </div>
            </div>

            <button onClick={handleSave} className={style.overview_save_button}>
                <p>Сохранить</p>
                <p>Введите название</p>
            </button>
        </>

    )
}