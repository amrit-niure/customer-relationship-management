import React from "react";import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/toggle-mode";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import { Toaster } from "@/components/ui/toaster";

interface LayoutProps {
  children?: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar collapsible="icon" variant="floating" />
      <SidebarInset>
        <header className="flex h-10 my-2 shrink-0 items-center justify-between sm:px-4 md:pl-0 md:pr-4 w-full">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <DynamicBreadcrumb />
          </div>
          <ModeToggle />
        </header>
        <main className="sm:px-4 md:pl-0 md:pr-4">{children}</main>
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  );
}