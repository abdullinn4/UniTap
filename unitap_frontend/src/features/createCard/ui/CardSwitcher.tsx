import style from "./card-switcher.module.scss"
import type {TabType} from "../../../entities/types";

interface Props {
    activeTab: string,
    onSwitch: (tab: TabType) => void;
}
export const CardSwitcher = ({activeTab, onSwitch} : Props) => {
    return (
        <div className={style.switcher}>
            <button
                className={activeTab === "overview" ? style.active : ""}
                onClick={() => onSwitch("overview")}
            >
                Обзор
            </button>
            <button
                className={activeTab === "add" ? style.active: ""}
                onClick={() => onSwitch("add")}
            >
                Добавить
            </button>

        </div>
    )
}