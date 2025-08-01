import { cn } from "@lib/utils";

type SimpleLoaderProps = {
  fullPage?: boolean;
  loaderSize?: "small" | "medium" | "large";
  loaderColor?: string;
  text?: string;
};
const SimpleLoader: React.FC<SimpleLoaderProps> = ({
  fullPage,
  loaderSize,
  loaderColor,
  text,
}) => {
  return (
    <div
      className={cn(`flex justify-center place-items-center`, {
        "w-dvw h-dvh fixed top-0 left-0 overflow-hidden": fullPage,
        "w-full h-full": !fullPage,
      })}
    >
      <div className="w-full h-full flex flex-col justify-center place-items-center gap-1">
        {/* loading logo + text */}
        <div className="flex place-items-center gap-2">
          <span>
            <div
              style={{
                width: loaderSize ? `[${loaderSize}]px` : "20px",
                color: loaderColor ?? "",
              }}
              className={cn("simple-loader", {
                "w-5 h-5": loaderSize === "small",
                "w-8 h-8": loaderSize === "medium",
                "w-12 h-12": loaderSize === "large",
              })}
            />
          </span>
          <span>{text ?? "Loading..."}</span>
        </div>
      </div>
    </div>
  );
};

export default SimpleLoader;
