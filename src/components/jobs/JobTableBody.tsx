import { Job } from "@/data/JobMockData.ts";
import { Row, Table } from "@tanstack/react-table";
import { RefObject } from "react";
import { TableBody } from "@/components/ui/table.tsx";
import JobTableRow from "@/components/jobs/JobTableRow.tsx";
import { useVirtualizer } from "@tanstack/react-virtual";

interface TableBodyProps {
  table: Table<Job>;
  tableContainerRef: RefObject<HTMLDivElement | null> | null;
}
const JobTableBody = ({ table, tableContainerRef }: TableBodyProps) => {
  const { rows } = table.getRowModel();

  // Important: Keep the row virtualizer in the lowest component possible to avoid unnecessary re-renders.
  const rowVirtualizer = useVirtualizer<HTMLDivElement, HTMLTableRowElement>({
    count: rows.length,
    estimateSize: () => 33, //estimate row height for accurate scrollbar dragging
    getScrollElement: () => tableContainerRef?.current,
    //measure dynamic row height, except in firefox because it measures table border height incorrectly
    measureElement:
      typeof window !== "undefined" &&
      navigator.userAgent.indexOf("Firefox") === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  });

  return (
    <TableBody
      style={{
        display: "grid",
        height: `${rowVirtualizer.getTotalSize()}px`, //tells scrollbar how big the table is
        position: "relative", //needed for absolute positioning of rows
      }}
    >
      {rowVirtualizer.getVirtualItems().map((virtualRow) => {
        const row = rows[virtualRow.index] as Row<Job>;
        return (
          <JobTableRow
            key={row.id}
            row={row}
            virtualRow={virtualRow}
            rowVirtualizer={rowVirtualizer}
          />
        );
      })}
    </TableBody>
  );
};

export default JobTableBody;
