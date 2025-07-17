import {CardSwitcher} from "../../features/createCard/ui/cardSwitcher";
import {useCardSwitcher} from "../../features/createCard/ui/cardSwitcher";
import style from "../CreateCardPage/create-card-page.module.scss"
import {CardOverview} from "../../widgets/cardOverview";
import {useState} from "react";
import type {AddElementSectionType, CardElement, OverviewSectionType} from "../../entities/types";
import {CreateCardPanel} from "../../features/createCard/ui/createCardPanel";
import {CardAddElements} from "../../features/createCard/ui/addElementPanel/CardAddElements.tsx";
import {DndContext} from "@dnd-kit/core";

export const CreateCardPage = () => {
    const [activeTab, switchTab] = useCardSwitcher();
    const [activeOverviewSection, setActiveOverviewSection] = useState<OverviewSectionType | null>(null);
    const [activeAddSection, setActiveAddSection] = useState<AddElementSectionType | null>(null);
    const [addedElementSections, setAddedElementSections] = useState<AddElementSectionType[]>([]);
    const [selectedElementId, setSelectedElementId] = useState<string | null>(null);

    const handleAddElementClick = () => {
        switchTab("add");
    };

    const handleDragEnd = (event: any) => {
        const { over, active } = event;
        if (over?.id === 'add-element-dropzone') {
            const type = active.id as AddElementSectionType;
            if (!addedElementSections.includes(type)) {
                setAddedElementSections(prev => [...prev, type]);
            }
        }
    };

    return (
        <main>
            <div className={style.create_card_wrapper}>
                <DndContext onDragEnd={handleDragEnd}>
                    <div className={style.left_panel}>
                        <CardSwitcher activeTab={activeTab} onSwitch={switchTab}/>
                        {activeTab === "overview" && (<CardOverview onSelectSection={setActiveOverviewSection}/>)}
                        {activeTab === "add" && <CardAddElements onSelectSection={setActiveAddSection}/>}
                    </div>

                    <div className={style.right_panel}>
                        {!activeOverviewSection && (
                            <CreateCardPanel
                                onAddElementClick={handleAddElementClick}
                                addedElementSections={addedElementSections}
                                setAddedElementSections={setAddedElementSections}
                            />
                        )}
                    </div>
                </DndContext>
            </div>
        </main>
    )
}