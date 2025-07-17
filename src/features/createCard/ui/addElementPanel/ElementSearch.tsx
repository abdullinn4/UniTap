import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import {useEffect} from "react";
import style from "./card-add-elements.module.scss";
interface Props{
    query: string;
    onQueryChange: (val: string) => void;
}
export const ElementSearch = ({query, onQueryChange} : Props) => {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();

    const handleVoiceSearch = () => {
        if (!browserSupportsSpeechRecognition) {
            alert("Ваш браузер не поддерживает голосовой ввод");
            return;
        }
        if (listening) {
            SpeechRecognition.stopListening();
        } else {
            resetTranscript();
            SpeechRecognition.startListening({ language: "ru-RU", continuous: false });
        }
    };

    useEffect(() => {
        if (transcript && transcript !== query) {
            onQueryChange(transcript);
        }
    }, [transcript, onQueryChange]);

    return (
        <div className={style.search_wrapper}>
            <img src="src/assets/search_outline_16.svg" alt="search_icon"/>
            <input
                type="text"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder="Поиск"
                className={style.search_input}
            />
            <button onClick={handleVoiceSearch} className={style.voice_button}>
                <img src="src/assets/voice_outline_24.svg" alt="voice_icon"/>
            </button>
        </div>
    );


}