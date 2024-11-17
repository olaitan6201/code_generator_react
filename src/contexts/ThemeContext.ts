import { createContext } from "react";

export const themes = {
    dark: "dark-mode",
    light: "light-mode",
    system: "system",
};

export const ThemeContext = createContext({
    theme: themes.dark,
    changeTheme: (theme: string) => { if (!theme) return; },
});