import { cn } from "@/lib/utils";
import {
  ToggleGroup as RadixToggleGroup,
  ToggleGroupItem as RadixToggleGroupItem,
  ToggleGroupItemProps as RadixToggleGroupItemProps,
} from "@radix-ui/react-toggle-group";
import React from "react";

type ToggleGroupProps = React.ComponentPropsWithoutRef<
  typeof RadixToggleGroup
> & {
  size?: "sm" | "md" | "lg";
  className?: string;
};
const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof RadixToggleGroup>,
  ToggleGroupProps
>(({ size = "md", className, ...props }, ref) => {
  return (
    <RadixToggleGroup
      ref={ref}
      className={cn(
        "inline-flex rounded-md p-1 border border-input bg-background",
        {
          "h-8": size === "sm",
          "h-10": size === "md",
          "h-12": size === "lg",
        },
        className
      )}
      {...props}
    />
  );
});

ToggleGroup.displayName = "ToggleGroup";
interface ToggleGroupItemProps extends RadixToggleGroupItemProps {
  className?: string;
}

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof RadixToggleGroupItem>,
  ToggleGroupItemProps
>(({ className, ...props }, ref) => {
  return (
    <RadixToggleGroupItem
      ref={ref}
      className={cn(
        "rounded-sm inline-flex items-center justify-center px-3 select-none transition-colors focus:outline-none focus:ring-2 focus:ring-primary-regular focus:ring-offset data-[state=on]:bg-neutral-200/70 data-[state=on]:text-accent-foreground disabled:opacity-50 disabled:pointer-events-none",
        className
      )}
      {...props}
    />
  );
});

ToggleGroupItem.displayName = "ToggleGroupItem";

export { ToggleGroup, ToggleGroupItem };
