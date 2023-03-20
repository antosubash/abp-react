
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

type FeatureManagementProps = {
    permissions: PermissionGrantInfoDto[]
    trackers: PermissionTracker[];
}
export const FeatureManagement = ({ permissions, trackers }: FeatureManagementProps) => {
     // Flag determine to enable/disable the selected permissions to a user. 
    const [hasAllSelected, setHasAllSelected] = useState(false);
    const onCurrentPermissionChanges = useCallback((grant: PermissionGrantInfoDto) => {
        
    }, []);

    return (
        <>
            <Permission name="Select All"
                isGranted={hasAllSelected} 
                id="select_all" 
                onUpdate={() => setHasAllSelected(f => !f)} 
                className="ml-2"
            />
            {permissions?.map(({isGranted, displayName, parentName, name}) => (
                <div key={name}>
                    <Permission name={displayName!}
                        isGranted={isGranted!} 
                        id={displayName!.toLocaleLowerCase()} 
                        onUpdate={() => onCurrentPermissionChanges({isGranted, name, parentName, displayName})} 
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
