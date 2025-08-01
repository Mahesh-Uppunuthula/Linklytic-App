import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { cn } from "@lib/utils";
import { ClassValue } from "clsx";

// types
type ModalSizeType = "small" | "medium" | "large" | "xlarge";

type ModalHeaderType = {
  children: React.ReactNode;
};

type ModalType = {
  children: React.ReactNode;
  size?: ModalSizeType;
  onClose?: () => void;
};

type ModalBodyType = {
  children: React.ReactNode;
};

type ModalTitleType = {
  title: string;
  className?: ClassValue;
};

// components
const ModalHeader: React.FC<ModalHeaderType> = ({ children }) => {
  return <div className="p-4 rounded-t border-b">{children}</div>;
};

const ModalBody: React.FC<ModalBodyType> = ({ children }) => {
  return <div className="rounded p-4">{children}</div>;
};

const ModalFooter: React.FC<ModalBodyType> = ({ children }) => {
  return <div className="rounded-b p-4 border-t">{children}</div>;
};

const ModalTitle: React.FC<ModalTitleType> = ({ title, className }) => {
  return (
    <span
      className={cn(
        "font-medium text-xl text-neutral-800 capitalize",
        className
      )}
    >
      {title}
    </span>
  );
};

// TODO - add transition for modal, if opened in phone show full screen, fix modal closing on releasing mouse click on overlay issue
const Modal: React.FC<ModalType> = ({
  children,
  size = "small",
  onClose = () => {},
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const windowListenerAbortController = new AbortController();
    window.addEventListener(
      "keydown",
      (event: KeyboardEvent) => {
        if (event.code === "Escape") {
          onClose();
        }
      },
      {
        signal: windowListenerAbortController.signal,
      }
    );

    return () => {
      windowListenerAbortController.abort();
    };
  }, [onClose]);

  const handleOnClickOverlay = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    onClose?.();
  };

  const classNames = cn({
    // default
    "z-50 bg-white rounded w-full opacity-100 max-w-lg": true,
    "max-w-lg": size === "small",
    "max-w-xl": size === "medium",
    "max-w-3xl": size === "large",
    "max-w-5xl": size === "xlarge",
  });
  return ReactDOM.createPortal(
    // overlay
    <div
      className="fixed inset-0 z-50 bg-[#091E427D] flex justify-center place-items-center"
      onClick={handleOnClickOverlay}
    >
      {/* Modal */}
      <div
        ref={modalRef}
        className={classNames}
        onClick={(event: React.MouseEvent<HTMLDivElement>) =>
          event.stopPropagation()
        }
        data-size:size
      >
        {children}
      </div>
    </div>,
    document.body
  );
};
export default Modal;
export { ModalHeader, ModalTitle, ModalBody, ModalFooter };
