import { CurrentUserDto } from '@/client'
import { useAppConfig } from './useAppConfig'

/**
 * Custom hook to retrieve the current user data from the application configuration.
 *
 * @returns {CurrentUserDto | undefined} The data object containing the current user information, or undefined if not available.
 */
export const useCurrentUser = (): CurrentUserDto | undefined => {
  const { data } = useAppConfig()
  return data?.currentUser
}
