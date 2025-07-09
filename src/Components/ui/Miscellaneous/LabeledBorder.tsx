import { memo } from "react";
import { cn } from "../../../libs/helpers";
import { ClassValue } from "clsx";
type LabeledBorderProps = {
  title: string;
  appearance?: "default" | "primary";
  children?: React.ReactNode;
  className?: ClassValue;
};
const LabeledBorder: React.FC<LabeledBorderProps> = ({
  title,
  appearance = "default",
  children,
  className,
}) => {
  return (
    <fieldset
      className={cn(
        `w-full h-full border p-2 rounded`,
        {
          "border-neutral-200": appearance === "default",
          "border-primary-regular": appearance === "primary",
        },
        className
      )}
    >
      <legend
        className={cn(`text-sm`, {
          "text-neutral-400": appearance === "default",
          "text-primary-regular": appearance === "primary",
        })}
      >
        {title}
      </legend>
      {children}
    </fieldset>
  );
};

export default memo(LabeledBorder);
