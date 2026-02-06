import { SunIcon } from "@heroicons/react/20/solid";
import { MoonIcon } from "@heroicons/react/20/solid";
import { themeStore } from '../../store/ThemeStore';
import { observer } from "mobx-react-lite";
import HeaderIcon from "../NavBar/HeaderIcon";

const ThemeToggle = observer(() => {
    const {theme, toggleTheme} = themeStore
  
    return (
    <HeaderIcon>
        <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
            {theme === 'dark' ?
                <MoonIcon className="h-6 w-6" />
            :
                <SunIcon className="h-6 w-6" />
            }
        </button>
    </HeaderIcon>
  )
})

export default ThemeToggle