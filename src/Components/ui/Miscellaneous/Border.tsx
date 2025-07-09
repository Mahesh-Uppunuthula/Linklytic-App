import React, { memo } from "react";
import { cn } from "../../../libs/helpers";

type BorderProps = {
  type?: "vertical" | "horizontal";
};
const Border: React.FC<BorderProps> = ({ type = "horizontal" }) => {
  return (
    <div
      className={cn(`border border-neutral-100 inline`, {
        "w-full": type === "horizontal",
        "h-full": type === "vertical",
      })}
    />
  );
};

export default memo(Border);
