import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/shadcn_ui/navigation-menu"

export const Route = createRootRoute({
  component: () => (
		<>
			
      
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})