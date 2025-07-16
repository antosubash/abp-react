/**
 * Role fixtures for testing
 * This file provides predefined role data for tests
 */
import { Role, RoleFactory } from '../utils/mock-factories';

/**
 * Admin role with all permissions
 */
export const adminRole: Role = RoleFactory.create({
  id: 'admin-role',
  name: 'admin',
  isDefault: false,
  isPublic: false,
  isStatic: true,
  permissions: ['*'], // Wildcard for all permissions
});

/**
 * Standard user role with basic permissions
 */
export const userRole: Role = RoleFactory.create({
  id: 'user-role',
  name: 'user',
  isDefault: true,
  isPublic: true,
  isStatic: true,
  permissions: ['dashboard', 'profile'],
});

/**
 * Tenant admin role with tenant management permissions
 */
export const tenantAdminRole: Role = RoleFactory.create({
  id: 'tenant-admin-role',
  name: 'tenant_admin',
  isDefault: false,
  isPublic: false,
  isStatic: true,
  permissions: ['dashboard', 'profile', 'tenant_management', 'user_management'],
});

/**
 * Content editor role with content management permissions
 */
export const contentEditorRole: Role = RoleFactory.create({
  id: 'content-editor-role',
  name: 'content_editor',
  isDefault: false,
  isPublic: true,
  isStatic: false,
  permissions: ['dashboard', 'profile', 'content_management'],
});

/**
 * Read-only role with view-only permissions
 */
export const readOnlyRole: Role = RoleFactory.create({
  id: 'read-only-role',
  name: 'read_only',
  isDefault: false,
  isPublic: true,
  isStatic: false,
  permissions: ['dashboard.view', 'profile.view'],
});

/**
 * Collection of all predefined roles
 */
export const allRoles: Role[] = [
  adminRole,
  userRole,
  tenantAdminRole,
  contentEditorRole,
  readOnlyRole,
];

/**
 * Get a role by name
 * @param name - Role name to find
 * @returns Role with the specified name or undefined
 */
export function getRoleByName(name: string): Role | undefined {
  return allRoles.find(role => role.name === name);
}