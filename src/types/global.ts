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

export type ElementCategory = "text" | "date" | "selection-choice";

export type ElementType =
  | "single-line-input"
  | "multi-line-input"
  | "number-input"
  | "date-input"
  | "time-input"
  | "radio-button"
  | "checkbox";

type ElementCategoryMap = {
  "single-line-input": "text";
  "multi-line-input": "text";
  "number-input": "text";
  "date-input": "date";
  "time-input": "date";
  "radio-button": "selection-choice";
  checkbox: "selection-choice";
} & Record<ElementType, ElementCategory>;

export type DraggableItemData = {
  id: ElementType;
  from: ComponentType;
  item: BaseItemType;
};

export type BaseItemType = {
  id: ElementType;
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

type ElementTypesByCategory<T extends ElementCategory> = {
  [k in keyof ElementCategoryMap]: ElementCategoryMap[k] extends T ? k : never;
}[keyof ElementCategoryMap];

export type TextCategory = ElementTypesByCategory<"text">;
export type DateTimeCategory = ElementTypesByCategory<"date">;
export type SelectionChoiceCategory =
  ElementTypesByCategory<"selection-choice">;

export type BuiltInElementsType = {
  text: Record<TextCategory, BaseItemType>;
  date: Record<DateTimeCategory, BaseItemType>;
  "selection-choice": Record<SelectionChoiceCategory, BaseItemType>;
};

export type FormElementType = {
  id: string;
  fieldName: string;
  element: {
    type: ElementType;
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

export type Form = {
  name: string;
  header: {
    title: string;
    description: string;
  };
  body: FormElement[];
  // actions: ActionType;
};

export type FormElementPropertiesMap = {
  [type in ElementType]: {
    id: string;
    type: type;
    properties: ElementProperties<type>;
  };
};

export type FormElement = FormElementPropertiesMap[ElementType];

export type ElementProperties<T extends ElementType> = T extends PrimitiveFields
  ? PrimitiveFieldProperties<T>
  : T extends NonPrimitiveFields
  ? // ? NonPrimitiveFieldProperties<T>
    NonPrimitiveFieldProperties
  : never;

export type BaseFieldProperties = {
  label: string;
  description: string;
  required: boolean;
  order: number;
  disabled: boolean;
};

export type PrimitiveFields = Extract<
  ElementType,
  | "single-line-input"
  | "multi-line-input"
  | "number-input"
  | "date-input"
  | "time-input"
>;

export type NonPrimitiveFields = Extract<
  ElementType,
  "radio-button" | "checkbox"
>;

export type PrimitiveFieldProperties<T extends PrimitiveFields> =
  BaseFieldProperties & {
    placeholder: string; // add phone number to this list
    min: T extends "date-input" | "time-input" ? string : number;
    max: T extends "date-input" | "time-input" ? string : number;
  };

export type NonPrimitiveFieldProperties = BaseFieldProperties & {
  choiceLabels: string[];
};
