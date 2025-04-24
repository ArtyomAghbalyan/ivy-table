import { TableCell, TableRow } from "@/components/ui/table.tsx";
import { flexRender, Row } from "@tanstack/react-table";
import { Job } from "@/data/JobMockData.ts";
import { VirtualItem, Virtualizer } from "@tanstack/react-virtual";

interface TableBodyRowProps {
  row: Row<Job>;
  virtualRow: VirtualItem;
  rowVirtualizer: Virtualizer<HTMLDivElement, HTMLTableRowElement>;
}

const JobTableRow = ({
  row,
  virtualRow,
  rowVirtualizer,
}: TableBodyRowProps) => {
  return (
    <TableRow
      data-index={virtualRow.index} //needed for dynamic row height measurement
      ref={(node) => rowVirtualizer.measureElement(node)} //measure dynamic row height
      key={row.id}
      style={{
        display: "flex",
        position: "absolute",
        transform: `translateY(${virtualRow.start}px)`, //this should always be a `style` as it changes on scroll
        width: "100%",
      }}
    >
      {row.getVisibleCells().map((cell) => {
        return (
          <TableCell
            key={cell.id}
            style={{
              display: "flex",
              width: cell.column.getSize(),
            }}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default JobTableRow;
