import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '../Shared/Avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from '../Shared/DropdownMenu';
import { useRouter } from 'next/router';
export const UserDropDown = () => {
    const session = useSession();
    const router = useRouter();

    const hasAdmin = session.data?.user?.userRole?.includes('admin');
    const picture = session.data?.user?.image;
    const name = session?.data?.user?.name;

    return (
        <div className="relative inline-block z-50">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                        <AvatarImage src={picture!} alt={name!} />
                        <AvatarFallback>V</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuGroup>
                        <DropdownMenuItem className="hover:bg-gray-600 transition">
                            <Link
                                href="/admin"
                                passHref={true}
                                className="px-4 py-2 text-md text-white"
                            >
                                Admin
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-gray-600 transition">
                            <Link
                                href="/profile"
                                passHref={true}
                                className="px-4 py-2 text-md text-white"
                            >
                                Profile
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="hover:bg-gray-600 transition">
                        <Link
                            href="#"
                            passHref={true}
                            className="px-4 py-2 text-md text-white"
                            onClick={() => {
                                router.push('/logout');
                            }}
                        >
                            Log out
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
