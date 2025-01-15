import { Hero } from '@/components/sections/hero'
import PublicLayout from '@/layout/public-layout'
/**
 * The Home component is an asynchronous function that returns a JSX element.
 * It uses the PublicLayout component to wrap the Hero component.
 *
 * @returns {React.ReactElement} The rendered JSX element.
 */
export default async function Home() {
  return (
    <PublicLayout>
      <Hero />
    </PublicLayout>
  )
}
