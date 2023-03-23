import { useEffect, useState, useMemo, useCallback } from 'react';
import {
    IdentityUserUpdateDto,
    UserService,
    GetPermissionListResultDto,
    PermissionGroupDto,
    PermissionGrantInfoDto
} from '@abpreact/proxy';
import { useForm } from 'react-hook-form';
import { useToast } from '../Shared/hooks/useToast';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from '../Shared/DialogWrapper';
import { Button } from '../Shared/Button';
import { usePermissions } from '@abpreact/hooks';
import { PermissionProvider, Permissions, PermissionsGrant } from '../utils';
import { Permission } from '../Permission/Permission';
import { Label } from '../Shared/Label';
import classNames from 'classnames';
import { PermissionTracker } from '../User/UserPermission';
import { usePermissionsChanges } from './usePermissionChanges';

type IdentityManagementProps = {
    permissions: PermissionGrantInfoDto[];
};
export const IdentityManagement = ({
    permissions
}: IdentityManagementProps) => {
    const {
        hasAllSelected,
        onCurrentPermissionChanges,
        data,
        onHasAllSelectedUpate
    } = usePermissionsChanges({ permissions, type: 'identity' });

    return (
        <>
            <Permission
                name="Select All"
                isGranted={hasAllSelected}
                id="select_all"
                onUpdate={onHasAllSelectedUpate}
            />
            {data?.map(({ isGranted, displayName, parentName }, idx) => (
                <div key={idx}>
                    <Permission
                        name={displayName!}
                        isGranted={isGranted!}
                        id={displayName!
                            .toLocaleLowerCase()
                            .concat(parentName!)}
                        onUpdate={() => onCurrentPermissionChanges(idx)}
                        className={classNames('ml-5', {
                            'pl-5': parentName
                        })}
                    />
                </div>
            ))}
            <DialogFooter>
                <Button type="submit" variant="outline">
                    Save
                </Button>
            </DialogFooter>
        </>
    );
};
