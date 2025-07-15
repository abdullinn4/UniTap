import {CardSwitcher} from "../../features/createCard/ui/cardSwitcher";
import {useCardSwitcher} from "../../features/createCard/ui/cardSwitcher";
import style from "../CreateCardPage/create-card-page.module.scss"
import {CardOverview} from "../../widgets/cardOverview";
import {useState} from "react";
import type {SectionType} from "../../entities/types";
import {CreateCardPanel} from "../../features/createCard/ui/createCardPanel";

export const CreateCardPage = () => {
    const [activeTab, switchTab] = useCardSwitcher();
    const [activeSection, setActiveSection] = useState<SectionType>(null);

    return (
        <main>
            <div className={style.create_card_wrapper}>
                <div className={style.left_panel}>
                    <CardSwitcher activeTab={activeTab} onSwitch={switchTab}/>
                    {activeTab === "overview" && (<CardOverview onSelectSection={setActiveSection}/>)}
                    {/*{activeTab === "add" && <CardAddElements/>}*/}
                </div>
                <div className={style.right_panel}>
                    {/*{activeSection === "settings" && <SettingsPanel />}
                    {activeSection === "viewer" && <ViewerPanel />}
                    {activeSection === "help" && <HelpPanel />}*/}
                    {!activeSection && <CreateCardPanel/>}
                </div>
            </div>
        </main>
    )
}