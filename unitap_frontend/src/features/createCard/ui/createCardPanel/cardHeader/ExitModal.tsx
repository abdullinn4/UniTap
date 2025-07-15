import style from "../create-card-panel.module.scss"
interface Props{
    onClose: () => void;
    onExit: () => void
}
export const ExitModal = ({onClose, onExit} : Props) => {
    return(
        <div className={style.modal_overlay}>
            <div className={style.exit_modal}>
                <p>Вы действительно хотите выйти?</p>
                <p>Все изменения будут удалены</p>

                <div className={style.exit_modal_buttons_wrapper}>
                    <button
                        className={style.exit_modal_cancel_button}
                        onClick={onClose}>
                        Отмена
                    </button>
                    <button
                        className={style.exit_modal_exit_button}
                        onClick={onExit}>
                        Выйти
                    </button>
                </div>
            </div>
        </div>
    )
}