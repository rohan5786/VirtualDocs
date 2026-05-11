import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Upload,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { UploadDocumentDialog } from "@/components/upload/UploadDocumentDialog";

const coreItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Patients", url: "/patients", icon: Users },
];

const systemItems = [
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const [uploadOpen, setUploadOpen] = useState(false);

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  const renderItem = (item: { title: string; url: string; icon: typeof Users }) => {
    const active = isActive(item.url);
    return (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton
          asChild
          tooltip={collapsed ? item.title : undefined}
          className={cn(
            "h-8 rounded-[6px] px-2 text-[13px] font-normal transition-colors",
            active
              ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
              : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
          )}
        >
          <NavLink to={item.url} end={item.url === "/"} className="relative">
            {active && !collapsed && (
              <span className="absolute left-0 top-1/2 h-4 w-[2px] -translate-y-1/2 rounded-full bg-primary" aria-hidden />
            )}
            <item.icon className={cn("h-4 w-4 shrink-0", active ? "text-primary" : "text-muted-foreground")} strokeWidth={1.75} />
            {!collapsed && <span>{item.title}</span>}
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className={cn("flex items-center gap-2.5 px-2 py-3", collapsed && "justify-center px-0")}>
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[6px] bg-primary text-primary-foreground">
            <span className="text-[12px] font-semibold tracking-tight">N</span>
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="text-[13px] font-semibold tracking-tight text-sidebar-foreground">Nephra</span>
              <span className="text-[11px] text-muted-foreground">Clinical workspace</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-2">
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="px-2 text-[10px] font-medium uppercase tracking-[0.08em] text-muted-foreground/70">
              Workspace
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {coreItems.map(renderItem)}
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={collapsed ? "Upload Document" : undefined}
                  onClick={() => setUploadOpen(true)}
                  className="h-8 rounded-[6px] px-2 text-[13px] font-normal text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
                >
                  <Upload className="h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={1.75} />
                  {!collapsed && <span>Upload Document</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-2">
          {!collapsed && (
            <SidebarGroupLabel className="px-2 text-[10px] font-medium uppercase tracking-[0.08em] text-muted-foreground/70">
              System
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">{systemItems.map(renderItem)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <UploadDocumentDialog open={uploadOpen} onOpenChange={setUploadOpen} />
    </Sidebar>
  );
}
