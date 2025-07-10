import style from "./header.module.scss";
export const Header = () => {
    return (
        <header>
            <div className={style.header_wrapper}>
                <div>
                    <img src="src/assets/Logo.svg" alt="Logo"/>
                </div>
                <div className={style.header_controls}>
                    <img src="src/assets/Search.svg" alt="Search"/>

                    <img src="src/assets/Language.svg" alt="Language"/>

                    <img src="src/assets/Avatar.svg" alt="Avatar"/>

                </div>
            </div>
        </header>
    )
}