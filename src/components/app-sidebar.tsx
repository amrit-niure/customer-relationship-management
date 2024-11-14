"use client";
import * as React from "react";
import {
  BookOpen,
  Bot,
  Command,
  Briefcase,
  Award,
  Send,
  SquareTerminal,
  Smile,
  Users,
  CircleHelp,
  ClockArrowUp,
  HandHelping,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSession } from "./providers/session-provider";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user =  useSession();
  const data = {
    user: {
      name: user?.firstName ?? "" + user?.lastName,
      email: user?.email ?? "",
    },
    navMain: [
      {
        title: "Home",
        url: "/dashboard",
        icon: SquareTerminal,
        isActive: true,
      },
      {
        title: "Appointments",
        url: "/dashboard/appointments",
        icon: Bot,
      },
      {
        title: "Enquiries",
        url: "/dashboard/enquiries",
        icon: CircleHelp,
      },
      {
        title: "Customers",
        url: "/dashboard/customers",
        icon: Smile,
      },
      {
        title: "Visa Applications",
        url: "/dashboard/visa-applications",
        icon: BookOpen,
        items: [
          {
            title: "Training Visa (407)",
            url: "/dashboard/visa-applications/407",
          },
          {
            title: "Work Visa (482)",
            url: "/dashboard/visa-applications/482",
          },
          {
            title: "Student Visa (500)",
            url: "/dashboard/visa-applications/500",
          },
          {
            title: "Tourist Visa (600)",
            url: "/dashboard/visa-applications/600",
          },
        ],
      },
      {
        title: "Job Ready Program",
        url: "/dashboard/job-ready-program",
        icon: Briefcase,
      },
      {
        title: "Skills Assessment",
        url: "/dashboard/skills-assessment",
        icon: Award,
      },
      {
        title: "Team",
        url: "/dashboard/team",
        icon: Users,
      },
    ],
    navSecondary: [
      {
        title: "Updates",
        url: "#",
        icon: ClockArrowUp,
      },
      {
        title: "Support",
        url: "#",
        icon: HandHelping,
      },
      {
        title: "Feedback",
        url: "#",
        icon: Send,
      },
    ],
  };
  return (
    <div>

    <Sidebar variant="inset" {...props} >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Apply World</span>
                  <span className="truncate text-xs">Visa & Migrations</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent >
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
    </div>
  );
}
