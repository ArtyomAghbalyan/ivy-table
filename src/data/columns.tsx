import { Checkbox } from "@/components/ui/checkbox";
import EditableCell from "@/components/jobs/EditableCell.tsx";

export const getColumns = (
  onCellUpdate: (
    rowIndex: number,
    fieldAccessor: string,
    value: boolean | string,
  ) => void,
) => [
  {
    accessorKey: "name",
    header: "Name (job title)",
    size: 400,
    cell: ({
      getValue,
      row,
    }: {
      getValue: () => string;
      row: { index: number };
    }) => {
      const nameValue = getValue();
      return (
        <EditableCell
          initialValue={nameValue}
          onUpdate={onCellUpdate}
          rowIndex={row.index}
          fieldAccessor="name"
        />
      );
    },
  },
  {
    accessorKey: "age",
    header: () => "Age",
    size: 200,
    cell: ({
      getValue,
      row,
    }: {
      getValue: () => string;
      row: { index: number };
    }) => {
      const nameValue = getValue();
      return (
        <EditableCell
          initialValue={nameValue}
          onUpdate={onCellUpdate}
          rowIndex={row.index}
          fieldAccessor="age"
        />
      );
    },
  },
  {
    accessorKey: "nickname",
    header: () => "Nickname",
    size: 400,
    cell: ({
      getValue,
      row,
    }: {
      getValue: () => string;
      row: { index: number };
    }) => {
      const nameValue = getValue();
      return (
        <EditableCell
          initialValue={nameValue}
          onUpdate={onCellUpdate}
          rowIndex={row.index}
          fieldAccessor="nickname"
        />
      );
    },
  },
  {
    accessorKey: "employee",
    header: () => "Employee",
    cell: ({
      getValue,
      row,
    }: {
      getValue: () => boolean;
      row: { index: number };
    }) => {
      const employeeValue = getValue();
      return (
        <Checkbox
          onClick={() => onCellUpdate(row.index, "employee", !employeeValue)}
          checked={employeeValue}
        />
      );
    },
  },
];
