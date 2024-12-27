"use client";
import * as React from "react";
import {
  BookOpen,
  Command,
  Briefcase,
  Award,
  Send,
  Smile,
  Users,
  CircleHelp,
  ClockArrowUp,
  HandHelping,
  Building,
  Clock,
  Building2,
  Clock10,
  ListTodoIcon,
  Settings2,
  LayoutDashboard,
  BookA,
  User,
  Globe2,
  ListCheck,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSession } from "./providers/session-provider";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useSession();
  const data = {
    user: {
      name: user?.firstName ?? "" + user?.lastName,
      email: user?.email ?? "",
    },
    navBasics: [
      {
        title: "Home",
        url: "/dashboard",
        icon: LayoutDashboard,
        isActive: true,
      },
      {
        title: "Appointments",
        url: "/dashboard/appointments",
        icon: Clock,
      },
      {
        title: "Office Visits",
        url: "/dashboard/office-visits",
        icon: Building,
      },
      {
        title: "Enquiries",
        url: "/dashboard/enquiries",
        icon: CircleHelp,
      },
      {
        title: "Clients",
        url: "/dashboard/clients",
        icon: Smile,
      },
    ],
    navServices: [
      {
        title: "Visa Applications",
        url: "#",
        icon: BookOpen,
        items: [
          {
            title: "Training Visa (407)",
            url: "/dashboard/services/visa-applications/407",
          },
          {
            title: "Work Visa (482)",
            url: "/dashboard/services/visa-applications/482",
          },
          {
            title: "Student Visa (500)",
            url: "/dashboard/services/visa-applications/500",
          },
          {
            title: "Tourist Visa (600)",
            url: "/dashboard/services/visa-applications/600",
          },
          {
            title: "PSW Visa (485)",
            url: "/dashboard/services/visa-applications/485",
          },
        ],
      },
      {
        title: "Job Ready Program",
        url: "/dashboard/services/job-ready-program",
        icon: Briefcase,
      },
      {
        title: "Skills Assessment",
        url: "/dashboard/services/skills-assessment",
        icon: Award,
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
    navEducation: [
      {
        title: "Students",
        url: "/dashboard/students",
        icon: Users,
      },
      {
        title: "Institutions",
        url: "/dashboard/institutions",
        icon: Building2,
      },
    ],
    navTeam: [
      {
        title: "Users",
        url: "/dashboard/users",
        icon: Users,
      },
      {
        title: "Collaboration",
        url: "/dashboard/collaboration",
        icon: HandHelping,
      },
      {
        title: "Mails",
        url: "/dashboard/mails",
        icon: Send,
      },
      {
        title: "Shifts",
        url: "/dashboard/shifts",
        icon: Clock10,
      },
      {
        title: "Tasks",
        url: "/dashboard/tasks",
        icon: ListTodoIcon,
      },
    ],
    navPersonal: [
      {
        title: "Profile",
        url: `/dashboard/profile/${user?.id}`,
        icon: Users,
      },
      {
        title: "My Tasks",
        url: "/dashboard/my-tasks",
        icon: ListCheck,
      },
      {
        title: "Preferences",
        url: `/dashboard/preferences/${user?.id}`,
        icon: Settings2,
      },
    ],
    navAnalytics: [
      {
        title: "Overview",
        url: `/dashboard/overview`,
        icon: BookA,
      },
      {
        title: "Agent Performance",
        url: "/dashboard/agent-performance",
        icon: User,
      },
      {
        title: "Customer Demographics",
        url: `/dashboard/customer-demographics`,
        icon: Globe2,
      },
    ],
  };
  return (
    <div>
      <Sidebar {...props} >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <a href="/dashboard">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Command className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      Apply World Records
                    </span>
                    <span className="truncate text-xs">Visa & Migrations</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navBasics} group="Basics" />
          <NavMain items={data.navServices} group="Services" />
          <NavMain items={data.navEducation} group="Education" />
          <NavMain items={data.navTeam} group="Team" />
          <NavMain items={data.navPersonal} group="Personal" />
          <NavMain items={data.navAnalytics} group="Analytics" />
          <NavSecondary items={data.navSecondary} className="mt-auto" />
        </SidebarContent>
      </Sidebar>
    </div>
  );
}
