import { forwardRef } from "react";
import { cn } from "@lib/utils";

type FieldType = {
  className?: string;
  isRequired?: boolean;
  name: string;
};
function Field(
  { isRequired, name, className, ...props }: FieldType,
  ref: React.Ref<HTMLDivElement> | undefined
) {
  return (
    <div
      ref={ref}
      {...props}
      className={cn(
        className,
        "text-gray-500 text-sm font-medium flex gap-[2px]"
      )}
    >
      {name.trim().length ? (
        <span>
          {name.trim()}{" "}
          {isRequired && <span className="text-[.9rem] text-red-600">*</span>}
        </span>
      ) : null}
    </div>
  );
}

export default forwardRef(Field);
