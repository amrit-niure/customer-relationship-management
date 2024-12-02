"use client";
import { FC } from "react";
import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface PageHeaderProps {
  header: string;
  description: string;
  pagePath?: string;
}
const PageHeaderWithoutForm: FC<PageHeaderProps> = ({
  description,
  header,
  pagePath,
}) => {
  function onlcickHandler(pagePath: string | undefined) {
    console.log("Routing to ", pagePath);
  }
  return (
    <CardHeader className="space-y-4 bg-gradient-to-r from-primary/5 to-muted-foreground/10 rounded-lg p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">
            {header}
          </CardTitle>
          <CardDescription className="text-sm max-w-2xl">
            {description}
          </CardDescription>
        </div>
        {pagePath && (
          <Button
            className="self-start sm:self-auto transition-colors hover:bg-primary/90"
            onClick={() => onlcickHandler(pagePath)}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Member
          </Button>
        )}
      </div>
    </CardHeader>
  );
};

export default PageHeaderWithoutForm;
