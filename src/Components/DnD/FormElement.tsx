import Label from "@components/ui/Miscellaneous/Label";
import { cn } from "@lib/utils";
import { FormElement as FormElementTypeAlias } from "../../types/global";

type FormElementProps = {
  showOptions: boolean;
  item: FormElementTypeAlias;
};
const FormElement: React.FC<FormElementProps> = ({ item, showOptions }) => {
  const { type, properties } = item;

  if (!properties) return;

  function renderElementSpecificProperties() {
    switch (type) {
      case "single-line-input":
      case "multi-line-input":
      case "number-input":
      case "date-input":
      case "time-input":
        return (
          <div className="w-full min-h-[40px] rounded bg-white shadow flex place-items-center justify-start">
            <span className="p-2 text-neutral-600">
              {properties.placeholder}
            </span>
          </div>
        );
      case "checkbox":
      case "radio-button":
        return (
          <div className="flex flex-wrap gap-3">
            {!!properties.choiceLabels.length &&
              [properties.choiceLabels].map((label) => (
                <div className="w-fit px-2 py-1 rounded flex gap-2 place-items-center border border-neutral-300">
                  <span>{label}</span>
                </div>
              ))}
          </div>
        );
    }
  }

  return (
    <div
      className={cn(
        `w-full h-full p-2 flex flex-col gap-4 rounded-b-md rounded-l-md`,
        { "border-2 border-primary-regular": showOptions }
      )}
    >
      <div className="flex flex-col">
        <span className="w-fit h-fit flex place-items-end">
          <Label
            name={properties.label.length > 0 ? properties.label : "Field Name"}
            required={properties.required}
            size="large"
            bolded
          />
        </span>

        {!!properties.description.length && (
          <span className="text-sm text-neutral-600 text-ellipsis">
            {properties.description}
          </span>
        )}
      </div>
      {renderElementSpecificProperties()}
    </div>
  );
};

export default FormElement;
