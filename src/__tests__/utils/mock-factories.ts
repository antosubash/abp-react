/**
 * Mock factories for generating test data
 * This file provides factory functions to create consistent test data
 */

/**
 * Base interface for all mock factories
 */
export interface MockFactory<T> {
  /**
   * Create a single mock object
   * @param overrides - Optional properties to override defaults
   * @returns A mock object
   */
  create(overrides?: Partial<T>): T;
  
  /**
   * Create multiple mock objects
   * @param count - Number of objects to create
   * @param overrides - Optional properties to override defaults
   * @returns Array of mock objects
   */
  createMany(count: number, overrides?: Partial<T>): T[];
}

/**
 * User model for testing
 */
export interface User {
  id: string;
  userName: string;
  name: string;
  surname: string;
  email: string;
  emailConfirmed: boolean;
  phoneNumber?: string;
  phoneNumberConfirmed: boolean;
  roles: string[];
  permissions: string[];
  tenantId?: string;
  isActive: boolean;
  creationTime: string;
  lastModificationTime?: string;
}

/**
 * Tenant model for testing
 */
export interface Tenant {
  id: string;
  name: string;
  isActive: boolean;
  creationTime: string;
  lastModificationTime?: string;
}

/**
 * Role model for testing
 */
export interface Role {
  id: string;
  name: string;
  isDefault: boolean;
  isPublic: boolean;
  isStatic: boolean;
  permissions: string[];
  creationTime: string;
  lastModificationTime?: string;
}

/**
 * Permission model for testing
 */
export interface Permission {
  name: string;
  displayName: string;
  parentName?: string;
  isGranted: boolean;
}

/**
 * Factory function to create a base factory
 */
function createFactory<T>(defaultValues: T): MockFactory<T> {
  return {
    create: (overrides = {}) => ({
      ...defaultValues,
      ...overrides,
    }),
    createMany: (count, overrides = {}) => 
      Array.from({ length: count }, (_, index) => ({
        ...defaultValues,
        ...overrides,
        id: (overrides as any).id || `${(defaultValues as any).id || 'item'}-${index + 1}`,
      })),
  };
}

/**
 * User factory for creating test users
 */
export const UserFactory = createFactory<User>({
  id: 'test-user-id',
  userName: 'testuser',
  name: 'Test',
  surname: 'User',
  email: 'test.user@example.com',
  emailConfirmed: true,
  phoneNumber: '+1234567890',
  phoneNumberConfirmed: true,
  roles: ['user'],
  permissions: ['dashboard', 'profile'],
  isActive: true,
  creationTime: new Date().toISOString(),
});

/**
 * Admin user factory for creating test admin users
 */
export const AdminUserFactory = createFactory<User>({
  id: 'test-admin-id',
  userName: 'admin',
  name: 'Admin',
  surname: 'User',
  email: 'admin@example.com',
  emailConfirmed: true,
  phoneNumber: '+1234567890',
  phoneNumberConfirmed: true,
  roles: ['admin'],
  permissions: ['dashboard', 'profile', 'user_management', 'role_management', 'tenant_management'],
  isActive: true,
  creationTime: new Date().toISOString(),
});

/**
 * Tenant factory for creating test tenants
 */
export const TenantFactory = createFactory<Tenant>({
  id: 'test-tenant-id',
  name: 'Test Tenant',
  isActive: true,
  creationTime: new Date().toISOString(),
});

/**
 * Role factory for creating test roles
 */
export const RoleFactory = createFactory<Role>({
  id: 'test-role-id',
  name: 'Test Role',
  isDefault: false,
  isPublic: true,
  isStatic: false,
  permissions: ['dashboard', 'profile'],
  creationTime: new Date().toISOString(),
});

/**
 * Permission factory for creating test permissions
 */
export const PermissionFactory = createFactory<Permission>({
  name: 'test.permission',
  displayName: 'Test Permission',
  isGranted: true,
});

/**
 * Creates a standard set of test data
 * @returns Object containing standard test data
 */
export function createTestData() {
  const tenant = TenantFactory.create();
  const adminUser = AdminUserFactory.create({ tenantId: tenant.id });
  const regularUser = UserFactory.create({ tenantId: tenant.id });
  const roles = [
    RoleFactory.create({ name: 'admin', permissions: ['*'] }),
    RoleFactory.create({ name: 'user', permissions: ['dashboard', 'profile'] }),
  ];
  
  return {
    tenant,
    adminUser,
    regularUser,
    roles,
  };
}