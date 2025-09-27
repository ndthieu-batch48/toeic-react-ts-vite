import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/profile/')({
	component: ProfileRoute,
})

function ProfileRoute() {
	return <div>THIS IS A PLACE HOLDER FOR PROFILE PAGE</div>
}
