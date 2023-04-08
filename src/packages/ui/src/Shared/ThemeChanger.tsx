import { useEffect, useState } from 'react';

import { BoxSelect, Check, Palette } from 'lucide-react';
import { Button } from './Button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from './DropdownMenu';

const themes = ['light', 'dark', 'cupcake', 'dracula'];
const ThemeSwitcher = () => {
    const [currTheme, setCurrTheme] = useState<string>('');
    useEffect(() => {
        const t = getCurrentSelectedTheme();
        setCurrTheme(t);
        document.documentElement.setAttribute('data-theme', t);
    }, []);

    const updateThemeSettings = (theme: string) => {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
        setCurrTheme(theme);
    };

    const getCurrentSelectedTheme = () => {
        if (typeof window === 'undefined') return 'light';
        const selectedTheme = window.localStorage.getItem('theme');
        if (selectedTheme === null) return 'light';
        return selectedTheme;
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="sm" variant="subtle" className="w-[6rem]">
                    <span className="w-full inline-flex items-center justify-between">
                        <Palette width={16} height={16} />
                        <span className="capitalize">Theme</span>
                    </span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[10rem]">
                {themes.map((t) => (
                    <DropdownMenuItem key={t}>
                        <Button
                            fluid
                            variant={t === currTheme ? 'default' : 'subtle'}
                            onClick={() => updateThemeSettings(t)}
                        >
                            <span className="w-full inline-flex items-center justify-between">
                                {t === currTheme ? (
                                    <Check width={16} height={16} />
                                ) : (
                                    <BoxSelect width={16} height={16} />
                                )}
                                <span className="capitalize">{t}</span>
                            </span>
                        </Button>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ThemeSwitcher;
