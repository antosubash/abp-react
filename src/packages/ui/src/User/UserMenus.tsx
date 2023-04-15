import { UserDropDown } from './UserDropDown';
import { signIn, useSession } from 'next-auth/react';
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
            <div className="flex flex-col sm:flex-row items-center space-x-1">
                <Button
                    variant="subtle"
                    size="sm"
                    className="w-full mt-2 sm:w-1/2 sm:mt-0"
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
