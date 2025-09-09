
import { Link } from "@tanstack/react-router"

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export function MainNavigationMenu() {
	return (
		<header>
			<NavigationMenu viewport={false}>
				<NavigationMenuList>

					{/* Home tabs */}
					<NavigationMenuItem>
						<NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
							<Link to='/'>Home</Link>
						</NavigationMenuLink>
					</NavigationMenuItem>

					{/* Test tabs */}
					<NavigationMenuItem>
						<NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
							<Link to='/tests'>Test</Link>
						</NavigationMenuLink>
					</NavigationMenuItem>

					{/* User tabs */}
					<NavigationMenuItem>
						<NavigationMenuTrigger>User</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className="grid w-[300px] gap-4">
								<li>
									<div className="font-medium">Profile</div>
									<div className="font-medium">History</div>
									<div className="font-medium">Logout</div>
								</li>
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>

				</NavigationMenuList>
			</NavigationMenu>
		</header>
	)
}

// function ListItem({
//   title,
//   children,
//   to,
//   ...props
// }: React.ComponentPropsWithoutRef<"li"> & { to: string }) {
//   return (
//     <li {...props}>
//       <NavigationMenuLink asChild>
//         <Link to={to}>
//           <div className="text-sm leading-none font-medium">{title}</div>
//           <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
//             {children} 
//           </p>
//         </Link>
//       </NavigationMenuLink>
//     </li>
//   )
// }
