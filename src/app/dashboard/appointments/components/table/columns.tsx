"use client";

import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { Appointments } from "@/db/schema/appointments";
import { Client } from "@/db/schema/clients";
import { ColumnDef } from "@tanstack/react-table";
import { AppointmentsTableActionCell } from "./actions-cell";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<Appointments & { client: Client }>[] = [
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
    accessorFn: (row) => `${row.client.firstName || ""} ${row.client.lastName || ""}`.trim(),
    cell: ({ row }) => {
      const fullName = row.getValue("fullName") as string;
      return <div>{fullName}</div>;
    },
  },
  {
    accessorKey: "client.email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "client.phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
  },
  {
    accessorKey: "client.address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Address" />
    ),
  },
  {
    accessorKey: "appointmentDateTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      const dateTime = new Date(row.original.appointmentDateTime);
      return dateTime.toLocaleDateString("en-AU", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
  },
  {
    accessorKey: "appointmentDateTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Time" />
    ),
    cell: ({ row }) => {
      const dateTime = new Date(row.original.appointmentDateTime);
      return dateTime.toLocaleTimeString("en-AU", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }); 
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell:({row}) => {
      const status = row.original.status;
      const statusVariantMap: { [key: string]: "default" | "destructive" | "secondary" | "outline" | null | undefined } = {
        SCHEDULED: "default",
        COMPLETED: "secondary",
        CANCELLED: "outline",
        EXPIRED: "destructive",
      };
      const variant = statusVariantMap[status] || "default";
      return <Badge variant={variant} className="font-light">{status.toLocaleLowerCase() }</Badge>;
    }
  },
  {
    id: "actions",
    header: () => <div>Options</div>,
    cell: ({ row }) => <AppointmentsTableActionCell row={row} />
  }
];