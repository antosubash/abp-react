import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines class names using `clsx` and merges them using `twMerge`.
 *
 * This function takes multiple class name inputs, combines them using the `clsx` utility,
 * and then merges them using the `twMerge` utility to ensure that Tailwind CSS classes
 * are properly merged without conflicts.
 *
 * @param {...ClassValue[]} inputs - The class names to combine and merge.
 * @returns {string} - The combined and merged class names.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Enum for various permissions.
 *
 * This enum defines a set of string constants representing different permissions
 * within the application. These permissions are used to control access to various
 * features and functionalities.
 *
 * @readonly
 * @enum {string}
 */
export enum Permissions {
  ROLES = 'AbpIdentity.Roles',
  USERS = 'AbpIdentity.Users',
  TENANTS = 'AbpTenantManagement.Tenants',
  MANAGE_HOST_FEATURES = 'FeatureManagement.ManageHostFeatures',
  SETTINGS = 'SettingManagement.Emailing',
}

/**
 * Enum for user roles.
 *
 * This enum defines a set of string constants representing different user roles
 * within the application. These roles are used to categorize users and assign
 * appropriate permissions.
 *
 * @readonly
 * @enum {string}
 */
export enum USER_ROLE {
  ADMIN = 'admin',
}

/**
 * Enum for permission providers.
 *
 * This enum defines a set of string constants representing different permission
 * providers within the application. These providers are used to manage and assign
 * permissions to users and roles.
 *
 * @readonly
 * @enum {string}
 */
export enum PermissionProvider {
  U = 'U',
  R = 'R',
  T = 'T',
}

/**
 * Helper method for creating a range of numbers.
 *
 * This function generates an array of numbers starting from the `from` parameter
 * and ending at the `to` parameter, inclusive.
 *
 * @param {number} from - The starting number of the range.
 * @param {number} to - The ending number of the range.
 * @returns {number[]} - An array containing the range of numbers.
 */
const range = (from: number, to: number): number[] => {
  let i = from
  const range = []

  while (i <= to) {
    range.push(i)
    i++
  }

  return range
}

/**
 * Generates an array of page numbers for pagination controls.
 *
 * This function creates an array of page numbers and spacers ('SPACER') for pagination
 * based on the total number of pages and the current active page. It ensures that the
 * pagination controls are concise and user-friendly.
 *
 * @param {number} totalPages - The total number of pages.
 * @param {number} currentPage - The current active page.
 * @returns {(number | 'SPACER')[]} - An array of page numbers and spacers.
 */
export const getPages = (totalPages: number, currentPage: number): (number | 'SPACER')[] => {
  const totalNumbers = 5
  const totalBlocks = totalNumbers + 2

  if (totalPages > totalBlocks) {
    const startPage = Math.max(2, currentPage - 1)
    const endPage = Math.min(totalPages - 1, currentPage + 1)

    let pages: Array<number | 'SPACER'> = range(startPage, endPage)

    const hasLeftSpill = startPage > 2
    const hasRightSpill = totalPages - endPage > 1
    const spillOffset = totalNumbers - (pages.length + 3)

    switch (true) {
        // handle: (1) ... {6} [7] (8)
      case hasLeftSpill && !hasRightSpill: {
        const extraPages = range(startPage - spillOffset, startPage - 1)
        pages = ['SPACER', ...extraPages, ...pages]
        break
      }

        // handle: (1) {2} [3] {4} ... (8)
      case !hasLeftSpill && hasRightSpill: {
        const extraPages = range(endPage + 1, endPage + spillOffset)
        pages = [...pages, ...extraPages, 'SPACER']
        break
      }

        // handle: (1) ... {3} [4] {5} ... (8)
      case hasLeftSpill && hasRightSpill:
      default: {
        pages = ['SPACER', ...pages, 'SPACER']
        break
      }
    }

    return [1, ...pages, totalPages]
  }

  return range(1, totalPages)
}