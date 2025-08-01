import { motion } from "framer-motion";
import { ReactElement, useCallback, useState } from "react";
import { cn } from "@lib/utils";

type Id = string;
export type TabType = {
  id: Id;
  label: ReactElement | string;
  disabled?: boolean;
};

type TabsProps = {
  tabs: TabType[];
  defaultActiveTab?: number;
  appearance?: "primary" | "default";
  orientation?: "horizontal" | "vertical";
  onChange: (id: Id) => void;
};

const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultActiveTab,
  appearance = "default",
  onChange,
  orientation = "horizontal",
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0].id);

  const handleTabChange = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const target = event.target as HTMLDivElement;
      const buttonExists = target.closest<HTMLButtonElement>("button[data-id]");
      if (buttonExists) {
        const tabId = buttonExists.getAttribute("data-id");
        const isDisabled = /true/.test(
          buttonExists.getAttribute("data-disabled") ?? "false"
        );
        if (!tabId || isDisabled) return;
        setActiveTab(tabId);
        if (onChange) onChange(tabId as Id);
      }
    },
    [onChange]
  );
  return (
    <div className="w-full h-full">
      {/* container */}
      <div
        className={cn(
          `w-fit h-full flex place-items-center gap-2 p-1 rounded bg-default-dark/5`,
          { "flex-col": orientation === "vertical" }
        )}
        onClick={handleTabChange}
      >
        {tabs.map(({ id, label, disabled }, idx) => {
          return (
            <button
              key={`tab-${id}-${idx}`}
              className={cn(
                `relative px-2 py-1 text-sm outline-primary-regular`,
                {
                  "cursor-not-allowed select-none": disabled,
                  "w-full": orientation === "vertical",
                }
              )}
              style={{ WebkitTapHighlightColor: "transparent" }}
              data-disabled={!!disabled}
              data-id={id}
            >
              {activeTab === id && (
                <motion.span
                  className={cn(`rounded absolute inset-0 z-10 `, {
                    "bg-primary-regular mix-blend-lighten":
                      appearance === "primary",
                    "bg-default-light mix-blend-lighten":
                      appearance === "default",
                  })}
                  layoutId="activeTab"
                  transition={{ bounce: 0.2, duration: 0.3, type: "spring" }}
                />
              )}
              <span
                className={cn({
                  "text-white": appearance === "primary" && activeTab === id,
                  "text-neutral-800":
                    appearance === "default" && activeTab === id,
                  "text-neutral-500 hover:text-neutral-700":
                    (appearance === "default" || appearance === "primary") &&
                    activeTab !== id,
                  "text-neutral-400 hover:text-neutral-400": disabled,
                })}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;
