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
  header: FormHeader;
  body: FormBody;
  // actions: ActionType;
};

export type FormHeader = {
  title: string;
  description: string;
};

export type FormBody = {
  orderedElementIds: string[];
  elements: FormElement[];
};

export type FormElementPropertiesMap = {
  [type in ElementType]: {
    id: string;
    type: type;
    properties: ElementProperties<type>;
  };
};
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
  placeholder: string;
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
    min: T extends "date-input" | "time-input" ? string : number;
    max: T extends "date-input" | "time-input" ? string : number;
  };

export type NonPrimitiveFieldProperties = BaseFieldProperties & {
  choiceLabels: string[];
};

export type SingleLineInputProperties = BaseFieldProperties & {
  maxLength: number;
  minLength: number;
};

export type MultiLineInputProperties = BaseFieldProperties & {
  maxLength: number;
  minLength: number;
};

export type NumberInputProperties = BaseFieldProperties & {
  min: number;
  max: number;
};

export type DateInputProperties = BaseFieldProperties & {
  minDate: string;
  maxDate: string;
};

export type TimeInputProperties = BaseFieldProperties & {
  minTime: string;
  maxTime: string;
};

export type RadioButtonProperties = Omit<BaseFieldProperties, "placeholder"> & {
  choiceLabels: string[];
};

export type CheckboxProperties = Omit<BaseFieldProperties, "placeholder"> & {
  choiceLabels: string[];
};

export type FieldProperties = SingleLineInputProperties &
  MultiLineInputProperties &
  NumberInputProperties &
  DateInputProperties &
  TimeInputProperties &
  RadioButtonProperties &
  CheckboxProperties;

export type FieldPropertyName = keyof FieldProperties;
export type FieldPropertyValueType = FieldProperties[FieldPropertyName];

type BaseElementProperties = {
  id: string;
};
export type SingleLineInputElement = BaseElementProperties & {
  type: "single-line-input";
  properties: SingleLineInputProperties;
};

export type MultiLineInputElement = BaseElementProperties & {
  type: "multi-line-input";
  properties: MultiLineInputProperties;
};

export type NumberInputElement = BaseElementProperties & {
  type: "number-input";
  properties: NumberInputProperties;
};

export type DateInputElement = BaseElementProperties & {
  type: "date-input";
  properties: DateInputProperties;
};

export type TimeInputElement = BaseElementProperties & {
  type: "time-input";
  properties: TimeInputProperties;
};

export type RadioButtonElement = BaseElementProperties & {
  type: "radio-button";
  properties: RadioButtonProperties;
};

export type CheckboxElement = BaseElementProperties & {
  type: "checkbox";
  properties: CheckboxProperties;
};

export type FormElement =
  | SingleLineInputElement
  | MultiLineInputElement
  | NumberInputElement
  | DateInputElement
  | TimeInputElement
  | RadioButtonElement
  | CheckboxElement;

// const x: FormElement = {
//   id: "asdfsadf",
//   type: "number-input",
//   properties: {},
// };

// const x: p = {
//   id: "asdf",
//   type: "multi-line-input",
//   properties: {
//     label: "asdf",
//     description: "asdf",
//     required: false,
//     order: 0,
//     disabled: false,
//     placeholder: "asdf",
//     minLength: 0,
//     maxLength: 256,
//     maxTime: "asdf",
//     minDate: "asdf",
//   },
// };
