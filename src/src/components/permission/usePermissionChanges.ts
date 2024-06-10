import { PermissionGrantInfoDto } from '@/client';
import { useEffect, useState, useCallback } from 'react';
import { Permissions } from '@/lib/utils';

export type UsePermissionsChangesProps = {
    permissions: PermissionGrantInfoDto[];
    type: 'identity' | 'tenant' | 'feature' | 'setting';
};

const helper = (
    data: PermissionGrantInfoDto[],
    selectedData: PermissionGrantInfoDto,
    permission: `${Permissions}`,
    setData: (data: PermissionGrantInfoDto[]) => void
) => {
    const parent = data.find((f) => !f.parentName && f.name === permission);
    const children = data.filter((f) => f.parentName === permission);

    if (selectedData.parentName === permission && parent) {
        if (selectedData.isGranted) {
            selectedData.isGranted = false;
            parent.isGranted = false;
        } else {
            selectedData.isGranted = true;
        }
        // If all the children got granted then updated the parent as well.
        if (!parent.isGranted) {
            const hasChildrenSelected = children.every((c) => c.isGranted);
            if (hasChildrenSelected) {
                parent.isGranted = true;
            }
        }
        setData([...data]);
        return false;
    }

    if (!selectedData.parentName && selectedData.name === permission) {
        if (parent && parent.isGranted) {
            parent.isGranted = false;
            children.forEach((c) => (c.isGranted = false));
        } else if (parent && !parent.isGranted) {
            parent.isGranted = true;
            children.forEach((c) => (c.isGranted = true));
        }
        setData([...data]);
    }
};

export const usePermissionsChanges = ({
    permissions,
    type
}: UsePermissionsChangesProps) => {
    // Flag determine to enable/disable the selected permissions to a user.
    const [hasAllSelected, setHasAllSelected] = useState(false);
    const [data, setData] = useState<PermissionGrantInfoDto[]>(permissions);

    const onCurrentPermissionChanges = useCallback(
        (idx: number) => {
            const selectedData = data[idx];

            // wait for all the events to get done, then check.
            setTimeout(() => {
                const allSelected = permissions.every((d) => d.isGranted);
                setHasAllSelected(allSelected);
            }, 0);

            if (type === 'identity') {
                helper(data, selectedData, Permissions.ROLES, setData);
                helper(data, selectedData, Permissions.USERS, setData);
            } else if (type === 'tenant') {
                helper(data, selectedData, Permissions.TENANTS, setData);
            } else if (type === 'feature') {
                helper(
                    data,
                    selectedData,
                    Permissions.MANAGE_HOST_FEATURES,
                    setData
                );
            } else if (type === 'setting') {
                helper(data, selectedData, Permissions.SETTINGS, setData);
            } else {
                throw new Error(
                    'usePermissionsChanges hook received an unknown type property!'
                );
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [permissions, type]
    );

    const onHasAllSelectedUpdate = useCallback(() => {
        setHasAllSelected((f) => {
            data.forEach((d) => (d.isGranted = !f));
            setData([...data]);
            return !f;
        });
    }, [data]);

    useEffect(() => {
        setHasAllSelected(permissions.every((d) => d.isGranted));
    }, [permissions]);

    return {
        hasAllSelected,
        data,
        onCurrentPermissionChanges,
		onHasAllSelectedUpdate
    };
};
