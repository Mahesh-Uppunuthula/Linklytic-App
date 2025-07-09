import { memo } from "react";
import { cn } from "../../../libs/helpers";

type PageHeaderProps = {
  text: string;
  size?: "small" | "medium" | "large";
};
const PageHeader: React.FC<PageHeaderProps> = ({ text, size = "large" }) => {
  return (
    <div>
      <span
        className={cn(`font-medium text-xl text-neutral-800 capitalize`, {
          "text-sm": size === "small",
          "text-md": size === "medium",
          "text-lg": size === "large",
        })}
      >
        {text ?? ""}
      </span>
    </div>
  );
};

export default memo(PageHeader);
