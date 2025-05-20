'use client'
import useSession from '@/useSession'

const Login = () => {
  const { data, isLoading } = useSession()
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (data?.isLoggedIn) {
    return (
      <button
        className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-6 text-sm font-medium text-white shadow-xs transition-colors hover:bg-blue-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-400"
        onClick={() => {
          window.location.href = '/auth/logout'
        }}
      >
        Logout
      </button>
    )
  }

  return (
    <button
      className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-6 text-sm font-medium text-white shadow-xs transition-colors hover:bg-blue-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-400"
      onClick={() => {
        window.location.href = '/auth/login'
      }}
    >
      Login
    </button>
  )
}

export default Login
