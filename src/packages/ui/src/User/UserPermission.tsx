import { useEffect, useState, useMemo, useCallback, FormEvent } from 'react';
import {
    IdentityUserUpdateDto,
    PermissionGroupDto,
    PermissionGrantInfoDto,
    PermissionsService,
    UpdatePermissionsDto
} from '@abpreact/proxy';
import { v4 } from 'uuid';
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
import { PermissionProvider } from '../utils';
import { Permission } from '../Permission/Permission';
import { Label } from '../Shared/Label';
import classNames from 'classnames';
import { IdentityManagement } from '../Permission/IdentityManagement';
import { TenantManagement } from '../Permission/TenantManagement';
import { SettingManagement } from '../Permission/SettingManagement';
import { FeatureManagement } from '../Permission/FeatureManagement';

type UserPermissionProps = {
    userDto: IdentityUserUpdateDto;
    userId: string;
    onDismiss: () => void;
};

export type PermissionTracker = {
    name: string;
    isGranted: boolean;
};
export const UserPermission = ({
    userDto,
    userId,
    onDismiss
}: UserPermissionProps) => {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    // flag determine to enable/disable all the permissions to a user.
    const [hasAllGranted, setHasAllGranted] = useState(false);
    const [currentPermissionGrant, setCurrentPermissionGrant] = useState<{
        name: 'identity' | 'tenants' | 'settings' | 'features';
        data: PermissionGrantInfoDto[] | null;
    }>();
    const { data } = usePermissions(PermissionProvider.NAME, userId);
    const [permissionGroups, setPermissionGroups] = useState<
        PermissionGroupDto[]
    >([]);

    useEffect(() => {
        setOpen(true);
    }, []);

    // Update the local state with the remote data and set the view by default management
    useEffect(() => {
        if (data?.groups) {
            setPermissionGroups([...data?.groups]);
            // by default assign first permissions
            const firstPermissionSet = data?.groups[0];
            setCurrentPermissionGrant({
                name: 'identity',
                data: firstPermissionSet.permissions ?? []
            });
        }
    }, [data]);

    // check if user have all the permissions are granted already.
    useEffect(() => {
        if (permissionGroups.length > 0) {
            const hasAllPermissionGranted = permissionGroups
                .map((g) => g.permissions?.every((p) => p.isGranted))
                .every((e) => e);
            if (hasAllPermissionGranted)
                setHasAllGranted(hasAllPermissionGranted);
        }
    }, [permissionGroups]);

    useEffect(() => {
        if (permissionGroups.length > 0) {
            permissionGroups.forEach((g) => {
                g.permissions?.forEach((p) => {
                    p.isGranted = hasAllGranted ? true : false;
                });
            });
            setPermissionGroups([...permissionGroups]);
        }
    }, [hasAllGranted]);

    const switchManagement = useCallback(
        (index: number) => {
            if (permissionGroups) {
                if (hasAllGranted) {
                    const allPermissionSelected = permissionGroups
                        .map((g) => g.permissions?.every((p) => p.isGranted))
                        .every((v) => v);
                    if (allPermissionSelected) {
                        setHasAllGranted(allPermissionSelected);
                        return;
                    }
                }

                const management = permissionGroups[index];
                const managementName = management.displayName;

                if (managementName?.toLowerCase()?.includes('identity')) {
                    setCurrentPermissionGrant({
                        name: 'identity',
                        data: management?.permissions!
                    });
                    return false;
                }

                if (managementName?.toLowerCase()?.includes('tenant')) {
                    setCurrentPermissionGrant({
                        name: 'tenants',
                        data: management?.permissions!
                    });
                    return false;
                }
                if (managementName?.toLowerCase()?.includes('feature')) {
                    setCurrentPermissionGrant({
                        name: 'features',
                        data: management?.permissions!
                    });
                    return false;
                }
                if (managementName?.toLowerCase()?.includes('setting')) {
                    setCurrentPermissionGrant({
                        name: 'settings',
                        data: management?.permissions!
                    });
                    return false;
                }
            }
        },
        [permissionGroups]
    );

    const onSubmit = useCallback(
        async (e: FormEvent) => {
            e.preventDefault();
            const payload = permissionGroups
                ?.map((p) =>
                    p!.permissions!.map((grant) => ({
                        name: grant.name,
                        isGranted: grant.isGranted
                    }))
                )
                .flat();
            const requestPayload: UpdatePermissionsDto = {
                permissions: payload
            };
            try {
                await PermissionsService.permissionsUpdate(
                    PermissionProvider.NAME,
                    userId,
                    requestPayload
                );
                toast({
                    title: 'Success',
                    description: 'Permission Updated Successfully',
                    variant: 'default'
                });
                onCloseEvent();
            } catch (err: unknown) {
                if (err instanceof Error) {
                    toast({
                        title: 'Failed',
                        description: "Permission update wasn't successfull.",
                        variant: 'destructive'
                    });
                }
            }
        },
        [permissionGroups]
    );

    const onCloseEvent = useCallback(() => {
        setOpen(false);
        onDismiss();
    }, []);

    return (
        <Dialog open={open} onOpenChange={onCloseEvent}>
            <DialogContent className="text-white">
                <DialogHeader>
                    <DialogTitle>Permissions - {userDto.userName}</DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit}>
                    <Permission
                        name="Grant All Permissions"
                        isGranted={hasAllGranted}
                        id="all_granted"
                        onUpdate={() => {
                            setHasAllGranted((f) => !f);
                        }}
                        className="ml-2"
                    />
                    {!hasAllGranted && (
                        <section className="flex pt-5 flex-col">
                            <section className="flex flex-col">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 justify-center content-center">
                                    {permissionGroups?.map(
                                        (
                                            permission: PermissionGroupDto,
                                            idx: number
                                        ) => (
                                            <div
                                                key={idx}
                                                className={classNames({
                                                    'bg-slate-400':
                                                        currentPermissionGrant?.data ===
                                                        permission?.permissions
                                                })}
                                            >
                                                <Button
                                                    variant="link"
                                                    className="w-full"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        switchManagement(idx);
                                                    }}
                                                >
                                                    <Label>
                                                        {
                                                            permission?.displayName
                                                        }
                                                    </Label>
                                                </Button>
                                            </div>
                                        )
                                    )}
                                </div>
                            </section>
                            <hr className="border-b-white mt-5 mb-5" />
                            <section className="flex flex-col space-y-1 mt-3">
                                {currentPermissionGrant?.name ===
                                    'identity' && (
                                    <IdentityManagement
                                        permissions={
                                            currentPermissionGrant?.data!
                                        }
                                    />
                                )}

                                {currentPermissionGrant?.name === 'tenants' && (
                                    <TenantManagement
                                        permissions={
                                            currentPermissionGrant?.data!
                                        }
                                    />
                                )}
                                {currentPermissionGrant?.name ===
                                    'settings' && (
                                    <SettingManagement
                                        permissions={
                                            currentPermissionGrant?.data!
                                        }
                                    />
                                )}
                                {currentPermissionGrant?.name ===
                                    'features' && (
                                    <FeatureManagement
                                        permissions={
                                            currentPermissionGrant?.data!
                                        }
                                    />
                                )}
                            </section>
                        </section>
                    )}
                    {hasAllGranted && (
                        <>
                            <section className="grid grid-cols-2 gap-2 mt-2">
                                {permissionGroups.map((group) => (
                                    <div key={v4()}>
                                        <h3>{group.displayName}</h3>
                                        <hr className="border-b-white mt-5 mb-5" />
                                        {group?.permissions?.map((p) => (
                                            <div key={v4()}>
                                                <Permission
                                                    name={p.displayName!}
                                                    isGranted
                                                    disabled
                                                    id={
                                                        p.name?.concat(
                                                            `_${group.displayName}`
                                                        ) as string
                                                    }
                                                    className={classNames(
                                                        'ml-2',
                                                        {
                                                            'pl-5': p.parentName
                                                        }
                                                    )}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </section>
                            <DialogFooter>
                                <Button type="submit" variant="outline">
                                    Save
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </form>
            </DialogContent>
        </Dialog>
    );
};
