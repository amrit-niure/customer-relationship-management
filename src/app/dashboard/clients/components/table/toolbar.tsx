import { Table } from "@tanstack/react-table"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { visas } from "@/app/dashboard/clients/components/table/toolbar-data"
import { DataTableFacetedFilter } from "@/components/data-table/faceted-filter"
import { DataTableViewOptions } from "@/components/data-table/view-options"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  
  const isFiltered = table.getState().columnFilters.length > 0
  
  // Safely check if the column exists before trying to access it
  const currentVisaColumn = table.getAllColumns().find(
    (column) => column.id === "currentVisa"
  )

  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search by name or email..."
          value={table.getState().globalFilter ?? ""}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {currentVisaColumn && (
          <DataTableFacetedFilter
            column={currentVisaColumn}
            title="Visa"
            options={visas}
          />
        )}
        {(isFiltered || table.getState().globalFilter) && (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters()
              table.setGlobalFilter("")
            }}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}

export default DataTableToolbar;