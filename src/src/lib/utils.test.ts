/**
 * Tests for utility functions
 */
import { cn, getPages, Permissions, USER_ROLE, PermissionProvider } from './utils';

describe('Utility Functions', () => {
  describe('cn', () => {
    it('should combine class names correctly', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2');
      expect(cn('class1', { class2: true, class3: false })).toBe('class1 class2');
      expect(cn('class1', ['class2', 'class3'])).toBe('class1 class2 class3');
    });

    it('should handle conditional classes', () => {
      const condition = true;
      expect(cn('class1', condition && 'class2')).toBe('class1 class2');
      expect(cn('class1', !condition && 'class2')).toBe('class1');
    });

    it('should merge Tailwind classes correctly', () => {
      expect(cn('p-4', 'p-6')).toBe('p-6');
      expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
      expect(cn('flex items-center', 'grid')).toBe('grid items-center');
    });

    it('should handle empty inputs', () => {
      expect(cn()).toBe('');
      expect(cn('')).toBe('');
      expect(cn('', '')).toBe('');
    });
  });

  describe('getPages', () => {
    it('should return all pages when total pages is less than or equal to 7', () => {
      expect(getPages(1, 1)).toEqual([1]);
      expect(getPages(3, 2)).toEqual([1, 2, 3]);
      expect(getPages(7, 4)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });

    it('should handle first page selected with many pages', () => {
      const result = getPages(10, 1);
      expect(result).toEqual([1, 2, 3, 'SPACER', 10]);
    });

    it('should handle last page selected with many pages', () => {
      const result = getPages(10, 10);
      expect(result).toEqual([1, 'SPACER', 8, 9, 10]);
    });

    it('should handle middle page selected with many pages', () => {
      const result = getPages(10, 5);
      expect(result).toEqual([1, 'SPACER', 4, 5, 6, 'SPACER', 10]);
    });

    it('should handle page near start with many pages', () => {
      const result = getPages(10, 2);
      expect(result).toEqual([1, 2, 3, 'SPACER', 10]);
    });

    it('should handle page near end with many pages', () => {
      const result = getPages(10, 9);
      expect(result).toEqual([1, 'SPACER', 8, 9, 10]);
    });
  });

  describe('Enums', () => {
    it('should have the correct Permissions values', () => {
      expect(Permissions.ROLES).toBe('AbpIdentity.Roles');
      expect(Permissions.USERS).toBe('AbpIdentity.Users');
      expect(Permissions.TENANTS).toBe('AbpTenantManagement.Tenants');
    });

    it('should have the correct USER_ROLE values', () => {
      expect(USER_ROLE.ADMIN).toBe('admin');
    });

    it('should have the correct PermissionProvider values', () => {
      expect(PermissionProvider.U).toBe('U');
      expect(PermissionProvider.R).toBe('R');
      expect(PermissionProvider.T).toBe('T');
    });
  });
});