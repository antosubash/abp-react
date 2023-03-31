import { useEffect, useState } from 'react';
import { themeChange } from 'theme-change';

import { Button } from './Button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from './DropdownMenu';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
const ThemeSwitcher = () => {
    useEffect(() => {
        document.documentElement.setAttribute(
            'data-theme',
            getCurrentSelectedTheme()
        );
    }, []);

    const updateThemeSettings = (theme: string) => {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
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
                <Button size="sm" variant="subtle">
                    Theme
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <Button
                        variant="ghost"
                        onClick={() => updateThemeSettings('light')}
                    >
                        Light
                    </Button>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => updateThemeSettings('dark')}>
                    <Button
                        variant="ghost"
                        onClick={() => updateThemeSettings('light')}
                    >
                        Dark
                    </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Button
                        variant="ghost"
                        onClick={() => updateThemeSettings('cupcake')}
                    >
                        Cupcake
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ThemeSwitcher;
