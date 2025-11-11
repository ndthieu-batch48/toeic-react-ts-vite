import { Link, useRouter, useNavigate } from "@tanstack/react-router"
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/shadcn/component/ui/navigation-menu"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/shadcn/component/ui/dropdown-menu"
import { Button } from "../../shadcn/component/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/shadcn/component/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/shadcn/component/ui/sheet"
import { Menu, LogOut, History, User } from "lucide-react"
import { useAuth } from "@/common/context/AuthContext"
import { cn } from "@/shadcn/lib/util"
import { TmaLogo } from "./TmaLogo"
import { APP_INFO, TMA_INFO } from "../const/appConst"


export function MainNavigationMenu() {
	const router = useRouter()
	const navigate = useNavigate()
	const auth = useAuth()

	const handleLogout = async () => {
		if (window.confirm('Are you sure you want to logout?')) {
			try {
				auth.logout()
				await router.invalidate()
				await navigate({ to: '/' })
			} catch (error) {
				console.error('Logout error:', error)
			}
		}
	}

	const NavigationItems = () => (
		<>
			<NavigationMenuItem>
				<NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
					<Link to='/'>
						Home
					</Link>
				</NavigationMenuLink>
			</NavigationMenuItem>

			<NavigationMenuItem>
				<NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
					<Link to='/test'>
						Test
					</Link>
				</NavigationMenuLink>
			</NavigationMenuItem>

			{/* Features Dropdown */}
			<NavigationMenuItem>
				<NavigationMenuTrigger>About Us</NavigationMenuTrigger>
				<NavigationMenuContent>
					<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">

						<ListItem to={TMA_INFO.HOME_PAGE} title="Visit Our Website">
							Learn more about our company and services
						</ListItem>

						<ListItem to={TMA_INFO.CONTACT_PAGE} title="Contact & Support">
							Get in touch with our team for assistance
						</ListItem>

					</ul>
				</NavigationMenuContent>
			</NavigationMenuItem>

		</>
	)

	return (
		<header className="bg-sidebar top-0 z-50 w-full border py-3">
			<div className="flex h-14 items-center px-4 w-full">

				<div className="flex items-center space-x-4">
					<Link
						to={auth.isAuthenticated ? "/test" : "/"}
						className="flex items-center space-x-2">
						<TmaLogo className="w-15 h-15" />
						<div className="font-bold text-xl">{APP_INFO.APP_NAME}</div>
					</Link>

					<NavigationMenu>
						<NavigationMenuList>
							<NavigationItems />
						</NavigationMenuList>
					</NavigationMenu>
				</div>

				<div className="flex items-center ml-auto">
					{/* User Dropdown Menu */}
					{auth.isAuthenticated ? (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline" className="w-15 h-15 rounded-full">
									<Avatar>
										<AvatarImage src={auth.user?.avatar} alt={auth.user?.username || 'User'} />
										<AvatarFallback className="bg-transparent" asChild>
											<User />
										</AvatarFallback>
									</Avatar>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-100" align="end" forceMount>
								<DropdownMenuLabel>
									<div className="flex flex-col space-y-1">
										<p className="text-lg font-semibold">
											{auth.user?.username || 'User'}
										</p>
										<p className="text-lg font-medium text-muted-foreground">
											{auth.user?.email}
										</p>
									</div>
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem asChild className="font-medium text-lg">
									<Link to="/history" className="flex items-center">
										<History />
										History
									</Link>
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem onClick={handleLogout} className="font-medium text-lg">
									<LogOut />
									Log out
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<div className="flex items-center space-x-2">
							<Button asChild className="font-semibold text-lg">
								<Link to="/login">Login</Link>
							</Button>
						</div>
					)}

					{/* Mobile Navigation */}
					<Sheet>
						<SheetTrigger asChild>
							<Button
								variant="ghost"
								className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
							>
								<Menu className="h-5 w-5" />
								<span className="sr-only">Toggle Menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent side="left" className="pr-0">
							<MobileNav />
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	)
}

// Mobile Navigation Component
function MobileNav() {
	const auth = useAuth()

	return (
		<div className="flex flex-col space-y-4">

			<Link to="/" className="flex items-center space-x-2">
				<div className="font-bold text-xl">YourApp</div>
			</Link>

			<nav className="flex flex-col space-y-2">
				<Link
					to="/"
					className="text-foreground/60 transition-colors hover:text-foreground"
					activeProps={{ className: "text-foreground font-medium" }}
				>
					Home
				</Link>
				<Link
					to="/test"
					className="text-foreground/60 transition-colors hover:text-foreground"
					activeProps={{ className: "text-foreground font-medium" }}
				>
					Test
				</Link>

				{auth.isAuthenticated && (
					<>
						<div className="border-t pt-2 mt-2">
							<p className="font-medium text-base mb-2">Account</p>
							<Link
								to="/history"
								className="text-foreground/60 transition-colors hover:text-foreground block py-1"
								activeProps={{ className: "text-foreground font-medium" }}
							>
								History
							</Link>
						</div>
					</>
				)}
			</nav>
		</div>
	)
}

// Enhanced ListItem component for navigation menus
function ListItem({
	title,
	children,
	to,
	className,
	...props
}: React.ComponentPropsWithoutRef<"li"> & {
	to: string
	title: string
	children: React.ReactNode
}) {
	const isExternal = to.startsWith('http://') || to.startsWith('https://')

	return (
		<li {...props}>
			<NavigationMenuLink asChild>
				{isExternal ? (
					<a
						href={to}
						target="_blank"
						rel="noopener noreferrer"
						className={cn(
							"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
							className
						)}
					>
						<div className="text-base font-medium leading-none">{title}</div>
						<p className="line-clamp-2 text-base leading-snug text-muted-foreground">
							{children}
						</p>
					</a>
				) : (
					<Link
						to={to}
						className={cn(
							"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
							className
						)}
					>
						<div className="text-base font-medium leading-none">{title}</div>
						<p className="line-clamp-2 text-base leading-snug text-muted-foreground">
							{children}
						</p>
					</Link>
				)}
			</NavigationMenuLink>
		</li>
	)
}