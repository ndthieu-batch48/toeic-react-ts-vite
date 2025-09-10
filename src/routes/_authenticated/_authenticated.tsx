import { MainFooter } from '@/components/footer'
import { MainNavigationMenu } from '@/components/main-navigation-menu'
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { getUserSession } from '@/features/helper/authHelper';
import { createFileRoute, Outlet, redirect, useRouter } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/_authenticated')({
	beforeLoad: ({ context, location }) => {
		if (!context.auth.isAuthenticated) {
			throw redirect({
				to: '/login',
				search: {
					redirect: location.href,
				},
			})
		}
	},
	component: ProtectedComponent,
})

function ProtectedComponent() {
	const router = useRouter()
	const navigate = Route.useNavigate()
	const auth = useAuth()


	const handleLogout = () => {
		if (window.confirm('Are you sure you want to logout?')) {
			auth.logout().then(() => {
				router.invalidate().finally(() => {
					navigate({ to: '/' })
				})
			})
		}
	}

	return (
		<>
			<Button
				variant="destructive"
				className="size-100 hover:underline"
				onClick={handleLogout}
			>
				Logout
			</Button>
			{/* <MainNavigationMenu /> */}
			<Outlet />
			<MainFooter />
		</>
	)
}