import React from "react";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { DashboardHeader } from "@/components/headers/dashboard-header";

interface LayoutProps {
  children?: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar collapsible="icon" variant="sidebar" />
      <SidebarInset>
        <header className="flex h-10 my-2 shrink-0 items-center justify-between  w-full">
          <div className="flex items-center gap-2 w-full">
            <DashboardHeader />
          </div>
        </header>
        <main className="md:pr-4 lg:px-6 pt-4 ">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}