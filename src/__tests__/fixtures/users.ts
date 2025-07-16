/**
 * User fixtures for testing
 * This file provides predefined user data for tests
 */
import { User, UserFactory, AdminUserFactory } from '../utils/mock-factories';

/**
 * Standard user with basic permissions
 */
export const standardUser: User = UserFactory.create({
  id: 'standard-user-id',
  userName: 'standard',
  name: 'Standard',
  surname: 'User',
  email: 'standard@example.com',
  roles: ['user'],
  permissions: ['dashboard', 'profile'],
});

/**
 * Admin user with all permissions
 */
export const adminUser: User = AdminUserFactory.create({
  id: 'admin-user-id',
  userName: 'admin',
  name: 'Admin',
  surname: 'User',
  email: 'admin@example.com',
});

/**
 * Tenant admin user with tenant-specific permissions
 */
export const tenantAdminUser: User = AdminUserFactory.create({
  id: 'tenant-admin-id',
  userName: 'tenant-admin',
  name: 'Tenant',
  surname: 'Admin',
  email: 'tenant.admin@example.com',
  tenantId: 'default-tenant',
  roles: ['tenant_admin'],
  permissions: ['dashboard', 'profile', 'tenant_management'],
});

/**
 * Inactive user for testing disabled accounts
 */
export const inactiveUser: User = UserFactory.create({
  id: 'inactive-user-id',
  userName: 'inactive',
  name: 'Inactive',
  surname: 'User',
  email: 'inactive@example.com',
  isActive: false,
});

/**
 * User with unconfirmed email for testing verification flows
 */
export const unverifiedUser: User = UserFactory.create({
  id: 'unverified-user-id',
  userName: 'unverified',
  name: 'Unverified',
  surname: 'User',
  email: 'unverified@example.com',
  emailConfirmed: false,
});

/**
 * User with specific role permissions for testing authorization
 */
export const roleBasedUser: User = UserFactory.create({
  id: 'role-based-user-id',
  userName: 'role-based',
  name: 'Role',
  surname: 'Based',
  email: 'role.based@example.com',
  roles: ['content_editor'],
  permissions: ['dashboard', 'profile', 'content_management'],
});

/**
 * Collection of all predefined users
 */
export const allUsers: User[] = [
  standardUser,
  adminUser,
  tenantAdminUser,
  inactiveUser,
  unverifiedUser,
  roleBasedUser,
];

/**
 * Get a user by role
 * @param role - Role name to find
 * @returns User with the specified role or undefined
 */
export function getUserByRole(role: string): User | undefined {
  return allUsers.find(user => user.roles.includes(role));
}