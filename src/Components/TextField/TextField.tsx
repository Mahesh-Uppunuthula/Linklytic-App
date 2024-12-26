import React, { ChangeEvent, useRef, useState } from "react";
import { cn } from "../../Utils/helpers";
import { IoIosInformationCircle } from "react-icons/io";
import { Appearance, StrOrNum } from "../../Types/global";
import { EMAIL_REGEX, URL_REGEX } from "../../constants";

interface TextField
  extends Omit<
    React.ComponentPropsWithoutRef<"input">,
    "defaultValue" | "pattern"
  > {
  type: "email" | "text" | "number" | "password" | "url";
  value: StrOrNum;
  className?: string;
  minWidth?: number;
  minHeight?: number;
  iconBefore?: JSX.Element;
  iconAfter?: JSX.Element;
  isInvalid?: boolean;
  errorMessage?: string;
  helperMessage?: string;
  messageAppearance?: Appearance;
  pattern?: RegExp;
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
  messageAppearance,
  value,
  pattern,
  onKeyUp,
  onChange,
  ...props
}: TextField) {
  const inputFieldRef = useRef<HTMLInputElement>(null);
  const [isInputInvalid, setIsInputInvalid] = useState<Boolean>(false);

  const containerClassNames = cn(
    {
      // default styles
      "w-full h-full rounded pointer-events-none outline outline-1 outline-gray-300 ":
        true,
      "focus-within:outline-2 focus-within:outline-primary-regular":
        !isInvalid && !isInputInvalid,
      // active styles

      //focus styles

      // hover styels

      // invalid styles
      "outline-2 outline-danger-regular": isInvalid || isInputInvalid,
      "has-[:invalid]:outline-danger-regular ": true,
    },
    `min-w-[${minWidth}] min-h-[${minHeight}]`,
    className
  );
  const inputClassNames = cn(
    `w-full outline-none p-2 pointer-events-auto placeholder-gray-400  placeholder-opacity-75 flex-grow`
  );

  const helperMessageClassNames = cn(
    {
      "text-gray-400": messageAppearance === "default",
      "text-primary-regular": messageAppearance === "primary",
      "text-success-regular": messageAppearance === "success",
      "text-warning-regular": messageAppearance === "warning",
      "text-danger-regular":
        isInvalid || isInputInvalid || messageAppearance === "danger",
      "text-discovery-regular": messageAppearance === "discovery",
    },
    "text-xs my-1"
  );

  function message() {
    if ((isInvalid || isInputInvalid) && errorMessage.trim().length > 0)
      return errorMessage;
    if (helperMessage && helperMessage.length > 0) return helperMessage;
  }

  const renderHelperMessage = () => {
    return <div className={helperMessageClassNames}>{message()}</div>;
  };

  const validateInput = (value: string) => {
    let _isValid = true;
    if (pattern) {
      _isValid = pattern.test(value);
      inputFieldRef.current?.setCustomValidity(
        _isValid ? "" : "Invalid password"
      );
    } else {
      switch (type) {
        case "email":
          _isValid = !!EMAIL_REGEX.test(value);
          inputFieldRef.current?.setCustomValidity(
            _isValid ? "" : "Invalid email"
          );
          break;
        case "url":
          _isValid = !!URL_REGEX.test(value);
          console.log("URL", { value, _isValid });
          inputFieldRef.current?.setCustomValidity(
            _isValid ? "" : "Invalid URL"
          );
          break;

        default:
          break;
      }
    }
    setIsInputInvalid(!_isValid);
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const _value = event.target.value;
    validateInput(_value);
    onChange && onChange(event);
  };

  return (
    <div className="w-full h-full flex flex-col gap-1 place-items-start">
      <div className={containerClassNames}>
        <div className="flex justify-start place-items-center">
          {iconBefore && (
            <div className="h-full flex justify-center place-items-center p-1">
              {iconBefore}
            </div>
          )}
          <input
            ref={inputFieldRef}
            {...props}
            value={value}
            tabIndex={0}
            className={inputClassNames}
            type={type}
            onChange={handleOnChange}
          />
          {isInvalid || isInputInvalid ? (
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
      </div>
      {renderHelperMessage()}
    </div>
  );
}

export default TextField;
