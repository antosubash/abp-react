import { abpApplicationConfigurationGet, ApplicationConfigurationDto } from '@/client'
/**
 * The AdminIndex component is an asynchronous function that fetches the application configuration
 * and displays a welcome message along with the current user's configuration details.
 *
 * @returns A React component that renders a welcome message and the current user's configuration in JSON format.
 */
export default async function AdminIndex() {
  const { data } = await abpApplicationConfigurationGet()
  const appConfig = data as ApplicationConfigurationDto
  return (
    <div className="w-full max-w-md space-y-4 text-center">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
        Welcome back
      </h1>
      <div>
        <pre>{JSON.stringify(appConfig?.currentUser, null, 2)}</pre>
      </div>
    </div>
  )
}
