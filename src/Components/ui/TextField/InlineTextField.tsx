import { ChangeEvent, memo, useCallback, useRef, useState } from "react";
import { cn } from "@lib/utils";
import { LuCheck, LuX } from "react-icons/lu";
import { useOutsideClick } from "../../../hooks/useOutsideClick";

type InlineTextFieldProps = {
  value?: string;
  disabled?: boolean;
  bolded?: boolean;
  placeholder?: string;
  onInputChange?: (text: string) => void;
  onSave: (text: string) => void;
  onCancel: () => void;
};
const InlineTextField: React.FC<InlineTextFieldProps> = ({
  value,
  disabled,
  bolded,
  placeholder,
  onCancel,
  onInputChange,
  onSave,
}) => {
  const [inputValue, setInputValue] = useState(value ?? "");
  const [showOptions, setShowOptions] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

  const handleonInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setInputValue(value);
      if (onInputChange) onInputChange(value);
    },
    [onInputChange]
  );

  const handleSave = useCallback(
    (event: React.MouseEvent<HTMLButtonElement> | MouseEvent) => {
      event.stopPropagation();
      if (disabled) return; 
      setShowOptions(false);
      onSave(inputValue);
    },
    [disabled, inputValue, onSave]
  );

  const handleCancel = useCallback(
    (event: React.MouseEvent<HTMLButtonElement> | MouseEvent) => {
      event?.stopPropagation();
      setShowOptions(false);
      if (disabled) return;
      onCancel();
    },
    [disabled, onCancel]
  );

  const handleInputFocus = useCallback(() => {
    setShowOptions(true);
  }, []);

  useOutsideClick(componentRef, handleSave, showOptions);

  return (
    <div ref={componentRef}>
      <div className="relative">
        {/* text field */}
        <input
          className={cn(
            `w-full px-2 py-1 rounded text-neutral-800 text-sm outline-none hover:bg-neutral-100 focus:bg-neutral-100 focus:outline focus:outline-2 focus:outline-primary-regular `,
            {
              "bg-neutral-100 text-neutral-400 cursor-not-allowed select-none":
                disabled,
              "font-medium": bolded,
            }
          )}
          type="text"
          value={inputValue}
          autoFocus={showOptions}
          disabled={disabled}
          placeholder={placeholder}
          onChange={handleonInputChange}
          onMouseDown={handleInputFocus}
        />
        {/* options */}
        {showOptions && (
          <div className="absolute right-0 bottom-[-35px] flex gap-2 place-items-center [&_button]:rounded [&_button]:text-neutral-600 [&_button]:p-2 [&_button]:bg-neutral-50 [&_button:hover]:bg-neutral-100 [&_button:active]:bg-neutral-200 [&_button:active]:scale-90 [&_button]:shadow-md">
            <button onClick={handleSave}>
              <LuCheck strokeWidth={2} size={15} />
            </button>
            <button onClick={handleCancel}>
              <LuX strokeWidth={2} size={15} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(InlineTextField);
