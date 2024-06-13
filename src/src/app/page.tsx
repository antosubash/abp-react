import PublicLayout from '@/layout/public-layout'
import { Hero } from '@/components/sections/hero'
export default async function Home() {
  return (
    <PublicLayout>
      <Hero />
    </PublicLayout>
  )
}
