import { memo } from "react";
import { cn } from "../../../libs/helpers";

type LableProps = {
  name: string;
  capitalize?: boolean;
  size?: "large" | "medium" | "small";
  required?: boolean;
};
const Label: React.FC<LableProps> = ({
  name,
  capitalize,
  size = "medium",
  required,
}) => {
  return (
    <label
      htmlFor={name}
      className={cn(`text-neutral-700`, {
        capitalize: capitalize,
        "text-xs": size === "small",
        "text-sm": size === "medium",
        "text-md": size === "large",
      })}
    >
      {name}
      {required && (
        <span className="mx-1 font-medium text-danger-regular text-sm">*</span>
      )}
    </label>
  );
};

export default memo(Label);
