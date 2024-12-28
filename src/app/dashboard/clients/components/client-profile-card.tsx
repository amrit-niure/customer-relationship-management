"use client";
import { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  Book,
  Calendar1Icon,
  BookA,
  Award,
  Briefcase,
  Hash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Client } from "@/db/schema/clients";
import { Badge } from "@/components/ui/badge";

interface ClientProfileCardProps {
  data: Client;
}

const ClientProfileCard: FC<ClientProfileCardProps> = ({ data }) => {
  return (
    <Card className="w-full md:w-1/3">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center mb-6">
          <Avatar className="w-24 h-24 mb-4">
            <AvatarImage src="/placeholder.svg" alt="Profile picture" />
            <AvatarFallback>CM</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-semibold">
            {[data.firstName, data.middleName, data.lastName].filter(Boolean).join(" ")}
          </h2>
          <div className="flex items-center gap-1 my-2">
            <Badge variant="secondary" className="flex items-center gap-1 ">
              Visa{" "}
              <Separator className="h-4 w-1 dark:border-muted-foreground border" />
              {data.currentVisa}
            </Badge>
          </div>
          <a href={`mailto:${data.email}`}>
            <Button size={"sm"} className="p-2">
              <Mail className="w-4 h-4" /> Send Email
            </Button>
          </a>
          <div className="flex gap-2 mt-4">
            <Button variant="secondary" size={"sm"} className="p-2">
              <Mail className="w-4 h-4" /> Book Appointment
            </Button>
            <Button variant="outline" size={"sm"} className="p-2">
              <Mail className="w-4 h-4" /> Mark Office Visit
            </Button>
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">Contact Information</h3>
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground flex items-center gap-2 hover:underline">
                <Mail className="w-4 h-4" />
                <span>{data.email}</span>
              </p>
              <p className="text-muted-foreground flex items-center gap-2 hover:underline">
                <Phone className="w-4 h-4" />
                <span>{data.phone}</span>
              </p>
              <p className="text-muted-foreground flex items-center gap-2 hover:underline">
                <MapPin className="w-4 h-4" />
                <span>
                 {data.address}
                </span>
              </p>
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-2">Basic Information</h3>
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground flex items-center gap-2 hover:underline">
                <CalendarDays className="w-4 h-4" />
                <span>
                  <span className=" text-xs">Date of Birth: </span>
                  {/* {data.dateofBirth ? data.dateOfBirth: "N/A"} */}
                </span>
              </p>
              <p className="text-muted-foreground flex items-center gap-2 hover:underline">
                <Hash className="w-4 h-4" />
                <span>
                  <span className=" text-xs">Passport Number: </span>
               {data.passportNumber}
                </span>
              </p>
              <p className="text-muted-foreground flex items-center gap-2 hover:underline">
                <Book className="w-4 h-4" />
                <span>
                  <span className=" text-xs">Current Visa: </span>
                 {data.currentVisa}
                </span>
              </p>
              <p className="text-muted-foreground flex items-center gap-2 hover:underline">
                <Calendar1Icon className="w-4 h-4" />
                <span>
                  <span className=" text-xs">Visa Expiry: </span>
                {data.visaExpiry ? data.visaExpiry.toDateString() : "N/A"}
                </span>
              </p>
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-2">Actions</h3>
            <div className="flex flex-wrap gap-2">
              <Button variant="link" size={"sm"} className="p-2">
                <BookA className="w-4 h-4" /> Lodge Visa Application
              </Button>
              <Button variant="outline" size={"sm"} className="p-2">
                <Award className="w-4 h-4" /> Lodge Skills Assessment
              </Button>
              <Button variant="default" size={"sm"} className="p-2">
                <Briefcase className="w-4 h-4" /> Lodge Job Ready Program
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientProfileCard;
