"use client";import { ChevronRight, type LucideIcon } from "lucide-react";import {  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export function NavMain({
  items,
  group,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[], group: string;
}) {
  const pathname = usePathname();
         
  return (
    <div>
      <SidebarGroup>
        <SidebarGroupLabel>{group}</SidebarGroupLabel>
        <SidebarMenu>
          {items.map((item) =>{
               const isActive = pathname === item.url;
            return(
            <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <CollapsibleTrigger asChild>
                    <Link
                      href={item.url}
                      className={`rounded-sm  ${
                        isActive
                          ? "bg-primary text-background"
                          : " hover:bg-muted"
                      } peer-data-[active=true]/bg:black`}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </CollapsibleTrigger>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuAction className="data-[state=open]:rotate-90">
                        <ChevronRight />
                        <span className="sr-only">Toggle</span>
                      </SidebarMenuAction>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <Link href={subItem.url}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </>
                ) : null}
              </SidebarMenuItem>
            </Collapsible>
          )})}
        </SidebarMenu>
      </SidebarGroup>
    </div>
  );
}
