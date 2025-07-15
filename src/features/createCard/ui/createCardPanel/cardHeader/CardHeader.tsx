import {useState} from "react";
import style from "../create-card-panel.module.scss"
import {useNavigate} from "react-router";
import {ExitModal} from "./ExitModal.tsx";
import {CardTopActions} from "./CardTopActions.tsx";

export const CardHeader = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showExitModal, setShowExitModal] = useState(false);

    //const navigate = useNavigate();

    return(
        <div className={style.create_card_header}>
            <button
                className={style.exit_button}
                onClick={() => setShowExitModal(true)}
            >
                <img src="src/assets/back.svg" alt="back button"/>
            </button>

            <p>Ваша визитка</p>

            <button
                className={style.top_actions_button}
                onClick={() => setShowDropdown(!showDropdown)}
            >
                <img src="src/assets/top_actions.svg" alt="..."/>
            </button>

            {showDropdown && <CardTopActions/>}

            {showExitModal && (
                <ExitModal
                    onClose = {() => setShowExitModal(false)}
                    onExit={() =>{}}
                    /*onExit = {() => navigate("")}*/
                />
            )}

        </div>
    )
}