import { DialogFooter } from '../Shared/DialogWrapper';
import { Button } from '../Shared/Button';

import { Permission } from '../Permission/Permission';

import classNames from 'classnames';

import {
    usePermissionsChanges,
    UsePermissionsChangesProps
} from './usePermissionChanges';
import { PermissionGrantInfoDto } from '@abpreact/proxy';

type TogglePermissionProps = UsePermissionsChangesProps & {
    hideSelectAll?: boolean;
    hideSave?: boolean;
    onSelectedUpdate?: (permissionDto: PermissionGrantInfoDto) => void;
};
export const TogglePermission = ({
    permissions,
    type,
    hideSelectAll,
    hideSave,
    onSelectedUpdate
}: TogglePermissionProps) => {
    const {
        hasAllSelected,
        onCurrentPermissionChanges,
        data,
        onHasAllSelectedUpate
    } = usePermissionsChanges({ permissions, type });

    return (
        <>
            {!hideSelectAll && (
                <Permission
                    name="Select All"
                    isGranted={hasAllSelected}
                    id="select_all"
                    onUpdate={onHasAllSelectedUpate}
                />
            )}
            {data?.map((dto: PermissionGrantInfoDto, idx) => (
                <div key={idx}>
                    <Permission
                        name={dto.displayName!}
                        isGranted={dto.isGranted!}
                        id={dto
                            .displayName!.toLocaleLowerCase()
                            .concat(dto.parentName!)}
                        onUpdate={() => {
                            onCurrentPermissionChanges(idx);
                            if (onSelectedUpdate) {
                                onSelectedUpdate(dto);
                            }
                        }}
                        className={classNames('ml-5', {
                            'pl-5': dto.parentName
                        })}
                    />
                </div>
            ))}
            {!hideSave && (
                <DialogFooter>
                    <Button type="submit" variant="outline">
                        Save
                    </Button>
                </DialogFooter>
            )}
        </>
    );
};
