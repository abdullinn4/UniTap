import React, {useState} from "react";
import style from "../create-card-panel.module.scss"

interface TagsProps{
    value: string[];
    onChange: (value: string[]) => void;
}
export const TagsInput = ({value, onChange} : TagsProps) => {
    const[input, setInput] = useState("")
    const [isFocused, setIsFocused] = useState(false);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && input.trim()){
            e.preventDefault();
            const newTag = input.trim();
            if (!value.includes(newTag)){
                onChange([...value,newTag])
            }
            setInput("");
        }

    }

    const handleRemove = (indexToRemove: number) => {
        const updatedTags = value.filter((_, i) => i !== indexToRemove);
        onChange(updatedTags);
    };

    const handleClearAll = () => {
        onChange([]);
    };

    return (
            <div className={style.tags_container}>
                {value.map((tag, index) => (
                    <div key={index} className={style.tag_chip}>
                        <span>{tag}</span>
                        <button
                            type="button"
                            onClick={() => handleRemove(index)}
                            className={style.remove_tag_button}
                        >
                            ×
                        </button>
                    </div>
                ))}
                <input
                    name="tags"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className={style.tag_input}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={value.length === 0 || isFocused ? "Добавьте теги" : ""}
                />
                {value.length > 0 && (
                    <button
                        type="button"
                        onClick={handleClearAll}
                        className={style.clear_all_button}
                        title="Удалить все"
                    >
                        ×
                    </button>
                )}
            </div>

    );

}