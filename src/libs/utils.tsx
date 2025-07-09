import { nanoid } from "nanoid";
import { BaseItemType, FormElementType } from "../types/global";

export function buildFormElement(item: BaseItemType): FormElementType {
  const { id: elementId, type } = item;
  const newId = `${elementId}_${nanoid().slice(0, 5)}`;
  const newFormElement: FormElementType = {
    id: newId,
    fieldName: newId,
    element: {
      type: elementId,
      category: type,
    },
    order: 0,
    required: false,
    readOnly: false,
    placeholder: "",
    min: 0,
    max: 0,
    helpText: "",
  };
  return newFormElement;
}
