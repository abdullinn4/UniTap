import style from "./create-card-panel.module.scss"
import {CardHeader} from "./cardHeader/CardHeader.tsx";
import {UploadArea} from "./uploadArea/UploadArea.tsx";
import {AvatarBrandBlock} from "./uploadArea/AvatarBrandBlock.tsx";
import {QuickContactButton} from "./quickContactButton/QuickContactButton.tsx";
import {useState} from "react";
import {BasicInfoForm} from "./basicInfo/BasicInfoForm.tsx";
export const CreateCardPanel = () => {
    const [isQContactOpen, setQContactOpen] = useState(false);

    return (
        <>
            {isQContactOpen ? (
                <>
                    <QuickContactPanel onClose={() => setQContactOpen(false)} />
                </>
            ) : (
                <>
                    <CardHeader/>
                    <div className={style.data_wrapper}>
                        <UploadArea/>
                        <AvatarBrandBlock/>
                        <QuickContactButton onClick={() => setQContactOpen(true)}/>
                        <BasicInfoForm/>
                    </div>
                </>
            )}
        </>
    )
}