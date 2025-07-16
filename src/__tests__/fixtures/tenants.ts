/**
 * Tenant fixtures for testing
 * This file provides predefined tenant data for tests
 */
import { Tenant, TenantFactory } from '../utils/mock-factories';

/**
 * Default tenant
 */
export const defaultTenant: Tenant = TenantFactory.create({
  id: 'default-tenant',
  name: 'Default',
});

/**
 * Premium tenant with additional features
 */
export const premiumTenant: Tenant = TenantFactory.create({
  id: 'premium-tenant',
  name: 'Premium',
});

/**
 * Inactive tenant for testing disabled tenants
 */
export const inactiveTenant: Tenant = TenantFactory.create({
  id: 'inactive-tenant',
  name: 'Inactive',
  isActive: false,
});

/**
 * Collection of all predefined tenants
 */
export const allTenants: Tenant[] = [
  defaultTenant,
  premiumTenant,
  inactiveTenant,
];

/**
 * Get a tenant by name
 * @param name - Tenant name to find
 * @returns Tenant with the specified name or undefined
 */
export function getTenantByName(name: string): Tenant | undefined {
  return allTenants.find(tenant => tenant.name === name);
}