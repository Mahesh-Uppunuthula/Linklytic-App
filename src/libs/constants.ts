import { BuiltInElementsType, ElementID } from "../types/global";

export const ALL_BUILT_IN_FORM_COMPONENTS: BuiltInElementsType = {
  text: {
    "single-line-input": {
      id: "single-line-input",
      name: "Single Line",
      type: "text",
      parentType: "static",
    },
    "multi-line-input": {
      id: "multi-line-input",
      name: "Multi Line",
      type: "text",
      parentType: "static",
    },
    "number-input": {
      id: "number-input",
      name: "Number",
      type: "text",
      parentType: "static",
    },
  },
  date: {
    "date-input": {
      id: "date-input",
      name: "Date",
      type: "date",
      parentType: "static",
    },
    "time-input": {
      id: "time-input",
      name: "Time",
      type: "date",
      parentType: "static",
    },
  },
  "selection-choice": {
    "radio-button": {
      id: "radio-button",
      name: "Radio Button",
      type: "selection-choice",
      parentType: "static",
    },
    checkbox: {
      id: "checkbox",
      name: "Checkbox",
      type: "selection-choice",
      parentType: "static",
    },
  },
};

export const builtInComponentNamesSet = new Set<ElementID>([
  "single-line-input",
  "multi-line-input",
  "number-input",
  "checkbox",
  "date-input",
  "radio-button",
  "time-input",
]);
