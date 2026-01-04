import { useState } from "react"
import {
  Home,
  GraduationCap,
  Settings,
  Users,
  LogOut,
  CheckSquare,
  Bell,
  FolderKanban,
  ChevronDown,
  BarChart3,
  Plus,
  Search,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar"

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "My Tasks",
    url: "/tasks",
    icon: CheckSquare,
  },
  {
    title: "Notifications",
    url: "/notifications",
    icon: Bell,
  },
]

const projects = [
  { id: "1", name: "Website Redesign", url: "/project/1/board" },
  { id: "2", name: "Mobile App", url: "/project/2/board" },
  { id: "3", name: "Marketing Campaign", url: "/project/3/board" },
]

export function AppSidebar() {
  const [projectsOpen, setProjectsOpen] = useState(true)

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <GraduationCap className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">LMS Platform</span>
                  <span className="truncate text-xs text-muted-foreground">Project Management</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* Global Search */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Search">
              <a href="/search" className="bg-muted/50">
                <Search />
                <span>Search...</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {/* Projects with expandable list */}
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => setProjectsOpen(!projectsOpen)}
                  tooltip="Projects"
                >
                  <FolderKanban />
                  <span>Projects</span>
                  <ChevronDown className="ml-auto transition-transform duration-200" style={{ transform: projectsOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                </SidebarMenuButton>
                {projectsOpen && (
                  <SidebarMenuSub>
                    {projects.map((project) => (
                      <SidebarMenuSubItem key={project.id}>
                        <SidebarMenuSubButton asChild>
                          <a href={project.url}>
                            <span>{project.name}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <a href="/dashboard" className="text-primary">
                          <Plus className="mr-2 h-4 w-4" />
                          <span>Create Project</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>

              {/* Analytics */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Analytics">
                  <a href="/project/1/analytics">
                    <BarChart3 />
                    <span>Analytics</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Team */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Team">
                  <a href="/project/1/members">
                    <Users />
                    <span>Team</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Settings">
                  <a href="/settings/profile">
                    <Settings />
                    <span>Settings</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Logout">
              <a href="/login">
                <LogOut />
                <span>Logout</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
