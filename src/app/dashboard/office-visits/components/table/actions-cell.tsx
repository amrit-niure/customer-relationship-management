"use client"
import React from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Edit,
  MapPin,
  Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Client } from "@/db/schema/clients";
import { User } from "@/db/schema";
import { Appointments } from "@/db/schema/appointments";

interface Row {
  original: {
    id: string;
    client: Client;
    appointment: Appointments | null ;
    agent: User | null;
  };
}

export const OfficeVisitsTableActionCell = ({ row }: { row: Row }) => {
  //   const { execute, isPending } = useDeleteClient();

  const handleDelete = (e: React.MouseEvent, _id: string) => {
    e.stopPropagation();
    // execute({ id });
  };
  const queryParams = new URLSearchParams({
    firstName: row.original.client.firstName,
    middleName: row.original.client.middleName || "",
    lastName: row.original.client.lastName,
    email: row.original.client.email,
    phone: row.original.client.phone,
    address: row.original.client.address || "",
    referred: "true",
  }).toString();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-64 bg-white shadow-lg rounded-md"
      >
        <DropdownMenuLabel className="text-sm font-semibold text-gray-700 px-4 py-2">
          Actions
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-1 border-gray-200" />
        <Link
          href={`/dashboard/office-visits?id=${row.original.id}&${queryParams}`}
        >
          <DropdownMenuItem className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
            <Edit className="w-4 h-4 text-gray-600" />
            <span>Update</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator className="my-1 border-gray-200" />
        <DropdownMenuItem
          className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-100 cursor-pointer"
          onClick={(e) => handleDelete(e, row.original.client.id)}
          //   disabled={isPending}
        >
          <Trash className="w-4 h-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
