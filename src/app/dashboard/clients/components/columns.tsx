"use client";

import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Customer } from "@/db/schema/customers";
import { Separator } from "@radix-ui/react-separator";
import { ColumnDef } from "@tanstack/react-table";
import { Book, Eye, Footprints, MoreHorizontal, Pencil, Trash } from "lucide-react";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="#" className="px-2" />
    ),
    cell: ({ row }) => <span className="px-2">{row.index + 1}</span>,
    enableSorting: false
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="First Name" />
    ),
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Name" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Address" />
    ),
  },
  {
    accessorKey: "currentVisa",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Visa" />
    ),
    filterFn: (row, columnId, filterValue: string[]) => {
      // If no filters are selected, show all rows
      if (filterValue.length === 0) return true;
      // Show row if its value is in the selected values
      return filterValue.includes(row.getValue(columnId));
    },
  },
  {
    accessorKey: "passportNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Passport Number" />
    ),
  },
  //   {
  //     accessorKey: "amount",
  //     header: () => <div className="">Amount</div>,
  //     cell: ({ row }) => {
  //       const amount = parseFloat(row.getValue("amount"))
  //       const formatted = new Intl.NumberFormat("en-US", {
  //         style: "currency",
  //         currency: "USD",
  //       }).format(amount)

  //       return <div className="t font-medium">{formatted}</div>
  //     },
  //   },
  {
    id: "actions",
    header: () => <div>Actions</div>,
    cell: ({row}) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
            <Pencil /> Update
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trash /> Delete
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`clients/${row.getValue("id")}`} className="flex items-center justify-center gap-2 " >
              <Eye className="h-4 w-4" /> View client
              </Link>
           
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Footprints className="h-4 w-4" />
              Mark as Walk In
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Book className="h-4 w-4" />
              Book Appointment
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
