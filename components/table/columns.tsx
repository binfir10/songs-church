'use client'
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Songs } from "@/app/page";

export const colums: ColumnDef<Songs>[] = [
  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    accessorKey: 'name',
  },
  {
    header: ({ column }) => {
      return (
        <div className="hidden sm:block">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Autor
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>

      )
    },
    accessorKey: 'author',
    cell: ({ cell }) => (
      <div className="hidden sm:block">
        {cell.getValue() as React.ReactNode}
      </div>
    ),
  },
  {
    header: 'Hombre',
    accessorKey: 'man',
  },
  {
    header: 'Mujer',
    accessorKey: 'woman',
  },
]