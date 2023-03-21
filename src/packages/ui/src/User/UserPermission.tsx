import { useEffect, useState, useMemo, useCallback } from "react";
import { IdentityUserUpdateDto, UserService, GetPermissionListResultDto, PermissionGroupDto, PermissionGrantInfoDto } from "@abpreact/proxy";
import { useForm } from "react-hook-form";
import { v4 } from 'uuid';
import { useToast } from "../Shared/hooks/useToast";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../Shared/DialogWrapper";
import { Button } from "../Shared/Button";
import {  usePermissions } from "@abpreact/hooks";
import { PermissionProvider, Permissions, PermissionsGrant } from '../utils';
import { Permission  } from "../Permission/Permission";
import { Label } from "../Shared/Label";
import classNames from "classnames";
import { IdentityManagement } from "../Permission/IdentityManagement";
import { TenantManagement } from '../Permission/TenantManagement';
import { SettingManagement } from '../Permission/SettingManagement';
import { FeatureManagement } from '../Permission/FeatureManagement';


type UserPermissionProps = {
    userId: string;
    userDto: IdentityUserUpdateDto;
    onDismiss: () => void;
}

export type PermissionTracker = {
    name: string;
    isGranted: boolean;
}
export const UserPermission = ({userDto, userId, onDismiss}: UserPermissionProps) => {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const { handleSubmit, register } = useForm();
    

    // flag determine to enable/disable all the permissions to a user. 
    const [hasAllGranted, setHasAllGranted] = useState(false);

    const [currentPermissionGrant, setCurrentPermissionGrant] = useState<{name: 'identity' | 'tenants' | 'settings' | 'features', data: PermissionGrantInfoDto[] | null}>();

    // This object will be send to the server api
    const [permissionRemotePayload, setPermissionRemotePayload] = useState<{permissions: PermissionTracker[]}>({permissions: []});

    const { data } = usePermissions(PermissionProvider.NAME, PermissionProvider.KEY);
    const [permissionGroups, setPermissionGroups] = useState<PermissionGroupDto[]>([]);

    useEffect(() => {
        setOpen(true);
    }, []);

    useEffect(() => {
        if(data?.groups) {
            const localPermissionPayload = data?.groups?.map(p => p?.permissions?.map(grant => ({name: grant.name, isGranted: grant.isGranted}))).flat();
            permissionRemotePayload.permissions = localPermissionPayload as PermissionTracker[];
            setPermissionRemotePayload({...permissionRemotePayload});
            setPermissionGroups([...data?.groups]);
        }
    }, [data])

    const allSelected = useMemo(() => {
       const hasAllPermissionGranted = permissionRemotePayload.permissions.every(l => l?.isGranted);
       setHasAllGranted(hasAllPermissionGranted);
       return hasAllPermissionGranted
    }, [permissionRemotePayload]);



    useEffect(() => {
        if(permissionGroups.length > 0) {
            // by default assign first permissions
            const firstPermissionSet = permissionGroups[0];
            setCurrentPermissionGrant({name: 'identity', data: firstPermissionSet.permissions ?? []});
          
        }
        
    }, [permissionGroups])

   

    const switchManagement = useCallback((index: number) => {
        if(permissionGroups) {
            const management = permissionGroups[index];
            const managementName = management.displayName

            if(managementName?.toLowerCase()?.includes('identity')) {
                setCurrentPermissionGrant({name: 'identity', data: management?.permissions!});
                return false;
            }
          
            if(managementName?.toLowerCase()?.includes('tenant')) {
                setCurrentPermissionGrant({name: 'tenants', data: management?.permissions!});
                return false;
            }
            if(managementName?.toLowerCase()?.includes('feature')) {
                setCurrentPermissionGrant({name: 'features', data: management?.permissions!});
                return false;
            }
            if(managementName?.toLowerCase()?.includes('setting')) {
                setCurrentPermissionGrant({name: 'settings', data: management?.permissions!});
                return false;
            }
        }
    }, [permissionGroups]);

    const onSubmit = useCallback(async (data: unknown) => {
        console.log(data, 'data')
        
    }, []);

    const onCloseEvent = useCallback(() => {
        setOpen(false);
        onDismiss();
    }, [open]);

    
    return (
        <Dialog open={open} onOpenChange={onCloseEvent}>
            <DialogContent className="text-white">
            <DialogHeader>
                <DialogTitle>Permissions - {userDto.userName}</DialogTitle>
            </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Permission name="Grant All Permissions"
                        isGranted={hasAllGranted} 
                        id="all_granted" 
                        onUpdate={() => setHasAllGranted(f => !f)}
                        className="ml-2"
                    />
                    {!hasAllGranted && (
                        <section className="flex pt-5 flex-col">
                            <section className="flex flex-col space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 justify-center content-center">
                                    {permissionGroups?.map(((permission: PermissionGroupDto, idx: number) => (
                                        <div key={idx} className={classNames({
                                            'bg-slate-400': currentPermissionGrant?.data === permission?.permissions
                                        })}>
                                            <Button 
                                                variant="link"
                                                className="w-full"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    switchManagement(idx);
                                                    
                                                }}
                                            >
                                                <Label>{permission?.displayName}</Label>
                                                <span>{` (${0})`}</span>
                                            </Button>
                                        </div>
                                    )))}
                                </div>
                            </section>
                            <hr className="border-b-white mt-5 mb-5" />
                            <section className="flex flex-col space-y-5 mt-3">
                                {currentPermissionGrant?.name === 'identity' && 
                                    <IdentityManagement 
                                        permissions={currentPermissionGrant?.data!} 
                                        trackers={permissionRemotePayload.permissions}
                                    />}
                                
                                {currentPermissionGrant?.name === 'tenants' && 
                                    <TenantManagement 
                                        permissions={currentPermissionGrant?.data!}
                                        trackers={permissionRemotePayload.permissions}
                                />}
                                {currentPermissionGrant?.name === 'settings' && 
                                    <SettingManagement 
                                        permissions={currentPermissionGrant?.data!} 
                                        trackers={permissionRemotePayload.permissions}
                                />}
                                {currentPermissionGrant?.name === 'features' && 
                                    <FeatureManagement 
                                        permissions={currentPermissionGrant?.data!}
                                        trackers={permissionRemotePayload.permissions}
                                />}
                            </section>
                        </section>
                    )}
                    {hasAllGranted && (
                        <section className="grid grid-cols-2 gap-2 mt-2">
                            {permissionGroups.map((group) => (
                                <div key={v4()}>
                                    <h3>{group.displayName}</h3>
                                     <hr className="border-b-white mt-5 mb-5" />
                                    {group?.permissions?.map(p => (
                                        <div key={v4()}>
                                            <Permission name={p.displayName!}
                                                isGranted 
                                                id={p.name?.concat(`_${group.displayName}`) as string}
                                                 className={classNames("ml-2", {
                                                    'pl-5': p.parentName
                                                })}
                                               
                                            />
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </section>
                    )}
                </form>
            </DialogContent>
        </Dialog>
    )
}