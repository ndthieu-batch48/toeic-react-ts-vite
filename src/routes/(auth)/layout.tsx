import { Outlet, Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/layout')({
	component: AuthLayoutComponent,
	
})

function AuthLayoutComponent() {
  return (
    <div>
			<h1>Auth Layout</h1>
			<div className="p-2 flex gap-2">
							<Link to="/register" className="[&.active]:font-bold">
								Register Page
							</Link>
							<Link to="/login" className="[&.active]:font-bold">
								Login Page
							</Link>
						</div>
      <Outlet />
    </div>
  )
}