import { useActiveFormElement, useFormBuilder } from "@store/FormBuilderStore";
import { memo } from "react";
const Toolkit = () => {
  const _activeFormElement = useActiveFormElement(
    (state) => state.activeFormElementId
  );

  const elements = useFormBuilder((state) => state.elements);
  const activeFormElement = elements.find(
    (item) => item.id === _activeFormElement
  );

  console.log({ activeFormElement }, activeFormElement?.id);

  if (
    activeFormElement === undefined ||
    activeFormElement === null ||
    !activeFormElement
  )
    return null;

  // const renderFields = useCallback(() => {
  //   if (!activeFormElement) return;
  // }, [activeFormElement]);

  // const handleInputChange =
  //   (
  //     field: keyof Pick<
  //       FormElementType,
  //       "fieldName" | "placeholder" | "min" | "max"
  //     >
  //   ) =>
  //   (e: React.ChangeEvent<HTMLInputElement>) => {
  //     if (!activeFormElement) return;
  //     updateFormElement(activeFormElement.id, {
  //       [field]: e.target.value,
  //     });
  //   };

  // const handleToggleChange =
  //   (field: "capitalize" | "required") => (isOn: boolean) => {
  //     if (!activeFormElement) return;
  //     updateFormElement(activeFormElement.id, {
  //       [field]: isOn,
  //     });
  //   };

  const renderProperties = () => {
    switch (activeFormElement.type) {
      case "single-line-input":
      case "multi-line-input":
      case "number-input":
      case "date-input":
      case "time-input":
        return (
          // <TextField
          //   key={"placeholder"}
          //   type={"text"}
          //   value={activeFormElement.placeholder}
          //   onChange={handleInputChange("placeholder")}
          // />
          <div></div>
        );
      case "checkbox":
      case "radio-button":
        return (
          // <TextField
          //   key={"placeholder"}
          //   type={"text"}
          //   value={activeFormElement.placeholder}
          //   onChange={handleInputChange("placeholder")}
          // />
          <div></div>
        );
    }
  };

  return (
    <div className="w-full h-full px-3 py-2">
      {/* container */}
      <div className="w-full flex flex-col justify-start gap-2">
        <div className="w-full text-lg font-semibold">Edit Field</div>
        <div className="w-full flex flex-col justify-start gap-4">
          {renderProperties()}
          {/* name */}
          {/* <div className="flex flex-col gap-1">
            <Label name={"Name"} />
            <div>
              <TextField
                key={"name"}
                type={"text"}
                value={activeFormElement.fieldName}
                onChange={handleInputChange("fieldName")}
              />
            </div>
          </div> */}
          {/* placeholder */}
          {/* <div className="flex flex-col gap-1">
            <Label name={"Placeholder"} />
            <div>
              <TextField
                key={"placeholder"}
                type={"text"}
                value={activeFormElement.placeholder}
                onChange={handleInputChange("placeholder")}
              />
            </div>
          </div> */}
          {/* toggles */}
          {/* <div className="flex flex-col gap-2 place-items-center">
            <div className="w-full flex gap-3 justify-start place-items-top">
              <div
                data-tooltip-id={`${activeFormElement.id}-required-tooltip`}
                className="flex"
              >
                <Toggle
                  value={activeFormElement.required}
                  size="small"
                  onChange={handleToggleChange("required")}
                />
              </div>
              <Tooltip
                id={`${activeFormElement.id}-required-tooltip`}
                place="top"
                delayShow={200}
              >
                Toggle to make the field mandatory
              </Tooltip>
              <Label name={"Required"} />
            </div>
            <div className="w-full flex gap-3 justify-start place-items-top">
              <div
                data-tooltip-id={`${activeFormElement.id}-capitalize-tooltip`}
                className="flex"
              >
                <Toggle
                  value={activeFormElement.capitalize}
                  size="small"
                  onChange={handleToggleChange("capitalize")}
                />
              </div>
              <Tooltip
                delayShow={200}
                id={`${activeFormElement.id}-capitalize-tooltip`}
                place="top"
              >
                Toggle to capitalize the field
              </Tooltip>
              <Label name={"Capitalize"} />
            </div>
          </div> */}
          {/* min and max */}
          {/* <div className="flex  gap-4 justify-between place-items-center">
            <div className="flex flex-col gap-1">
              <Label name="Min" size="small" />
              <TextField
                type="number"
                value={activeFormElement.min}
                onChange={handleInputChange("min")}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label name="Max" size="small" />
              <TextField
                type="number"
                value={activeFormElement.max}
                onChange={handleInputChange("max")}
              />
            </div>
          </div> */}

          {Object.entries(activeFormElement.properties).map((item) => (
            <span>{JSON.stringify(item)}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(Toolkit);
