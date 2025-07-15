import style from "../create-card-panel.module.scss"

interface QCProps {
    onClick: () => void;
}
export const QuickContactButton = ({onClick} : QCProps) => {
    return (
        <div className={style.quick_contact_wrapper}>
            <button
                onClick={onClick}
                className={style.qc_button}
            >
                <div className={style.qc_button_name}>
                    <p>Быстрая связь</p>
                    <p>Настройте средства связи с вами</p>
                </div>
                <img src="src/assets/quick_contact_button.svg" alt="/quick_contact_button icon"/>
            </button>

        </div>
    )
}
