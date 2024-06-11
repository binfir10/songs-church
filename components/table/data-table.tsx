'use client'
import React, { useState } from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({ columns, data, }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(), //paginacion
    onColumnFiltersChange: setColumnFilters, //filtrado
    getFilteredRowModel: getFilteredRowModel(), //filtrado
    getSortedRowModel: getSortedRowModel(), //ordenamiento
    onSortingChange: setSorting, //ordenamiento

    state: {   //ordenamiento
      sorting,
      columnFilters,
    }
  })
  return (
    <div className=''>
      {/*filter*/}
      <div className="flex items-center py-4">
        <Input
          placeholder="Buscar por Nombre..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      {/*table*/}
      <div className="rounded-md border border-muted">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No hay resultados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/*paginacion*/}
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <Button
          disabled={!table.getCanPreviousPage()}
          onClick={() => {
            table.previousPage()
          }}>
          Anterior
        </Button>
        <p>
          {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
        </p>
        <Button
          disabled={!table.getCanNextPage()}
          onClick={() => {
            table.nextPage()
          }}>
          Siguiente
        </Button>
      </div>
    </div>

  )
}


