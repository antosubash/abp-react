import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '../Shared/Avatar';
import { BoxSelect, Check } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '../Shared/DropdownMenu';
import { useRouter } from 'next/router';
import { Button } from '../Shared/Button';
import { useMemo } from 'react';
import { v4 } from 'uuid';
import { useCurrentUser } from '@abpreact/hooks';
import { USER_ROLE } from '../utils';

export const UserDropDown = () => {
    const session = useSession();
    const router = useRouter();
    const currentUser = useCurrentUser();
    const hasAdmin = currentUser?.roles?.includes(USER_ROLE.ADMIN);
    const picture = session.data?.user?.image;

    const menus = useMemo(() => {
        return [
            {
                link: '/admin',
                visible: hasAdmin,
                name: 'admin',
                seprator: false
            },
            {
                link: '/profile',
                visible: true,
                name: 'profile',
                seprator: true
            },
            {
                link: '/logout',
                visible: true,
                name: 'log out',
                seprator: false
            }
        ];
    }, [hasAdmin]);

    return (
        <div className="relative inline-block z-50">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                        <AvatarImage src={picture!} alt={currentUser?.name!} />
                        <AvatarFallback className="uppercase">
                            {currentUser?.name?.charAt(0) ?? ''}
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[10rem]">
                    {menus.map((m) => (
                        <DropdownMenuItem key={v4()}>
                            <Link
                                href={m.link}
                                passHref={true}
                                className="w-full block"
                            >
                                <Button
                                    fluid
                                    variant={
                                        router.asPath === m.link
                                            ? 'default'
                                            : 'subtle'
                                    }
                                >
                                    {m.name}
                                </Button>
                            </Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
