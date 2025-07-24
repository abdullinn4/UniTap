import style from "./textElement/text-elem-panel.module.scss"

interface HeaderPanelProps {
    title: string;
    onBack: () => void;
    onDropdownClick: () => void;
    showDropdown: boolean;
}

export const HeaderPanel = ({title, onBack, onDropdownClick, showDropdown}: HeaderPanelProps) => {
    return (
        <div className={style.text_panel_header}>
            <button
                className={style.exit_button}
                onClick={onBack}
            >
                <img src="src/assets/back.svg" alt="back button"/>
            </button>

            <p>{title}</p>

            <div>
                <button
                    className={style.top_actions_button}
                    onClick={onDropdownClick}
                >
                    <img src="src/assets/top_actions.svg" alt="..."/>
                </button>
            </div>
        </div>
    );
};
