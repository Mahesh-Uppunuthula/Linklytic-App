import { LuSquirrel } from "react-icons/lu";
import { cn } from "../../../libs/helpers";

type DetailedLoaderProps = {
  fullPage?: boolean;
  description?: string;
};

const DetailedLoader: React.FC<DetailedLoaderProps> = ({
  fullPage,
  description,
}) => {
  return (
    <div
      className={cn(`flex justify-center place-items-center`, {
        "w-dvw h-dvh fixed top-0 left-0 overflow-hidden": fullPage,
        "w-full h-full": !fullPage,
      })}
    >
      <div className="w-full h-full flex flex-col justify-center place-items-center gap-4">
        {/* SVG */}
        <div>
          <LuSquirrel
            size={56}
            strokeWidth={1}
            className="text-primary-regular"
          />
        </div>

        <div className="flex flex-col justify-center place-items-center gap-2">
          {/* description */}
          <p className="text-sm  font-medium text-neutral-800">
            {description ?? "loading..."}
          </p>
          <div className="progress-loader" />
        </div>
      </div>
    </div>
  );
};
export default DetailedLoader;
