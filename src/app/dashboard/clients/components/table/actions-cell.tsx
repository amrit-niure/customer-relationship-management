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
  Eye,
  Calendar,
  Edit,
  MapPin,
  Trash,
} from "lucide-react";
import { Button } from "../../../../../components/ui/button";
import { useServerAction } from "zsa-react";
import { toast } from "@/hooks/use-toast";
import { deleteClientAction } from "@/app/dashboard/clients/actions";

function useDeleteClient() {
  return useServerAction(deleteClientAction, {
    onSuccess() {
      toast({
        title: "Action Successful",
        description: "The client record is deleted successfully",
      });
    },
    onError(result) {
      toast({
        variant: "destructive",
        description: result.err.message,
      });
    },
  });
}

//  component for the cell content
interface Row {
  original: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string | null;
  };
}

export const ClientsTableActionsCell = ({ row }: { row: Row }) => {
  const { execute, isPending } = useDeleteClient();

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    execute({ id });
  };
  const queryParams = new URLSearchParams({
    firstName: row.original.firstName,
    lastName: row.original.lastName,
    email: row.original.email,
    phone: row.original.phone,
    address: row.original.address || "",
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

        <Link href={`/dashboard/clients/${row.original.id}`} passHref>
          <DropdownMenuItem className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
            <Eye className="w-4 h-4 text-gray-600" />
            <span>View</span>
          </DropdownMenuItem>
        </Link>
        <Link href={`/dashboard/clients/update/${row.original.id}`} passHref>
          <DropdownMenuItem className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
            <Edit className="w-4 h-4 text-gray-600" />
            <span>Update</span>
          </DropdownMenuItem>
        </Link>

        <Link href={`/dashboard/appointments?${queryParams}`} passHref>
          <DropdownMenuItem className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
            <Calendar className="w-4 h-4 text-gray-600" />
            <span>Book an Appointment</span>
          </DropdownMenuItem>
        </Link>

        <Link href={`/dashboard/office-visit/${row.original.id}`} passHref>
          <DropdownMenuItem className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
            <MapPin className="w-4 h-4 text-gray-600" />
            <span>Mark Office Visit</span>
          </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator className="my-1 border-gray-200" />
        <DropdownMenuItem
          className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-100 cursor-pointer"
          onClick={(e) => handleDelete(e, row.original.id)}
          disabled={isPending}
        >
          <Trash className="w-4 h-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
