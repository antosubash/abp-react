import { Policy, useGrantedPolicies } from '@abpreact/hooks';
import { v4 } from 'uuid';
import { Cog } from 'lucide-react';
import {
    AdjustmentsHorizontalIcon,
    PencilIcon,
    TrashIcon,
    CogIcon
} from '@heroicons/react/24/solid';
import { Button } from '../Shared/Button';
import {
    DropdownMenuTrigger,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem
} from '../Shared/DropdownMenu';
type PermissionActionsProps = {
    actions: Array<{
        icon: 'permission' | 'trash' | 'pencil' | 'features';
        callback: () => void;
        policy: Policy;
        visible?: boolean;
    }>;
};
export const PermissionActions = ({ actions }: PermissionActionsProps) => {
    const { can } = useGrantedPolicies();
    const renderElement = (action: (typeof actions)[0]) => {
        if (!can(action.policy) || action.visible) return false;

        return (
            <DropdownMenuItem key={v4()}>
                <Button
                    variant="subtle"
                    onClick={action.callback}
                    fluid
                    size="sm"
                >
                    {action.icon === 'permission' && (
                        <div className="flex items-center space-x-1">
                            <AdjustmentsHorizontalIcon
                                width={18}
                                height={18}
                                className="text-primary-content flex-1"
                            />
                            <span className="text-primary-content hidden sm:inline">
                                Permission
                            </span>
                        </div>
                    )}
                    {action.icon === 'trash' && (
                        <div className="flex items-center space-x-1">
                            <TrashIcon
                                width={18}
                                height={18}
                                className="text-primary-content flex-1"
                            />
                            <span className="text-primary-content hidden sm:inline">
                                Delete
                            </span>
                        </div>
                    )}
                    {action.icon === 'pencil' && (
                        <div className="flex items-center space-x-1">
                            <PencilIcon
                                width={18}
                                height={18}
                                className="text-primary-content flex-1"
                            />
                            <span className="text-primary-content hidden sm:inline">
                                Edit
                            </span>
                        </div>
                    )}
                    {action.icon === 'features' && (
                        <div className="flex items-center space-x-1">
                            <CogIcon
                                width={18}
                                height={18}
                                className="text-primary-content flex-1"
                            />
                            <span className="text-primary-content hidden sm:inline">
                                Settings
                            </span>
                        </div>
                    )}
                </Button>
            </DropdownMenuItem>
        );
    };
    return (
        <section className="flex items-center space-x-2">
            <DropdownMenu>
                <DropdownMenuTrigger key={v4()} asChild>
                    <Button
                        variant="subtle"
                        size="sm"
                        className="flex items-center space-x-1"
                    >
                        <Cog width={16} height={16} />
                        <span className="hidden sm:inline">Actions</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {actions.map(renderElement)}
                </DropdownMenuContent>
            </DropdownMenu>
        </section>
    );
};
