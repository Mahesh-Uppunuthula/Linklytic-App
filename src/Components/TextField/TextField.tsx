import React, { ChangeEvent, useRef, useState } from "react";
import { cn } from "../../Utils/helpers";
import { IoIosInformationCircle } from "react-icons/io";
import { Appearance, StrOrNum } from "../../Types/global";
import { EMAIL_REGEX } from "../../constants";

interface TextField
  extends Omit<React.ComponentPropsWithoutRef<"input">, "defaultValue"> {
  type: "email" | "text" | "number" | "password";
  className?: string;
  minWidth?: number;
  minHeight?: number;
  iconBefore?: JSX.Element;
  iconAfter?: JSX.Element;
  isInvalid?: boolean;
  errorMessage?: string;
  helperMessage?: string;
  helperMessageAppearance?: Appearance;
  isRequired?: boolean;
  label?: string;
}

function TextField({
  type = "text",

  // styling
  className,
  minWidth = 150,
  minHeight = 30,
  isInvalid = false,

  // functional
  errorMessage = "" /** whenever isInvalid is true a error message is shown */,
  iconBefore,
  iconAfter,
  helperMessage,
  helperMessageAppearance,
  isRequired,
  label = "",
  value,
  pattern,
  onKeyUp,
  onChange,
  ...props
}: TextField) {
  const inputFieldRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<StrOrNum>(
    type === "number" ? 0 : "" // if default exists give priority to default value
  );
  const [isInputInvalid, setIsInputInvalid] = useState<Boolean>(false);
  const [showRequiredMessage, setShowRequiredMessage] = useState(false);

  const containerClassNames = cn(
    {
      // default styles
      "w-full h-full rounded pointer-events-none outline outline-1 outline-gray-300 ":
        true,
      "focus-within:outline-2 focus-within:outline-primary-regular": true,
      // active styles

      //focus styles

      // hover styels

      // invalid styles
      "outline-2 outline-danger-regular": isInvalid || isInputInvalid,
      "has-[:invalid]:outline-danger-regular": true,
    },
    `min-w-[${minWidth}] min-h-[${minHeight}]`,
    className
  );
  const inputClassNames = cn(
    `w-full outline-none p-2 pointer-events-auto placeholder-gray-400  placeholder-opacity-75 flex-grow`
  );

  const helperMessageClassNames = cn(
    {
      "text-gray-400": helperMessageAppearance === "default",
      "text-primary-regular": helperMessageAppearance === "primary",
      "text-success-regular": helperMessageAppearance === "success",
      "text-warning-regular": helperMessageAppearance === "warning",
      "text-danger-regular":
        showRequiredMessage ||
        isInvalid ||
        helperMessageAppearance === "danger",
      "text-discovery-regular": helperMessageAppearance === "discovery",
    },
    "text-xs my-1"
  );

  function message() {
    if (isInvalid && errorMessage.trim().length > 0) return errorMessage;
    if (isRequired && (showRequiredMessage || isInvalid))
      return "This field is required";
    if (helperMessage && helperMessage.length > 0) return helperMessage;
  }

  const renderHelperMessage = () => {
    return <div className={helperMessageClassNames}>{message()}</div>;
  };

  const validateInput = (value: string) => {
    let _isValid = false;
    if (pattern) {
      _isValid = !!pattern.match(value);
    } else {
      if (type === "email") {
        const _isValid = EMAIL_REGEX.test(value);
        setIsInputInvalid(!!_isValid);
        inputFieldRef.current?.setCustomValidity(
          _isValid ? "" : "Invalid email"
        );
      } else {
        _isValid = value.trim().length > 0;
        inputFieldRef.current?.setCustomValidity(
          _isValid ? "" : "This field is required"
        );
      }
    }

    setIsInputInvalid(_isValid);
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const _value = event.target.value;
    // considers spaces as well
    const hasSomeValue = !!_value.length;

    setInputValue(_value);
    setShowRequiredMessage(!hasSomeValue);
    validateInput(_value);
    onChange && onChange(event);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") {
      setShowRequiredMessage(
        () => !!isRequired && inputValue.toString().length === 0
      );
    }
    onKeyUp && onKeyUp(event);
  };

  return (
    <div className="w-full h-full flex flex-col gap-1 place-items-start">
      {!!label.trim().length && (
        <label className="text-gray-500 text-xs font-medium flex gap-[2px]">
          <span>{label.trim()}</span>
          {isRequired && <span className="text-[.9rem] text-red-600">*</span>}
        </label>
      )}
      <div className={containerClassNames}>
        <div className="flex justify-start place-items-center">
          {iconBefore && (
            <div className="h-full flex justify-center place-items-center p-1">
              {iconBefore}
            </div>
          )}
          <input
            id={"custom-text-field"}
            ref={inputFieldRef}
            {...props}
            pattern={pattern}
            value={value}
            tabIndex={0}
            className={inputClassNames}
            type={type}
            onChange={handleOnChange}
            onKeyUp={handleKeyUp}
          />
          {isInvalid ? (
            <div
              title={helperMessage ?? ""}
              className={cn(`mx-1 text-xl text-danger-regular`)}
            >
              <IoIosInformationCircle />
            </div>
          ) : (
            iconAfter && (
              <div className=" ml-auto h-full flex justify-center place-items-center p-1">
                {iconAfter}
              </div>
            )
          )}
        </div>
        {renderHelperMessage()}
      </div>
    </div>
  );
}

export default TextField;
