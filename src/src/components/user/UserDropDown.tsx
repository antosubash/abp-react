import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useCurrentUser } from '@/lib/hooks/useCurrentUser'
import { USER_ROLE } from '@/lib/utils'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { v4 } from 'uuid'

export const UserDropDown = () => {
  const router = useRouter()
  const currentUser = useCurrentUser()
  const hasAdmin = currentUser?.roles?.includes(USER_ROLE.ADMIN)

  const menus = useMemo(() => {
    return [
      {
        link: '/admin',
        visible: hasAdmin,
        name: 'admin',
        seprator: false,
      },
      {
        link: '/profile',
        visible: true,
        name: 'profile',
        seprator: true,
      },
      {
        link: '/logout',
        visible: true,
        name: 'log out',
        seprator: false,
      },
    ]
  }, [hasAdmin])

  return (
    <div className="relative z-50 inline-block">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage alt={currentUser?.name!} />
            <AvatarFallback className="uppercase">
              {currentUser?.name?.charAt(0) ?? ''}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[10rem]">
          {menus.map((m) => (
            <DropdownMenuItem key={v4()}>
              <Link href={m.link} passHref={true} className="block w-full">
                <Button variant={router.asPath === m.link ? 'default' : 'secondary'}>
                  {m.name}
                </Button>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
