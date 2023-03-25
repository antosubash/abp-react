import classNames from 'classnames';
import { useCallback, memo } from 'react';
import { Checkbox } from '../Shared/Checkbox';

export type Management = 'identity' | 'tenant' | 'setting' | 'feature';
export type PermissionTracker = {
    name: string;
    isGranted: boolean;
};

type PermissonProps = {
    name: string;
    id: string;
    isGranted: boolean;
    onUpdate?: () => void;
    className?: string;
    disabled?: boolean;
};

function PermissionToggle({
    name,
    id,
    onUpdate,
    className,
    isGranted,
    disabled
}: PermissonProps) {
    const onChangeEvent = useCallback(() => {
        onUpdate?.();
    }, []);

    return (
        <div
            className={classNames(
                'flex items-center space-x-2 pb-2',
                className
            )}
        >
            <Checkbox
                id={id}
                onCheckedChange={onChangeEvent}
                checked={isGranted}
                disabled={disabled}
            />
            <label
                htmlFor={id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
                {name}
            </label>
        </div>
    );
}

export const Permission = memo(PermissionToggle);
