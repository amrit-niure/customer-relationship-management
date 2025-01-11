import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { User } from "@/db/schema";
import { Appointments } from "@/db/schema/appointments";
import { Client } from "@/db/schema/clients";
import { OfficeVisits } from "@/db/schema/office-visits";
import { ColumnDef } from "@tanstack/react-table";
import { OfficeVisitsTableActionCell } from "./actions-cell";

export const columns: ColumnDef<
  OfficeVisits & { client: Client; appointment: Appointments; agent: User }
>[] = [
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
    accessorFn: (row) =>
      `${row.client.firstName || ""} ${row.client.lastName || ""}`.trim(),
    cell: ({ row }) => {
      const fullName = row.getValue("fullName") as string;
      return <div>{fullName}</div>;
    },
  },
   {
      id: "actions",
      header: () => <div>Options</div>,
      cell: ({ row }) => <OfficeVisitsTableActionCell row={row} />
    }
];
