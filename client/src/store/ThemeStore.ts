import { autorun, makeAutoObservable } from "mobx"

enum Themes {
    Light = 'light',
    Dark = 'dark'
}

class ThemeStore {
    theme = Themes.Light

    constructor() {
        makeAutoObservable(this)

        const saved = localStorage.getItem('theme') as Themes | null;
        if (saved && Object.values(Themes).includes(saved)) {
            this.theme = saved;
        }

        this.applyThemeToDOM();

        autorun(() => {
            localStorage.setItem('theme', this.theme);
            this.applyThemeToDOM();
        });
    }

    changeTheme(theme: Themes) {
        this.theme = theme
    }

    toggleTheme = () => {
        this.theme = this.theme === Themes.Light ? Themes.Dark : Themes.Light;
    };

    private applyThemeToDOM() {
        if (this.theme === Themes.Dark) {
            document.documentElement.classList.add('dark');
            document.documentElement.setAttribute('data-bs-theme', Themes.Dark);
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.setAttribute('data-bs-theme', Themes.Light);
        }
    }
}

export const themeStore = new ThemeStore()