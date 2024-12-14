import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@radix-ui/react-separator";
import {
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  Hash,
  Briefcase,
  Award,
  BookA,
  Book,
  Calendar1Icon,
} from "lucide-react";

export default function ProfileTimeline() {
  return (
    <div className="w-full flex md:flex-row flex-col gap-6">
      {/* Profile Section */}
      <Card className="w-full md:w-1/3">
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center mb-6">
            <Avatar className="w-24 h-24 mb-4">
              <AvatarImage src="/placeholder.svg" alt="Profile picture" />
              <AvatarFallback>CM</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-semibold">Claudia Mills</h2>
            <div className="flex items-center gap-1 my-2">
              <Badge variant="secondary" className="flex items-center gap-1 ">
                Visa{" "}
                <Separator className="h-4 dark:border-muted-foreground border" />{" "}
                482{" "}
              </Badge>
            </div>
            <Button variant="default" size={"sm"} className="p-2">
              <Mail className="w-4 h-4" /> Send Email
            </Button>
            <div className="flex gap-2 mt-4">
              <Button variant="secondary" size={"sm"} className="p-2">
                <Mail className="w-4 h-4" /> Book Appointment
              </Button>
              <Button variant="secondary" size={"sm"} className="p-2">
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
                  <span>claudia.mills@technocore.com</span>
                </p>
                <p className="text-muted-foreground flex items-center gap-2 hover:underline">
                  <Phone className="w-4 h-4" />
                  <span>+919553480564</span>
                </p>
                <p className="text-muted-foreground flex items-center gap-2 hover:underline">
                  <MapPin className="w-4 h-4" />
                  <span>
                    West End 45th Stree, San Francisco
                    <br />
                    90123 California, US
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
                    4th April 1990
                  </span>
                </p>
                <p className="text-muted-foreground flex items-center gap-2 hover:underline">
                  <Hash className="w-4 h-4" />
                  <span>
                    <span className=" text-xs">Passport Number: </span>
                    PA565895
                  </span>
                </p>
                <p className="text-muted-foreground flex items-center gap-2 hover:underline">
                  <Book className="w-4 h-4" />
                  <span>
                    <span className=" text-xs">Current Visa: </span>
                    SUB_482
                  </span>
                </p>
                <p className="text-muted-foreground flex items-center gap-2 hover:underline">
                  <Calendar1Icon className="w-4 h-4" />
                  <span>
                    <span className=" text-xs">Visa Expiry: </span>
                    12th May 2023
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

      {/* Timeline Section */}
      <div className="w-full">
        <Tabs defaultValue="Office Visits" className="bg-primary-secondary">
          <TabsList className="w-full">
            <TabsTrigger value="Office Visits">Office Visits</TabsTrigger>
            {["Activities", "Visa", "Mail", "Documents", "Notes"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab.toLowerCase()}
                className=" rounded-none"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="Office Visits">
Tabs Content of Office Visits
            </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
