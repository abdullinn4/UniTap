import {CardSwitcher, useCardSwitcher} from "../../features/createCard/ui/cardSwitcher";
import style from "../CreateCardPage/create-card-page.module.scss"
import {CardOverview} from "../../widgets/cardOverview";
import {useState} from "react";
import type {AddElementSectionType, ElementInstance, OverviewSectionType} from "../../entities/types";
import {CreateCardPanel} from "../../features/createCard/ui/createCardPanel";
import {CardAddElements} from "../../features/createCard/ui/addElementPanel/CardAddElements.tsx";
import type {DragEndEvent} from "@dnd-kit/core";
import {DndContext} from "@dnd-kit/core";
import {v4 as uuidv4} from "uuid";
import {getDefaultElementData} from "../../shared/utils";
import {ElementSettingsRouter} from "../../features/createCard/ui/createCardPanel/ElementSettingsRouter.tsx";

export const CreateCardPage = () => {
    const [activeTab, switchTab] = useCardSwitcher();
    const [activeOverviewSection, setActiveOverviewSection] = useState<OverviewSectionType | null>(null);
    const [activeAddElementSection, setActiveAddElementSection] = useState<AddElementSectionType | null>(null);
    const [elements, setElements] = useState<ElementInstance[]>([]);
    const [tempElements, setTempElements] = useState<Partial<Record<AddElementSectionType, ElementInstance>>>({});
    const [activeElementId, setActiveElementId] = useState<string | null>(null);

    const handleAddElement = (element: ElementInstance) => {
        setTempElements((prev) => ({
            ...prev,
            [element.type]: element,
        }));
    };
    const handleAddTempElement = (type: AddElementSectionType) => {
        const existing = tempElements[type];

        if (existing) {
            setActiveAddElementSection(type);
        } else {
            const newTemp: ElementInstance= {
                id: uuidv4(),
                type,
                data: getDefaultElementData(type),
            } as ElementInstance;
            setTempElements((prev) => ({...prev, [type]: newTemp}));
            setActiveAddElementSection(type);
        }
    };
    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;

        // Проверяем, был ли элемент перетащен в зону добавления
        if (!over || over.id !== 'add-element-dropzone') return;

        const draggedType = active.id as AddElementSectionType;
        const existing = tempElements[draggedType];

        const newElement: ElementInstance = existing ?? {
            id: uuidv4(),
            type: draggedType,
            data: getDefaultElementData(draggedType),
        } as ElementInstance;

        // Просто убираем из временных
        setTempElements((prev) => {
            const updated = {...prev};
            delete updated[draggedType];
            return updated;
        });
        setElements((prev) => [...prev, newElement]);

    };
    const handleSelectElement = (id: string) => {
        setActiveElementId(id);
        setActiveAddElementSection(null);
    }

    return (
        <main>
            <div className={style.create_card_wrapper}>
                <DndContext onDragEnd={handleDragEnd}>
                    <div className={style.left_panel}>
                        <CardSwitcher activeTab={activeTab} onSwitch={switchTab}/>
                        {activeTab === "overview" && <CardOverview onSelectSection={setActiveOverviewSection}/>}
                        {activeTab === "add" &&
                            <CardAddElements onSelectSection={handleAddTempElement}
                                             activeSection={activeAddElementSection}
                            />}
                    </div>

                    <div className={style.right_panel}>
                        {activeAddElementSection &&
                            tempElements[activeAddElementSection] && (
                                <ElementSettingsRouter
                                    type={activeAddElementSection}
                                    element={tempElements[activeAddElementSection]!}
                                    onBack={() => setActiveAddElementSection(null)}
                                    onSave={handleAddElement}/>
                            )}

                        {activeElementId && (() => {
                            const element = elements.find((elem) => elem.id === activeElementId);
                            if (!element) return null;

                            return (
                                <ElementSettingsRouter
                                    type={element.type}
                                    element={element}
                                    onBack={() => setActiveElementId(null)}
                                    onSave={(updated) => {
                                        setElements((prev) => prev.map((el) => el.id === updated.id ? updated : el));
                                    }}
                                />
                            );
                        })()}

                        {activeAddElementSection === null && activeElementId === null &&(
                            <CreateCardPanel
                                onAddElementClick={() => switchTab("add")}
                                onSelectElement={handleSelectElement}
                                elements={elements}
                                setElements={setElements}
                            />
                        )}
                    </div>
                </DndContext>
            </div>
        </main>
    );
};