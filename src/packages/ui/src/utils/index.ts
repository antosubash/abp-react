import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}


// enums
export enum PermissionProvider {
  KEY = '3a08950d-70d1-78fd-a45d-bc34ff730915',
  NAME = 'U'
}

export enum Permissions {
  IDENTITY_MANAGEMENT = 'AbpIdentity',
  TENANT_MANAGEMENT = 'AbpTenantManagement',
  FEATURE_MANAGEMENT = 'AbpFeatureManagement',
  SETTING_MANAGEMENT = 'AbpSettingManagement',
}