import { Hero } from '@/components/sections/hero'
import PublicLayout from '@/layout/public-layout'
export default async function Home() {
  return (
    <PublicLayout>
      <Hero />
    </PublicLayout>
  )
}
