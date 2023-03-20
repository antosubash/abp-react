
import { useEffect, useState, useMemo, useCallback } from "react";
import { IdentityUserUpdateDto, UserService, GetPermissionListResultDto, PermissionGroupDto, PermissionGrantInfoDto } from "@abpreact/proxy";
import { useForm } from "react-hook-form";
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
import {PermissionTracker} from '../User/UserPermission';

type IdentityManagementProps = {
    permissions: PermissionGrantInfoDto[]
    trackers: PermissionTracker[];
    onUpdate?: () => void
}


export const IdentityManagement = ({ permissions, trackers, onUpdate }: IdentityManagementProps) => {
     // Flag determine to enable/disable the selected permissions to a user. 
    const [hasAllSelected, setHasAllSelected] = useState(false);
    const [data, setData] = useState<PermissionGrantInfoDto[]>(permissions);

    const onCurrentPermissionChanges = useCallback((idx: number) => {
        
        const selectedData = data[idx];
        // wait for all the events to get done, then check.
        setTimeout(() => {
            const allSelected = permissions.every(d => d.isGranted);
            setHasAllSelected(allSelected);
        }, 0);
        // roles
        const parentRole = data.find(f => !f.parentName && f.name === Permissions.ROLES);
        const allRoleChildren = data.filter(f =>  f.parentName === Permissions.ROLES);

        if(selectedData.parentName === Permissions.ROLES && parentRole) {
            if(selectedData.isGranted) {
                selectedData.isGranted = false;
                parentRole.isGranted = false;
            }else {
                selectedData.isGranted = true;
            }
            // If all the children got granted then updated the parent as well.
            if(!parentRole.isGranted) {
                const hasAllRoleChildrenSelected = allRoleChildren.every(c => c.isGranted);
                if(hasAllRoleChildrenSelected) {
                    parentRole.isGranted = true;
                }
            }
            setData([...data]);
            return false;
        }

        if(!selectedData.parentName && selectedData.name === Permissions.ROLES) {
            if(parentRole && parentRole.isGranted) {
                parentRole.isGranted = false;
                allRoleChildren.forEach(c => c.isGranted = false);
            }else if(parentRole && !parentRole.isGranted) {
                parentRole.isGranted = true;
                allRoleChildren.forEach(c => c.isGranted = true);
            }
            setData([...data])
        }

        // users
        const parentUser = data.find(f => !f.parentName && f.name === Permissions.USERS);
        const allUserChildren = data.filter(f =>  f.parentName === Permissions.USERS);

        if(selectedData.parentName === Permissions.USERS && parentUser) {
                if(selectedData.isGranted) {
                    selectedData.isGranted = false;
                    parentUser.isGranted = false;
                }else {
                    selectedData.isGranted = true;
                }
                // If all the children got granted then updated the parent as well.
                if(!parentUser.isGranted) {
                    const hasAllUserChildrenSelected = allUserChildren.every(c => c.isGranted);
                    if(hasAllUserChildrenSelected) {
                        parentUser.isGranted = true;
                    }
                }
                setData([...data]);
                return false;
        }

        if(!selectedData.parentName && selectedData.name === Permissions.USERS) {
            if(parentUser && parentUser.isGranted) {
                parentUser.isGranted = false;
                allUserChildren.forEach(c => c.isGranted = false);
            }else if(parentUser && !parentUser.isGranted) {
                parentUser.isGranted = true;
                allUserChildren.forEach(c => c.isGranted = true);
            }
            setData([...data])
        }

    }, []);

    useEffect(() => {
        setHasAllSelected(permissions.every(d => d.isGranted));
    }, [permissions])

    return (
        <>
            <Permission name="Select All"
                isGranted={hasAllSelected} 
                id="select_all"
                onUpdate={() => {
                    setHasAllSelected(f => {
                        data.forEach(d => d.isGranted = !f);
                        setData([...data]);
                        return !f;
                    });
                }}
                className="ml-2"
            />
            {data?.map(({isGranted, displayName, parentName}, idx) => (
                <div key={idx}>
                    <Permission name={displayName!}
                        isGranted={isGranted!} 
                        id={displayName!.toLocaleLowerCase().concat(parentName!)} 
                        onUpdate={() => onCurrentPermissionChanges(idx)} 
                        className={classNames("ml-2", {
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
}
