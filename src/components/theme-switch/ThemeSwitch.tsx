import { ThemeContext, themes } from "@/contexts/ThemeContext";
import { useState } from "react";
import { BsSun, BsMoon } from "react-icons/bs";
import { MdMonitor } from "react-icons/md";
import DropDown from "@/components/drop-down/DropDown";

export default function ThemeSwitch() {
    const [selectedTheme, setSelectedTheme] = useState(localStorage.getItem('selected-theme') || 'system');

    const setAppTheme = (event: (theme: string) => void, theme: string) => {
        setSelectedTheme(theme)
        event(theme)
    }

    const dropDownData = [
        {
            Icon: BsSun,
            text: 'Light',
            value: themes.light
        },
        {
            Icon: BsMoon,
            text: 'Dark',
            value: themes.dark
        },
        {
            Icon: MdMonitor,
            text: 'System',
            value: themes.system
        }
    ]

    return (
        <ThemeContext.Consumer>
            {({ changeTheme }) => (
                <DropDown
                    width="w-36"
                    data={dropDownData}
                    defaultValue={selectedTheme}
                    display="icon"
                    onSelect={(e) => setAppTheme(changeTheme, `${e.value}`)}
                />
            )}
        </ThemeContext.Consumer>
    )
}
