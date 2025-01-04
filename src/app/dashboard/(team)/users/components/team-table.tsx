"use client";
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Building2, Mail, MapPin, Pencil, Phone, Trash2 } from "lucide-react";
import TeamForm from "./team-form";
import { User } from "@/db/schema/users";
import { deleteUserAction } from "../actions";
import { useServerAction } from "zsa-react";
import { toast } from "sonner";


interface TeamTableProps {
  teamMembers: User[];
}

export default function TeamTable({ teamMembers }: TeamTableProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<User | null>(null);

  const { execute: deleteExecute } = useServerAction(deleteUserAction, {
    onError(error) {
      toast(error.err.message || "Failed to delete user");
    },
    onSuccess() {
      toast("The user has been deleted successfully");
    },
  });

  const handleDelete = async (id: string) => {
    try {
      await deleteExecute({ id });
    } catch (error) {
    toast("Failed to delete user with error : " + error);
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName?.charAt(0)}${lastName?.charAt(0)}`;
  };
  return (
    <>
      <Tabs defaultValue="table" className="space-y-4">
        <TabsList>
          <TabsTrigger value="table">Table View</TabsTrigger>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
        </TabsList>

        <TabsContent value="grid" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers?.map((member) => (
              <Card key={member.id} className="overflow-hidden">
                <CardHeader className="border-b p-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary/10">
                        {getInitials(member.firstName, member.lastName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h3 className="font-semibold leading-none">
                        {`${member.firstName} ${member.lastName}`}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {member.title}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{member.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{member.phoneNumber}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span>{member.branch}</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <span className="line-clamp-2">{member.address}</span>
                    </div>
                    <div className="flex gap-4 items-center">
                      <div className=" flex  items-center ">
                        <Badge
                          variant={
                            member.status === "ACTIVE" ? "default" : "secondary"
                          }
                        >
                          {member.status.toLowerCase()}
                        </Badge>
                      </div>
                        <div className="flex items-center justify-center  space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setEditingMember(member);
                              setIsOpen(true);
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(member.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="table">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Branch</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamMembers?.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary/10 text-xs">
                            {getInitials(member.firstName, member.lastName)}
                          </AvatarFallback>
                        </Avatar>
                        <span>{`${member.firstName} ${member.lastName}`}</span>
                      </div>
                    </TableCell>
                    <TableCell>{member.title}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>{member.phoneNumber}</TableCell>
                    <TableCell>{member.branch}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          member.status === "ACTIVE" ? "default" : "secondary"
                        }
                      >
                        {member.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            console.log(member.id)
                            setEditingMember({...member, id:member.id});
                            setIsOpen(true);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(member.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="sm:max-w-[540px] overflow-y-auto">
          <TeamForm
            onClose={() => setIsOpen(false)}
            mode="edit"
            initialValues={{
              password: editingMember?.hashedPassword || "",
              address: editingMember?.address || "",
              title: editingMember?.title || "",
              role: editingMember?.role || "USER",
              firstName: editingMember?.firstName || "",
              lastName: editingMember?.lastName || "",
              email: editingMember?.email || "",
              phoneNumber: editingMember?.phoneNumber || "",
              branch: editingMember?.branch || "AUSTRALIA",
              status: editingMember?.status || "ACTIVE",
              middleName: editingMember?.middleName || "",
            }}
            memberId={editingMember?.id}
          />
        </SheetContent>
      </Sheet>
    </>
  );
}
