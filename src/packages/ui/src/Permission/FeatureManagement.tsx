
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
import { usePermissionsChanges } from "./usePermissionChanges";

type FeatureManagementProps = {
    permissions: PermissionGrantInfoDto[]
    trackers: PermissionTracker[];
}
export const FeatureManagement = ({ permissions, trackers }: FeatureManagementProps) => {
    const { 
        hasAllSelected, 
        onCurrentPermissionChanges,
        data, 
        onHasAllSelectedUpate
    } = usePermissionsChanges({permissions, type: 'feature'});

    return (
        <>
            <Permission name="Select All"
                isGranted={hasAllSelected} 
                id="select_all" 
                onUpdate={onHasAllSelectedUpate} 
                className="ml-2"
            />
            {data?.map(({isGranted, displayName, parentName, name}, idx) => (
                <div key={name}>
                    <Permission name={displayName!}
                        isGranted={isGranted!} 
                        id={displayName!.toLocaleLowerCase()} 
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
