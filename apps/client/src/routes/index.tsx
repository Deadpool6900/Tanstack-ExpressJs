import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="bg-gray-700 h-screen w-screen flex items-center justify-center">
      <Button> Click ME </Button>
    </div>
  )
}
