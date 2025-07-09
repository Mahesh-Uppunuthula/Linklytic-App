import { memo } from "react";
import { cn } from "../../../libs/helpers";
import { IoIosCheckmarkCircle, IoIosInformationCircle } from "react-icons/io";
import { MdError } from "react-icons/md";
import { AiFillQuestionCircle } from "react-icons/ai";
import { PiWarningFill } from "react-icons/pi";

type SectionMessageProps = {
  title: string;
  description?: string;
  appearance?: "info" | "warning" | "success" | "discovery" | "error";
  bolded?: boolean;
};
const SectionMessage: React.FC<SectionMessageProps> = ({
  title,
  appearance = "info",
  description,
  bolded,
}) => {
  const Icon = () => {
    switch (appearance) {
      case "info":
        return (
          <IoIosInformationCircle size={24} className="text-primary-regular" />
        );
      case "warning":
        return <PiWarningFill size={24} className="text-warning-regular" />;
      case "discovery":
        return (
          <AiFillQuestionCircle size={24} className="text-discovery-regular" />
        );
      case "error":
        return <MdError size={24} className="text-danger-regular" />;
      case "success":
        return (
          <IoIosCheckmarkCircle size={24} className="text-success-regular" />
        );

      default:
        return <IoIosInformationCircle size={24} />;
    }
  };
  return (
    <div
      className={cn(
        `w-full h-fit rounded-md text-neutral-800 p-2 flex gap-2 justify-start place-items-top`,
        {
          "bg-primary-light": appearance === "info",
          "bg-warning-light": appearance === "warning",
          "bg-success-light": appearance === "success",
          "bg-discovery-light": appearance === "discovery",
          "bg-danger-light": appearance === "error",
        }
      )}
    >
      {/* left section */}
      <div className="mx-1">
        <Icon />
      </div>
      <div className="w-full h-full flex flex-col gap-1">
        <div
          className={cn({
            "font-medium": bolded,
          })}
        >
          {title}
        </div>
        {description && (
          <div className="w-full h-fit text-xs text-neutral-600">
            <span>{description}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(SectionMessage);
