import Toggle from "@components/ui/Button/Toggle";
import Label from "@components/ui/Miscellaneous/Label";
import TextField from "@components/ui/TextField/TextField";
import {
  useActiveFormElement,
  useFormBuilderElementsStore,
} from "@store/FormBuilderStore";
import { ElementID, FormElementType } from "@types/global";
import { memo, useCallback } from "react";
import { Tooltip } from "react-tooltip";

/**
 * 
 * Common
 * field-name, required

placeholder
capitalize


Textfield and TextArea
max (max-length)

Number
min 
max


Date  & Time
min (str)
max (str)


Radio Button and checkbox
field-name
required
choice-field-name[]


Phone number
field-name
placeholder
required

 */

/**
 *
 * name fields
 * field-name, placeholder, min, max
 *
 * toggles
 * required, capitalize
 *
 */

type possibleFieldTypeNames =
  | "fieldName"
  | "required"
  | "placeholder"
  | "min"
  | "max"
  | "capitalize";

const CommonFieldTypeNames: Partial<possibleFieldTypeNames>[] = [
  "fieldName",
  "capitalize",
  "required",
];

type FormElementFieldMappingsType = {
  [id in ElementID]?: possibleFieldTypeNames[];
};
const FormElementFieldMappings: FormElementFieldMappingsType = {
  "single-line-input": [...CommonFieldTypeNames, "placeholder", "max"],
  "multi-line-input": [...CommonFieldTypeNames, "placeholder", "max"],
  "number-input": [...CommonFieldTypeNames, "placeholder", "min", "max"],
  "date-input": [...CommonFieldTypeNames, "min", "max"],
  "time-input": [...CommonFieldTypeNames, "min", "max"],
};

const Toolkit = () => {
  const _activeFormElement = useActiveFormElement(
    (state) => state.activeFormElementId
  );

  const elements = useFormBuilderElementsStore((state) => state.elements);
  const activeFormElement = elements.find(
    (item) => item.id === _activeFormElement
  );

  const updateFormElement = useFormBuilderElementsStore(
    (state) => state.updateElement
  );

  const renderFields = useCallback(() => {
    if (!activeFormElement) return;
    const fields = new Set(
      FormElementFieldMappings[activeFormElement.element.type]
    );

    fields.forEach((field) => {
      switch (field) {
        case "fieldName":
          
          break;
      
        default:
          break;
      }
    })

  }, []);

  const handleInputChange =
    (
      field: keyof Pick<
        FormElementType,
        "fieldName" | "placeholder" | "min" | "max"
      >
    ) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!activeFormElement) return;
      updateFormElement(activeFormElement.id, {
        [field]: e.target.value,
      });
    };

  const handleToggleChange =
    (field: "capitalize" | "required") => (isOn: boolean) => {
      if (!activeFormElement) return;
      updateFormElement(activeFormElement.id, {
        [field]: isOn,
      });
    };

  console.log({ activeFormElement }, activeFormElement?.id);

  if (!activeFormElement) return null;
  return (
    <div className="w-full h-full px-3 py-2">
      {/* container */}
      <div className="w-full flex flex-col justify-start gap-2">
        <div className="w-full text-lg font-semibold">Edit Field</div>
        <div className="w-full flex flex-col justify-start gap-4">
          {/* name */}
          <div className="flex flex-col gap-1">
            <Label name={"Name"} />
            <div>
              <TextField
                key={"name"}
                type={"text"}
                value={activeFormElement.fieldName}
                onChange={handleInputChange("fieldName")}
              />
            </div>
          </div>
          {/* placeholder */}
          <div className="flex flex-col gap-1">
            <Label name={"Placeholder"} />
            <div>
              <TextField
                key={"placeholder"}
                type={"text"}
                value={activeFormElement.placeholder}
                onChange={handleInputChange("placeholder")}
              />
            </div>
          </div>
          {/* toggles */}
          <div className="flex flex-col gap-2 place-items-center">
            {/* required toggle */}
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
          </div>
          {/* min and max */}
          <div className="flex  gap-4 justify-between place-items-center">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Toolkit);
