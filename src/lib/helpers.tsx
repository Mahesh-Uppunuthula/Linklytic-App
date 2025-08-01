import {
  ElementProperties,
  ElementType,
  FormElement,
  NonPrimitiveFields,
  PrimitiveFields,
} from "../types/global";
import { nanoid } from "nanoid";
import { primitiveFields } from "./constants";
import { DateTime } from "luxon";

export function isPrimitiveType(
  type: PrimitiveFields | NonPrimitiveFields
): type is PrimitiveFields {
  return primitiveFields.has(type as PrimitiveFields);
}

export function hasPrimitiveProperties(
  properties: ElementProperties<ElementType>
): properties is ElementProperties<PrimitiveFields> {
  return "placeholder" in properties;
}

// export function createElementProperties(
//   type: ElementType,
//   id: string
// ): FormElement["properties"] {
//   const baseProperties: BaseFieldProperties = {
//     label: id,
//     description: "",
//     required: false,
//     order: 0,
//     disabled: false,
//     placeholder: "",
//   };

//   switch (type) {
//     case "single-line-input":
//     case "multi-line-input": {
//       const properties: SingleLineInputProperties = {
//         ...baseProperties,
//         minLength: 0,
//         maxLength: 256,
//       };
//       return properties;
//     }
//     case "number-input": {
//       const properties: NumberInputProperties = {
//         ...baseProperties,
//         placeholder: "",
//         min: 0,
//         max: 256,
//       };
//       return properties;
//     }

//     case "date-input": {
//       const properties: DateInputProperties = {
//         ...baseProperties,
//         placeholder: "",
//         minDate: "",
//         maxDate: "",
//       };
//       return properties;
//     }

//     case "radio-button":
//     case "checkbox": {
//       const properties: ElementProperties<"checkbox"> = {
//         ...baseProperties,
//         choiceLabels: [],
//       };
//       return properties;
//     }

//     default: {
//       const properties: ElementProperties<"single-line-input"> = {
//         ...baseProperties,
//         placeholder: "",
//         min: 0,
//         max: 256,
//       };
//       return properties;
//     }
//   }
// }

export function createElement(type: ElementType): FormElement {
  const id = `${type}_${nanoid().slice(0, 5)}`;

  switch (type) {
    case "single-line-input":
    case "multi-line-input":
      return {
        id,
        type,
        properties: {
          label: id,
          description: "",
          required: false,
          order: 0,
          disabled: false,
          placeholder: "",
          minLength: 0,
          maxLength: 256,
        },
      };
    case "number-input": {
      return {
        id,
        type,
        properties: {
          label: id,
          description: "",
          required: false,
          order: 0,
          disabled: false,
          placeholder: "",
          min: 0,
          max: 100,
        },
      };
    }
    case "time-input":
      return {
        id,
        type,
        properties: {
          label: id,
          description: "",
          required: false,
          order: 0,
          disabled: false,
          placeholder: "",
          minTime: "00:00",
          maxTime: "23:59",
        },
      };

    case "date-input": {
      return {
        id,
        type,
        properties: {
          label: id,
          description: "",
          required: false,
          order: 0,
          disabled: false,
          placeholder: "",
          /** Maintain the order */
          minDate: DateTime.now().toFormat("yyyy-MM-dd"), // ISO format
          maxDate: DateTime.now().toFormat("yyyy-MM-dd"), // ISO format
        },
      };
    }

    case "radio-button":
    case "checkbox": {
      return {
        id,
        type,
        properties: {
          label: id,
          description: "",
          required: false,
          order: 0,
          disabled: false,
          choiceLabels: [],
        },
      };
    }

    default: {
      // fallback type
      return {
        id,
        type: "single-line-input",
        properties: {
          label: id,
          description: "",
          required: false,
          order: 0,
          disabled: false,
          placeholder: "",
          minLength: 0,
          maxLength: 256,
        },
      };
    }
  }
}
