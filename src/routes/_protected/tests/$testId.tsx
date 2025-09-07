import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/tests/$testId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(test)/$testId"!</div>
}
