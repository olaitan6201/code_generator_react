import { ThemeContext, themes } from "@/contexts/ThemeContext";
import { useState } from "react";
import { BsFillSunFill, BsMoonFill, BsSun, BsMoon } from "react-icons/bs";
import String from "@/components/String";

export default function OldThemeSwitch() {
    const app_theme = localStorage.getItem('app-theme')
    const [darkMode, setDarkMode] = useState(app_theme === themes.dark);
    const setAppTheme = (dark_mode: boolean, event = (theme: string) => { if (!theme) return }) => {
        setDarkMode(dark_mode)
        event(dark_mode ? themes.dark : themes.light)
    }

    return (
        <div className="w-11/12 flex justify-center items-center p-1 theme-switch rounded-md border mt-2">
            <ThemeContext.Consumer>
                {({ changeTheme }) => (
                    <div className="flex w-full space-x-2 justify-around">
                        <>
                            <button type="button" className={`theme-switch-button ${!darkMode && 'active'}`} onClick={() => setAppTheme(false, changeTheme)}>
                                {darkMode ? <BsSun /> : <BsFillSunFill />}
                                <span><String txtKey="Light" /></span>
                            </button>
                            <button type="button" className={`theme-switch-button ${darkMode && 'active'}`} onClick={() => setAppTheme(true, changeTheme)}>
                                {darkMode ? <BsMoonFill /> : <BsMoon />}
                                <span><String txtKey="Dark" /></span>
                            </button>
                        </>
                    </div>
                )}
            </ThemeContext.Consumer>
        </div>
    )
}
