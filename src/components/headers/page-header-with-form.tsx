"use client";import { FC, useState } from "react";
import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useSession } from "../providers/session-provider";
import AppointmentForm from "@/app/dashboard/appointments/components/appointment-form";
import TeamForm from "@/app/dashboard/team/components/team-form";

interface PageHeaderProps {
  header: string;
  description: string;
  buttonText?: string;
  formType: "TEAM" | "APPOINTMENT";
}

const PageHeaderWithForm: FC<PageHeaderProps> = ({
  description,
  header,
  buttonText,
  formType,
}) => {
  const user  = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const renderForm = () => {
    switch (formType) {
      case "TEAM":
        return <TeamForm onClose={() => setIsOpen(false)} />;
      case "APPOINTMENT":
        return <AppointmentForm onClose={() => setIsOpen(false)} />;
      default:
        return null;
    }
  };

  return (
    <CardHeader className="space-y-4 bg-gradient-to-r from-primary/5 to-muted-foreground/10 rounded-sm p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">
            {header}
          </CardTitle>
          <CardDescription className="text-sm max-w-2xl">
            {description}
          </CardDescription>
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          {user?.role === "ADMIN" && (
            <SheetTrigger asChild>
              {buttonText && (
                <Button
                  className="self-start sm:self-auto transition-colors hover:bg-primary/90"
                  onClick={() => setIsOpen(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  {buttonText}
                </Button>
              )}
            </SheetTrigger>
          )}
          <SheetContent className="min-w-[600px] sm:w-[600px] lg:w-[900px] overflow-y-auto">
            {renderForm()}
          </SheetContent>
        </Sheet>
      </div>
    </CardHeader>
  );
};

export default PageHeaderWithForm;
