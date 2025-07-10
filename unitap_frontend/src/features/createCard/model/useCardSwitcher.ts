import {useState} from "react";
import type {TabType} from "../../../entities/types";

export const useCardSwitcher = () => {
    const [activeTab, setActiveTab] = useState<TabType>('overview');

    const switchTab = (tab: TabType) => setActiveTab(tab);

    return [activeTab, switchTab];
}