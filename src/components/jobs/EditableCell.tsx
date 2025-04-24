import { useEffect, useState, KeyboardEvent } from "react";
import { Input } from "@/components/ui/input.tsx";

interface EditableCellProps {
  initialValue: string | boolean;
  onUpdate: (
    rowIndex: number,
    fieldAccessor: string,
    value: boolean | string,
  ) => void;
  fieldAccessor: string;
  rowIndex: number;
}

const EditableCell = ({
  initialValue,
  onUpdate,
  rowIndex,
  fieldAccessor,
}: EditableCellProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);

  const onBlur = () => {
    setIsEditing(false);
    onUpdate(rowIndex, fieldAccessor, value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onBlur();
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setValue(initialValue);
    }
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return isEditing ? (
    <Input
      autoFocus
      value={value as string}
      onKeyDown={handleKeyDown}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => onBlur()}
    />
  ) : (
    <div onClick={() => setIsEditing(true)}>{value}</div>
  );
};

export default EditableCell;
