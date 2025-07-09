export type StrOrNum = string | number;
export type Appearance =
  | "primary"
  | "warning"
  | "danger"
  | "discovery"
  | "default"
  | "success";

export type TLinkBase = {
  name: string;
  longUrl: string;
};

export type ElementID =
  | "single-line-input"
  | "multi-line-input"
  | "number-input"
  | "date-input"
  | "time-input"
  | "radio-button"
  | "checkbox";

export type ElementCategory = "text" | "date" | "selection-choice";

type ElementCategoryMap = {
  "single-line-input": "text";
  "multi-line-input": "text";
  "number-input": "text";
  "date-input": "date";
  "time-input": "date";
  "radio-button": "selection-choice";
  checkbox: "selection-choice";
} & Record<ElementID, ElementCategory>;

export type DraggableItemData = {
  id: ElementID;
  from: ComponentType;
  item: BaseItemType;
};

export type BaseItemType = {
  id: ElementID;
  name: string;
  type: ElementCategory;
  parentType: ComponentType;
};

export type ComponentType = "static" | "dynamic";
export type ColumnType = {
  id: string;
  label: string;
  type: ComponentType;
};

type ElementIDsByCategory<T extends ElementCategory> = {
  [k in keyof ElementCategoryMap]: ElementCategoryMap[k] extends T ? k : never;
}[keyof ElementCategoryMap];

export type TextCategory = ElementIDsByCategory<"text">;
export type DateTimeCategory = ElementIDsByCategory<"date">;
export type SelectionChoiceCategory = ElementIDsByCategory<"selection-choice">;

export type BuiltInElementsType = {
  text: Record<TextCategory, BaseItemType>;
  date: Record<DateTimeCategory, BaseItemType>;
  "selection-choice": Record<SelectionChoiceCategory, BaseItemType>;
};

export type FormElementType = {
  id: string;
  fieldName: string;
  element: {
    type: ElementID;
    category: ElementCategory;
  };
  order: number;
  required: boolean;
  readOnly: boolean;
  placeholder: string;
  min: number;
  max: number;
  helpText: string;
  disabled?: boolean;
  capitalize?: boolean;
};
