"use client"

import { DataTableColumnHeader } from "@/components/data-table/column-header"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Client } from "@/db/schema/clients"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const columns: ColumnDef<Client>[] = [
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
      return filterValue.includes(row.getValue(columnId))
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
    cell: ({ row }) => {
      const payment = row.original
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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
