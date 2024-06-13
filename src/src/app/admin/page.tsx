import { abpApplicationConfigurationGet } from '@/client'
export default async function AdminIndex() {
  const appConfig = await abpApplicationConfigurationGet()
  return (
    <div className="w-full max-w-md space-y-4 text-center">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
        Welcome back
      </h1>
      <div>
        <pre>{JSON.stringify(appConfig.currentUser, null, 2)}</pre>
      </div>
    </div>
  )
}
