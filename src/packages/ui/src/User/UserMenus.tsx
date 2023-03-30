import React from 'react';
import { UserDropDown } from './UserDropDown';
import { signIn, signOut, useSession } from 'next-auth/react';
import { getCookie } from 'cookies-next';
import { Button } from '../Shared/Button';
export interface UserMenusProps {}

export const UserMenus = ({}: UserMenusProps) => {
    var session = useSession();
    const renderElement = () => {
        if (session.data) {
            return <UserDropDown />;
        }

        return (
            <div className="space-x-2">
                <Button
                    variant="subtle"
                    onClick={() => {
                        signIn('openiddict', undefined, {
                            __tenant: getCookie('__tenant') as string
                            // prompt: "login",
                        });
                    }}
                >
                    Login
                </Button>
                <Button
                    variant="subtle"
                    onClick={() =>
                        (location.href = `${process.env.NEXT_PUBLIC_API_URL}/Account/Register`)
                    }
                >
                    Register
                </Button>
            </div>
        );
    };
    return (
        <div className="flex justify-center items-center">
            {renderElement()}
        </div>
    );
};
