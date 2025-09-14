import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(protected)/history/_protected/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/history/"!</div>
}
