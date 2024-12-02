"use client"

import * as React from "react"
import {  Bell, Search } from 'lucide-react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "../ui/sidebar"
import { ModeToggle } from "../toggle-mode"
import { NavUser } from "../nav-user"

interface DashboardHeaderProps extends React.HTMLAttributes<HTMLElement> {

}

export function DashboardHeader({
  className,
  ...props
}: DashboardHeaderProps) {
  return (
    <header
      className={cn(
        "flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6 w-full",
        className
      )}
      {...props}
    >
        <SidebarTrigger/>
      <div className="flex w-full max-w-md items-center gap-2 rounded-md border bg-muted px-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="h-7 border-0 bg-transparent focus-visible:ring-0"
        />
        <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -right-1 -top-1 h-4 w-4 rounded-full p-0">
               <span className="flex items-center justify-center w-full h-full text-sm">2</span>
              </Badge>
              <span className="sr-only">View notifications</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Notifications</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <ModeToggle />
          </TooltipTrigger>
          <TooltipContent>Toggle theme</TooltipContent>
        </Tooltip>
        <NavUser />
      </div>
    </header>
  )
}

