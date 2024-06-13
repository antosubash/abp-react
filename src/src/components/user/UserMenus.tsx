import { Button } from '@/components/ui/button'
import useSession from '@/useSession'
import { UserDropDown } from './UserDropDown'
export interface UserMenusProps {}

export const UserMenus = ({}: UserMenusProps) => {
  var { data: session } = useSession()
  const renderElement = () => {
    if (session?.isLoggedIn) {
      return <UserDropDown />
    }

    return (
      <div className="flex flex-col items-center space-x-1 sm:flex-row">
        <Button
          size="sm"
          className="mt-2 w-full sm:mt-0 sm:w-1/2"
          onClick={() => {
            location.href = '/admin/login'
          }}
        >
          Login
        </Button>
        <Button
          className="mt-2 w-full sm:mt-0 sm:w-1/2"
          size="sm"
          onClick={() =>
            (location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/Account/Register`)
          }
        >
          Register
        </Button>
      </div>
    )
  }
  return <div className="flex items-center justify-center">{renderElement()}</div>
}
