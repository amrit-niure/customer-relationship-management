"use client";
import { FC } from "react";
import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

interface PageHeaderProps {
  header: string;
  description: string;
  pagePath?: string;
  buttonText: string;
}
const PageHeaderWithoutForm: FC<PageHeaderProps> = ({
  description,
  header,
  pagePath,
  buttonText
}) => {
  return (
    <CardHeader className="space-y-4  rounded-sm p-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <CardTitle className="text-3xl font-bold tracking-tight">
            {header}
          </CardTitle>
          <CardDescription className="text-sm max-w-2xl">
            {description}
          </CardDescription>
        </div>
        {pagePath && (
          <Link href={pagePath}>
          <Button
            className="self-start sm:self-auto transition-colors hover:bg-primary/90"
          >
            <Plus className="mr-2 h-4 w-4" />
          {buttonText}
          </Button>
          </Link>
        )}
      </div>
    </CardHeader>
  );
};

export default PageHeaderWithoutForm;
