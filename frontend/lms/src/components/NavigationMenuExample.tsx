import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

const NavigationMenuExample = () => {
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-indigo-600">TaskFlow</h1>
          </div>

          {/* Navigation Menu */}
          <NavigationMenu>
            <NavigationMenuList>
              {/* Dropdown Menu - Features */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-indigo-500/50 to-purple-500/50 p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium text-white">
                            TaskFlow Features
                          </div>
                          <p className="text-sm leading-tight text-white/90">
                            Powerful project management tools for modern teams
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/features/boards" title="Kanban Boards">
                      Visual task management with drag-and-drop
                    </ListItem>
                    <ListItem href="/features/collaboration" title="Team Collaboration">
                      Real-time updates and team communication
                    </ListItem>
                    <ListItem href="/features/analytics" title="Analytics">
                      Track progress with powerful insights
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Dropdown Menu - Solutions */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {solutions.map((solution) => (
                      <ListItem
                        key={solution.title}
                        title={solution.title}
                        href={solution.href}
                      >
                        {solution.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Simple Link - Pricing */}
              <NavigationMenuItem>
                <NavigationMenuLink 
                  href="#pricing" 
                  className={navigationMenuTriggerStyle()}
                >
                  Pricing
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Simple Link - About */}
              <NavigationMenuItem>
                <NavigationMenuLink 
                  href="#about" 
                  className={navigationMenuTriggerStyle()}
                >
                  About
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right side - CTA */}
          <div className="flex items-center gap-4">
            <button className="text-gray-700 hover:text-indigo-600 font-medium transition">
              Log in
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Data for Solutions dropdown
const solutions = [
  {
    title: "Software Teams",
    href: "/solutions/software",
    description: "Agile workflows for development teams",
  },
  {
    title: "Marketing Teams",
    href: "/solutions/marketing",
    description: "Campaign planning and content calendars",
  },
  {
    title: "Product Teams",
    href: "/solutions/product",
    description: "Roadmap planning and feature tracking",
  },
  {
    title: "Operations",
    href: "/solutions/operations",
    description: "Process automation and task management",
  },
];

// Reusable ListItem component
const ListItem = ({
  className,
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"a"> & { title: string }) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
};

export default NavigationMenuExample;
