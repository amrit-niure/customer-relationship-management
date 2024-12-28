"use client";

import { ActionsCell } from "@/components/actions-cell";
import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { Client } from "@/db/schema/clients";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Client>[] = [
  {
    id: "rowNumber",
    header: "#",
    cell: ({ row }) => row.index + 1,
  },
  {
    id: "fullName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Full Name" />
    ),
    accessorFn: (row) => `${row.firstName || ""} ${row.lastName || ""}`.trim(),
    cell: ({ row }) => {
      const fullName = row.getValue("fullName") as string;
      return <div>{fullName}</div>;
    },
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
  //   }
  {
    id: "actions",
    header: () => <div>Options</div>,
    cell: ({ row }) => <ActionsCell row={row} />
  }
];
