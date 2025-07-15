import style from "../create-card-panel.module.scss"
export const CardTopActions = () => {
    return (
        <div className={style.card_dropdown}>
            <button
                className={style.dropdown_button}
            >
                <img src="src/assets/change_wallpapers.svg" alt="change wallpapers"/>
                Сменить обои
            </button>
            <button
                className={style.dropdown_button}
            >
                <img src="src/assets/change_cover.svg" alt="change cover"/>
                Сменить обложку
            </button>
            <button
                className={style.dropdown_button}
            >
                <img src="src/assets/delete.svg" alt="delete"/>
                Удалить
            </button>
        </div>
    )
}