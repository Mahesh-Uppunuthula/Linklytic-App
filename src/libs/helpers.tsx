import {
  BaseFieldProperties,
  ElementProperties,
  ElementType,
  FormElement,
  NonPrimitiveFields,
  PrimitiveFields,
} from "../types/global";
import clsx from "clsx";
import { ClassValue } from "clsx";
import { nanoid } from "nanoid";
import { twMerge } from "tailwind-merge";
import { primitiveFields } from "./constants";

export function cn(...classes: ClassValue[]) {
  return twMerge(clsx(...classes));
}

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

export function createElementProperties(
  type: ElementType,
  id: string
): FormElement["properties"] {
  const baseProperties: BaseFieldProperties = {
    label: id,
    description: "",
    required: false,
    order: 0,
    disabled: false,
  };

  switch (type) {
    case "single-line-input":
    case "multi-line-input":
    case "number-input": {
      const properties: ElementProperties<"single-line-input"> = {
        ...baseProperties,
        placeholder: "",
        min: 0,
        max: 256,
      };
      return properties;
    }

    case "date-input":
    case "time-input": {
      const properties: ElementProperties<"date-input"> = {
        ...baseProperties,
        placeholder: "",
        min: "",
        max: "",
      };
      return properties;
    }

    case "radio-button":
    case "checkbox": {
      const properties: ElementProperties<"checkbox"> = {
        ...baseProperties,
        choiceLabels: [],
      };
      return properties;
    }

    default: {
      const properties: ElementProperties<"single-line-input"> = {
        ...baseProperties,
        placeholder: "",
        min: 0,
        max: 256,
      };
      return properties;
    }
  }
}

export function createElement(type: ElementType): FormElement {
  const id = `${type}_${nanoid().slice(0, 5)}`;

  switch (type) {
    case "single-line-input":
    case "multi-line-input":
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
          max: 256,
        },
      };
    }

    case "date-input":
    case "time-input": {
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
          min: "",
          max: "",
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
          min: 0,
          max: 256,
        },
      };
    }
  }
}
