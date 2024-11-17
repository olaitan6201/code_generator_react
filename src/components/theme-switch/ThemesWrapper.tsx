import { useState, useEffect } from 'react';
import { ThemeContext, themes } from '@/contexts/ThemeContext';

export default function ThemeContextWrapper({ children }: { children: React.ReactNode }) {
    const app_theme = localStorage.getItem('app-theme')
    const selected_theme = localStorage.getItem('selected-theme')
    let darkMode = false
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");

    if (!app_theme || selected_theme === 'system') {
        localStorage.setItem('selected-theme', 'system')
        if (darkThemeMq.matches) {
            darkMode = true
            localStorage.setItem('app-theme', themes.dark)
        }
        else {
            localStorage.setItem('app-theme', themes.light)
        }
    } else {
        darkMode = app_theme === themes.dark;
    }

    const [theme, setTheme] = useState(darkMode ? themes.dark : themes.light);

    const changeTheme = (theme: string) => {
        const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
        localStorage.setItem('selected-theme', theme)
        let isDarkMode = false
        if (theme === 'system') {
            isDarkMode = darkThemeMq.matches
        } else {
            isDarkMode = theme === themes.dark
        }
        const toTheme = isDarkMode ? themes.dark : themes.light
        localStorage.setItem('app-theme', toTheme)
        setTheme(toTheme);
    }

    useEffect(() => {
        switch (theme) {
            case themes.light:
                document.body.classList.add(themes.light);
                document.body.classList.remove(themes.dark);
                break;

            case themes.dark:
                document.body.classList.add(themes.dark);
                document.body.classList.remove(themes.light);
                break;

            default:
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme: theme, changeTheme: changeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}