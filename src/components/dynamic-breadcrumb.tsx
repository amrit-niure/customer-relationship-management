"use client";import { usePathname } from "next/navigation";
import { BookOpenIcon, ChevronRightIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function DynamicBreadcrumb() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb className="bg-muted px-2 py-2 rounded-sm w-full">
      <BreadcrumbList>
        <BookOpenIcon className="h-4 w-4 mr-1" />
        {pathSegments.map((segment, index) => (
          <BreadcrumbItem key={segment}>
            <BreadcrumbSeparator>
              <ChevronRightIcon className="h-4 w-4" />
            </BreadcrumbSeparator>
            {index === pathSegments.length - 1 ? (
              <BreadcrumbPage className="text-xs">
                {segment.charAt(0).toUpperCase() + segment.slice(1)}
              </BreadcrumbPage>
            ) : (
              <BreadcrumbLink
                href={`/${pathSegments.slice(0, index + 1).join("/")}`}
                className="text-xs"
              >
                {segment.charAt(0).toUpperCase() + segment.slice(1)}
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
