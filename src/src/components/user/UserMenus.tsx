import React from 'react';
import { UserDropDown } from './UserDropDown';
import { Button } from '@/components/ui/button';
import useSession from '@/useSession';
export interface UserMenusProps {}

export const UserMenus = ({}: UserMenusProps) => {
    var session = useSession();
    const renderElement = () => {
        if (session.session?.isLoggedIn) {
            return <UserDropDown />;
        }

        return (
            <div className="flex flex-col sm:flex-row items-center space-x-1">
                <Button
                    size="sm"
                    className="w-full mt-2 sm:w-1/2 sm:mt-0"
                    onClick={() => {
                        location.href = "/admin/login";
                    }}
                >
                    Login
                </Button>
                <Button
                    className="w-full mt-2 sm:w-1/2 sm:mt-0"
                    size="sm"
                    onClick={() =>
                        (location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/Account/Register`)
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
