import { memo } from "react";
import { cn } from "@lib/utils";

type LableProps = {
  name: string;
  capitalize?: boolean;
  size?: "large" | "medium" | "small";
  required?: boolean;
  bolded?: boolean;
};
const Label: React.FC<LableProps> = ({
  name,
  capitalize,
  size = "medium",
  required,
  bolded,
}) => {
  return (
    <label
      htmlFor={name}
      className={cn(`text-neutral-700`, {
        capitalize: capitalize,
        "text-xs": size === "small",
        "text-sm": size === "medium",
        "text-md": size === "large",
        "font-medium": bolded,
      })}
    >
      {name}
      {required && (
        <span className="mx-1 font-bold text-danger-regular text-sm">*</span>
      )}
    </label>
  );
};

export default memo(Label);
