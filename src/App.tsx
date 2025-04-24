import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table, TableHead, TableRow } from "./components/ui/table";
import { TableHeader } from "@/components/ui/table.tsx";
import { RefObject, useEffect, useRef, useState } from "react";
import { getColumns } from "@/data/columns.tsx";
import { makeData } from "@/data/JobMockData.ts";
import JobTableBody from "@/components/jobs/JobTableBody.tsx";

function App() {
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [tableContRef, setTableContRef] =
    useState<RefObject<HTMLDivElement | null> | null>(null);
  const [data, setData] = useState(() => makeData(100000));

  const handleValueChange = (
    rowIndex: number,
    fieldAccessor: string,
    value: boolean | string,
  ) => {
    setData((prev) =>
      prev.map((row, index) =>
        index === rowIndex ? { ...row, [fieldAccessor]: value } : row,
      ),
    );
  };

  const columns = getColumns(handleValueChange);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  useEffect(() => {
    if (tableContainerRef.current) {
      setTableContRef(tableContainerRef);
    }
  }, [tableContainerRef]);

  return (
    <div className="app space-y-4">
      <div
        ref={tableContainerRef}
        className="relative h-[800px] overflow-auto rounded-md border"
      >
        <Table className="grid" style={{ width: "100%" }}>
          <TableHeader
            className="grid sticky top-0 z-10 bg-background"
            style={{ width: "100%" }}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="flex w-full">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="flex items-center"
                    style={{ width: header.getSize() }}
                  >
                    <div
                      className={
                        header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : ""
                      }
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <JobTableBody table={table} tableContainerRef={tableContRef} />
        </Table>
      </div>
    </div>
  );
}

export default App;
