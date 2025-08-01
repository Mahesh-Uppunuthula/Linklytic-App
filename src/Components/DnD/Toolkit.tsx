import TextField from "@components/ui/TextField/TextField";
// import {} from "../../constants";
import { useActiveFormElement, useFormBuilder } from "@store/FormBuilderStore";
import {
  BaseFieldProperties,
  FieldPropertyName,
  FormElement,
  PrimitiveFieldProperties,
  PrimitiveFields,
} from "../../types/global";
import { memo } from "react";
import Label from "@components/ui/Miscellaneous/Label";
import Toggle from "@components/ui/Button/Toggle";

import DatePicker from "../ui/DatePicker/DatePicker";
import { DateTime } from "luxon";

const INACCESIBLE_PROPERTIES = new Set<Partial<FieldPropertyName>>([
  "disabled",
  "order",
]);

const getHumanReadablePropertyName = (name: FieldPropertyName) => {
  switch (name) {
    case "minLength":
      return "Min Length";
    case "maxLength":
      return "Max Length";

    case "minDate":
      return "Min Date";
    case "maxDate":
      return "Max Date";
    case "minTime":
      return "Min Time";
    case "maxTime":
      return "Max Time";

    case "choiceLabels":
      return "Choice Labels";
    default:
      return name;
  }
};

const Toolkit = () => {
  const _activeFormElement = useActiveFormElement(
    (state) => state.activeFormElementId
  );

  const elements = useFormBuilder((state) => state.elements);

  const activeFormElement: FormElement | undefined =
    // useMemo(
    // () =>
    elements.find((item) => item.id === _activeFormElement);
  //   [_activeFormElement, elements]
  // );

  const updateFormElement = useFormBuilder(
    (state) => state.updateElementProperties
  );

  console.log({ activeFormElement }, activeFormElement?.id);

  if (
    activeFormElement === undefined ||
    activeFormElement === null ||
    !activeFormElement
  )
    return null;

  // updateFormElement("", []);
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

  const getProperty = (propertyName: FieldPropertyName) => {
    if (
      propertyName in activeFormElement.properties === false ||
      INACCESIBLE_PROPERTIES.has(propertyName)
    )
      return null;

    switch (propertyName) {
      case "label":
      case "description":
      case "placeholder": {
        return (
          <TextField
            key={propertyName}
            type="text"
            value={
              (activeFormElement.properties as BaseFieldProperties)[
                propertyName
              ]
            }
            placeholder={propertyName}
            onChange={(e) => {
              const value = e.target.value;
              console.log({ value });
              updateFormElement(activeFormElement.id, {
                [propertyName]: value,
              });
            }}
          />
        );
      }

      case "disabled":
      case "required": {
        return (
          <Toggle
            key={propertyName}
            value={activeFormElement.properties[propertyName] as boolean}
            onChange={(value) => {
              updateFormElement(activeFormElement.id, {
                [propertyName]: value,
              });
            }}
          />
        );
      }
      case "max": {
        if ("max" in activeFormElement.properties)
          return (
            <TextField
              key={propertyName}
              type="number"
              value={activeFormElement.properties[propertyName] as number}
              onChange={(e) => {
                const value = Number(e.target.value);
                updateFormElement(activeFormElement.id, {
                  max: value,
                });
              }}
            />
          );
        break;
      }

      case "min": {
        if ("min" in activeFormElement.properties)
          return (
            <TextField
              key={propertyName}
              type="number"
              value={activeFormElement.properties[propertyName] as number}
              onChange={(e) => {
                const value = Number(e.target.value);
                updateFormElement(activeFormElement.id, {
                  min: value,
                });
              }}
            />
          );
        break;
      }

      case "minLength": {
        if ("minLength" in activeFormElement.properties)
          return (
            <TextField
              key={propertyName}
              type="number"
              value={activeFormElement.properties["minLength"] as number}
              onChange={(e) => {
                const value = Number(e.target.value);
                updateFormElement(activeFormElement.id, {
                  minLength: Math.max(Math.min(value, 256), 0),
                });
              }}
            />
          );
        break;
      }
      case "maxLength": {
        if ("maxLength" in activeFormElement.properties)
          return (
            <TextField
              key={propertyName}
              type="number"
              value={activeFormElement.properties[propertyName] as number}
              onChange={(e) => {
                const value = Number(e.target.value);
                updateFormElement(activeFormElement.id, {
                  maxLength: Math.max(Math.min(value, 256), 0),
                });
              }}
            />
          );
        break;
      }

      case "minDate": {
        if ("minDate" in activeFormElement.properties) {
          return (
            <DatePicker
              mode="single"
              captionLayout="dropdown-months"
              placeholder={propertyName}
              selected={DateTime.fromISO(
                activeFormElement.properties?.minDate
              ).toJSDate()}
              onSelect={(date) => {
                if (date) {
                  updateFormElement(activeFormElement.id, {
                    minDate: DateTime.fromJSDate(date).toISO() ?? "",
                  });
                }
              }}
            />
          );
        }
        break;
      }
      case "maxDate": {
        if ("maxDate" in activeFormElement.properties) {
          return (
            <DatePicker
              mode="single"
              captionLayout="dropdown-months"
              placeholder={propertyName}
              selected={DateTime.fromISO(
                activeFormElement.properties?.maxDate
              ).toJSDate()}
              onSelect={(date) => {
                if (date) {
                  updateFormElement(activeFormElement.id, {
                    maxDate: DateTime.fromJSDate(date).toISO() ?? "",
                  });
                }
              }}
            />
          );
        }
        break;
      }

      case "order":
        // do not let user change order via toolkit
        break;

      // default:
      //   return propertyName;
    }
  };

  const renderProperties = () => {
    const properties =
      activeFormElement.properties as PrimitiveFieldProperties<PrimitiveFields>;

    const propertyEntries = Object.entries(properties);

    return (
      <div className="w-full h-full flex flex-col gap-1">
        {propertyEntries.map((property) => {
          const propertyName = property[0] as FieldPropertyName;
          // const value = property[1] as FieldPropertyValueType;

          return (
            <div>
              {!INACCESIBLE_PROPERTIES.has(propertyName) && (
                <Label
                  capitalize
                  name={getHumanReadablePropertyName(propertyName)}
                />
              )}
              {getProperty(propertyName)}
            </div>
          );
        })}
      </div>
    );
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

          {/* {Object.entries(activeFormElement.properties).map((item) => (
            <span>{JSON.stringify(item)}</span>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default memo(Toolkit);
