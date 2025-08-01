import { cn } from "@lib/utils";
import { motion } from "framer-motion";
import { memo, useCallback, useState } from "react";

type ToggleProps = {
  value?: boolean;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  onChange?: (value: boolean) => void;
};
const Toggle: React.FC<ToggleProps> = ({
  value,
  size = "small",
  disabled,
  onChange,
}) => {
  const [isOn, setIsOn] = useState(value ?? false);
  const handleChange = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      if (disabled) return;
      setIsOn((prev) => {
        onChange?.(!prev);
        return !prev;
      });
    },
    [disabled, onChange]
  );
  return (
    <button
      style={{
        justifyContent: "flex-" + (isOn ? "end" : "start"),
      }}
      className={cn(`w-8 h-4 my-1 p-1 rounded-full flex cursor-pointer`, {
        "bg-emerald-500": isOn,
        "bg-neutral-300": !isOn,
        "w-8": size === "small",
        "w-10": size === "medium",
        "w-12": size === "large",
      })}
      onClick={handleChange}
    >
      <motion.div
        className={cn(`bg-white rounded-full aspect-square`, {
          "w-2": size === "small",
          "w-3": size === "medium",
          "w-4": size === "large",
        })}
        transition={{ type: "spring", duration: 0.4, bounce: 0.3 }}
        layout
      />
    </button>
  );
};

export default memo(Toggle);
