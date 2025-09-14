import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(protected)/profile/_protected/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/profile/"!</div>
}
