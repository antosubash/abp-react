import { Policy, useGrantedPolicies } from '@/lib/hooks/useGrantedPolicies'
import { Cog, CogIcon, PencilIcon, Settings2, Trash } from 'lucide-react'
import { v4 } from 'uuid'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
type PermissionActionsProps = {
  actions: Array<{
    icon: 'permission' | 'trash' | 'pencil' | 'features'
    callback: () => void
    policy: Policy
    visible?: boolean
  }>
}
/**
 * Component that renders a dropdown menu with various action buttons based on the provided actions.
 * Each action is rendered as a button with an icon and a label, and is only visible if the user has the required policy.
 *
 * @param {PermissionActionsProps} props - The props for the component.
 * @param {Array} props.actions - The list of actions to be rendered in the dropdown menu.
 * @returns {JSX.Element} The rendered PermissionActions component.
 */
export const PermissionActions = ({ actions }: PermissionActionsProps) => {
  const { can } = useGrantedPolicies()
  const renderElement = (action: (typeof actions)[0]) => {
    if (!can(action.policy) || action.visible) return false

    return (
      <DropdownMenuItem key={v4()}>
        <Button onClick={action.callback}>
          {action.icon === 'permission' && (
            <div className="flex items-center space-x-1">
              <Settings2 width={18} height={18} className="text-primary-content flex-1" />
              <span className="text-primary-content hidden sm:inline">Permission</span>
            </div>
          )}
          {action.icon === 'trash' && (
            <div className="flex items-center space-x-1">
              <Trash width={18} height={18} className="text-primary-content flex-1" />
              <span className="text-primary-content hidden sm:inline">Delete</span>
            </div>
          )}
          {action.icon === 'pencil' && (
            <div className="flex items-center space-x-1">
              <PencilIcon width={18} height={18} className="text-primary-content flex-1" />
              <span className="text-primary-content hidden sm:inline">Edit</span>
            </div>
          )}
          {action.icon === 'features' && (
            <div className="flex items-center space-x-1">
              <CogIcon width={18} height={18} className="text-primary-content flex-1" />
              <span className="text-primary-content hidden sm:inline">Settings</span>
            </div>
          )}
        </Button>
      </DropdownMenuItem>
    )
  }
  return (
    <section className="flex items-center space-x-2">
      <DropdownMenu>
        <DropdownMenuTrigger key={v4()} asChild>
          <Button size="sm" className="flex items-center space-x-1">
            <Cog width={16} height={16} />
            <span className="hidden sm:inline">Actions</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>{actions.map(renderElement)}</DropdownMenuContent>
      </DropdownMenu>
    </section>
  )
}
