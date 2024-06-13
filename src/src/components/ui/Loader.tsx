import { Loader2 } from 'lucide-react'
const Loader = () => {
  return (
    <div className="z-50 flex min-h-[20rem] w-full items-center justify-center">
      <Loader2 width={24} height={24} className="animate-spin" />
    </div>
  )
}

export default Loader
