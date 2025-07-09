import { ReactNode } from "react";
import { Appearance } from "../../../types/global";
import { cn } from "../../../libs/helpers";

type ButtonSize = "small" | "medium" | "large";
type Variants = "soft" | "solid" | "outlined" | "text";

interface ButtonProps extends React.ComponentPropsWithRef<"button"> {
  size?: ButtonSize;
  capitlize?: boolean;
  variant?: Variants;
  appearance?: Appearance;
  bolded?: boolean;
  iconBefore?: ReactNode;
  iconAfter?: ReactNode;
  children: ReactNode;
}

function Button({
  variant = "solid",
  appearance = "default",
  size = "medium",
  bolded,
  disabled,
  iconBefore,
  iconAfter,
  className,
  children,
  ...props
}: ButtonProps) {
  const classNames = cn(
    {
      //default styles
      "w-fit h-fit whitespace-nowrap text-center flex place-items-center gap-1":
        true,

      // psuedo classes
      "focus:outline-2 focus:outline-primary-regular focus:outline-offset-2 ":
        true,
      "disabled:cursor-not-allowed": true,

      // sizes
      "min-w-4 min-h-4 text-xs scale-100": size === "small",
      "min-w-6 min-h-6 text-sm scale-110": size === "medium",
      "min-w-8 min-h-8 text-base scale-125": size === "large",

      // corner radius
      rounded: size === "small" || size === "medium",
      "rounded-md": size === "large",
      "bg-none outline-none border-none": variant === "text",

      //   bolded
      "font-medium": bolded,

      // appearance
      // variant
      "py-[6px] px-[12px]": variant !== "text",

      "text-primary-regular": variant === "text" && appearance === "primary",
      "text-warning-regular": variant === "text" && appearance === "warning",
      "text-danger-regular": variant === "text" && appearance === "danger",
      "text-discovery-regular":
        variant === "text" && appearance === "discovery",
      "text-success-regular": variant === "text" && appearance === "success",
      "text-default-dark": variant === "text" && appearance === "default",

      "text-white bg-primary-regular":
        variant === "solid" && appearance === "primary",
      "text-white bg-warning-regular text-warning-inverse":
        variant === "solid" && appearance === "warning",
      "text-white bg-danger-regular":
        variant === "solid" && appearance === "danger",
      "text-white bg-discovery-regular":
        variant === "solid" && appearance === "discovery",
      "text-white bg-success-regular":
        variant === "solid" && appearance === "success",
      "bg-default-light ": variant === "solid" && appearance === "default",

      border: variant === "outlined",
      "bg-primary-light  text-primary-regular border-primary-regular":
        variant === "outlined" && appearance === "primary",
      "bg-warning-light  text-warning-regular border-warning-regular":
        variant === "outlined" && appearance === "warning",
      "bg-danger-light  text-danger-regular border-danger-regular":
        variant === "outlined" && appearance === "danger",
      "bg-discovery-light  text-discovery-regular border-discovery-regular":
        variant === "outlined" && appearance === "discovery",
      "bg-success-light  text-success-regular border-success-regular":
        variant === "outlined" && appearance === "success",
      "bg-default-light border-default-dark":
        variant === "outlined" && appearance === "default",

      "text-primary-regular bg-primary-light":
        variant === "soft" && appearance === "primary",
      "text-warning-regular bg-warning-light":
        variant === "soft" && appearance === "warning",
      "text-danger-regular bg-danger-light":
        variant === "soft" && appearance === "danger",
      "text-discovery-regular bg-discovery-light":
        variant === "soft" && appearance === "discovery",
      "text-success-regular bg-success-light":
        variant === "soft" && appearance === "success",
      "bg-default-light": variant === "soft" && appearance === "default",

      //disabled
      "bg-default-light text-default-regular": disabled,
    },
    className
  );
  return (
    <button {...props} disabled={disabled} className={classNames}>
      {iconBefore && <span>{iconBefore}</span>}
      <span>{children}</span>
      {iconAfter && <span>{iconAfter}</span>}
    </button>
  );
}

export default Button;
